import os
import io
from flask import Flask, request, jsonify
from flask_cors import CORS

import joblib
import pandas as pd
from datetime import timedelta

import torch
import torch.nn as nn
from torchvision.models import resnet50
import torchvision.transforms as transforms
from PIL import Image
import torch.nn.functional as F

app = Flask(__name__)
CORS(app)

# --- PRICE PREDICTION GLOBALS ---
model = None
le_market = None
le_commodity = None
last_data = None

# --- DISEASE PREDICTION GLOBALS ---
disease_model = None
class_labels = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight',
    'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight',
    'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 
    'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]
disease_preprocess = transforms.Compose([
    transforms.Resize(232),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def load_models():
    """Load all necessary models at initialization time."""
    global model, le_market, le_commodity, last_data, disease_model
    # Get the directory of the current script
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    try:
        model = joblib.load(os.path.join(base_dir, "crop_price_model.pkl"))
        le_market = joblib.load(os.path.join(base_dir, "market_encoder.pkl"))
        le_commodity = joblib.load(os.path.join(base_dir, "commodity_encoder.pkl"))
        last_data = joblib.load(os.path.join(base_dir, "last_data.pkl"))
        print("Price models loaded successfully.")
    except Exception as e:
        print(f"Error loading price models: {e}")

    try:
        disease_model = resnet50(weights=None)
        disease_model.fc = nn.Sequential(
            nn.Linear(disease_model.fc.in_features, len(class_labels))
        )
        disease_model.load_state_dict(
            torch.load(os.path.join(base_dir, "01_plant_diseases_classification_pytorch_rn50.pth"), map_location="cpu")
        )
        disease_model.eval()
        print("Disease model loaded successfully.")
    except Exception as e:
        print(f"Error loading disease models: {e}")

# Load models before handling any requests
with app.app_context():
    load_models()


@app.route('/predict/price', methods=['POST'])
def predict_price():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    market = data.get('market')
    commodity = data.get('commodity')
    today_date = data.get('today_date')

    if not market or not commodity or not today_date:
        return jsonify({"error": "Missing required fields: 'market', 'commodity', 'today_date'"}), 400

    if model is None or le_market is None or le_commodity is None or last_data is None:
        return jsonify({"error": "Models are not loaded correctly"}), 500

    if market not in le_market.classes_:
        return jsonify({"error": f"Market '{market}' not found"}), 400

    if commodity not in le_commodity.classes_:
        return jsonify({"error": f"Commodity '{commodity}' not found"}), 400

    future_preds = []

    # encode inputs
    market_enc = le_market.transform([market])[0]
    commodity_enc = le_commodity.transform([commodity])[0]

    # get last known lag values
    temp = last_data[(last_data["Market Name"] == market_enc) & 
                     (last_data["Commodity"] == commodity_enc)].sort_values("Price Date")
    
    if temp.empty:
        return jsonify({"error": "No historical data found for this market and commodity combination"}), 404

    lag1 = temp.iloc[-1]["Modal_Price"]
    lag2 = temp.iloc[-2]["Modal_Price"] if len(temp) >= 2 else lag1
    lag3 = temp.iloc[-3]["Modal_Price"] if len(temp) >= 3 else lag2

    current_date = pd.to_datetime(today_date)

    for i in range(5):
        future_date = current_date + timedelta(days=i+1)

        row = pd.DataFrame([{
            "Market Name": market_enc,
            "Commodity": commodity_enc,
            "Min_Price": lag1,
            "Max_Price": lag1,
            "day": future_date.day,
            "month": future_date.month,
            "year": future_date.year,
            "dayofweek": future_date.dayofweek,
            "lag1": lag1,
            "lag2": lag2,
            "lag3": lag3
        }])

        pred = model.predict(row)[0]

        future_preds.append({
            "date": str(future_date.date()),
            "predicted_price": round(float(pred), 2)
        })

        # update lags
        lag3 = lag2
        lag2 = lag1
        lag1 = pred

    return jsonify({"predictions": future_preds}), 200

@app.route('/predict/disease', methods=['POST'])
def predict_disease():
    if disease_model is None:
        return jsonify({"error": "Disease model is not loaded correctly"}), 500

    if 'image' not in request.files:
        return jsonify({"error": "No image part in the request"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Read the image file directly from the request
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))

        if image.mode != "RGB":
            image = image.convert("RGB")

        image_tensor = disease_preprocess(image).unsqueeze(0)

        with torch.no_grad():
            outputs = disease_model(image_tensor)
            probs = F.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probs, 1)

        predicted_label = class_labels[predicted.item()]
        
        # safely handle labels that might not have "___"
        if "___" in predicted_label:
            plant, disease = predicted_label.split("___", 1)
        else:
            plant = "Unknown"
            disease = predicted_label

        confidence_val = round(confidence.item() * 100, 2)

        return jsonify({
            "plant": plant,
            "disease": disease,
            "confidence": f"{confidence_val}%",
            "full_label": predicted_label
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
