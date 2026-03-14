# KrishiSetu AI - Backend AI Service

A robust Python Flask-based microservice that powers the AI predictions for the **KrishiSetu AI** platform. It provides REST API endpoints for predicting crop market prices and classifying plant diseases using advanced machine learning and deep learning models.

## Tech Stack

### Backend & AI
- **Framework**: [Flask](https://flask.palletsprojects.com/) + Flask-CORS
- **Machine Learning (Price Prediction)**: Scikit-Learn, Pandas, Joblib
- **Deep Learning (Disease Classification)**: [PyTorch](https://pytorch.org/) & Torchvision (ResNet-50)
- **Image Processing**: Pillow
- **Automation**: [n8n](https://n8n.io/) (for seamless WhatsApp integration and notifications)

### Frontend (Client UI)
- **Framework**: React 18 + TypeScript
- **Tooling**: Vite
- **Styling**: Tailwind CSS
- **Visualization**: Chart.js

## Project Structure

```text
krishtwinai/
├── backend/              # Python AI Service (You are here)
│   ├── app.py            # Main Flask API endpoints
│   ├── requirements.txt
│   └── *.pkl / *.pth     # Pre-trained core models
│
└── frontend/             # React Client UI
    ├── src/
    │   ├── components/   # React functional components
    │   ├── pages/        # Views (e.g., PricePrediction)
    │   └── App.tsx       # Main React Router setup
    ├── public/
    ├── package.json
    └── vite.config.ts
```

## Getting Started

### Prerequisites

- Python 3.8+ (preferably Python 3.10+)
- `pip` package manager

### Installation

1. Create a virtual environment (recommended):
```bash
python -m venv venv
```

2. Activate the virtual environment:
- **Windows**:
  ```bash
  venv\Scripts\activate
  ```
- **macOS / Linux**:
  ```bash
  source venv/bin/activate
  ```

3. Install the dependencies:
```bash
pip install -r requirements.txt
```

### Running the Server

Start the Flask development server:
```bash
python app.py
```

The server will run on `http://0.0.0.0:5001` with debug mode enabled by default.

## API Endpoints

### 1. Predict Future Crop Prices
Returns a 5-day future market price prediction based on historical data.

- **URL**: `/predict/price`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "market": "Ahmedabad",
    "commodity": "Wheat",
    "today_date": "2023-11-20"
  }
  ```
- **Success Response**:  
  `200 OK`
  ```json
  {
    "predictions": [
      {
        "date": "2023-11-21",
        "predicted_price": 2843.50
      },
      ...
    ]
  }
  ```

### 2. Diagnose Plant Disease
Analyzes an uploaded image of a plant leaf and predicts the disease.

- **URL**: `/predict/disease`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  A file field named `image` containing the image of the plant leaf.
- **Success Response**:  
  `200 OK`
  ```json
  {
    "plant": "Tomato",
    "disease": "Early_blight",
    "confidence": "98.45%",
    "full_label": "Tomato___Early_blight"
  }
  ```

## Models Information

- **Price Prediction**: An ML regression model that relies on encoded inputs (`Market Name`, `Commodity`) along with historical `lag1`, `lag2`, `lag3` price data. The API auto-rolls the values dynamically to predict up to 5 days ahead.
- **Disease Classification**: Uses a PyTorch `ResNet-50` architecture trained from scratch/fine-tuned on the popular plant diseases dataset, able to categorize 38 distinct plant and disease label combinations.

## Frontend Integration

The backend AI service is the core predictive engine that powers the **KrishiSetu AI Frontend** (`../frontend/`). 
The client-side UI consumes the API endpoints natively via standard HTTP POST requests from within React functional components:

- **Technology**: React 18, Vite, Tailwind CSS, TypeScript
- **CORS Handling**: The Flask application relies on `Flask-CORS` locally to permit development cross-origin requests from `http://localhost:5173/` out of the box.
- **Data Flow**:
  1. The UI captures user input (State, District, Commodity names, Date) and forwards them directly to the `/predict/price` backend route.
  2. For leaves, the user leverages the frontend upload component which encodes the payload as `multipart/form-data` and directly sends the binary image chunks to `/predict/disease`.

### Setting up the Full Stack
If you also want to run the frontend to visualize these API models practically:
```bash
# In an adjacent terminal window
cd ../frontend
npm install
npm run dev
```
