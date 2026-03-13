import requests

# Test price
try:
    res = requests.post("http://127.0.0.1:5001/predict/price", json={
        "market": "Nasik",
        "commodity": "Onion",
        "today_date": "2025-03-12"
    })
    print("Price Response:", res.status_code, res.json())
except Exception as e:
    print("Price Error:", e)

# Test disease
try:
    with open(r"c:\Users\Riaan\Desktop\KrishiSetu-AI\backend\image.png", "rb") as f:
        res = requests.post("http://127.0.0.1:5001/predict/disease", files={"image": f})
        print("Disease Response:", res.status_code, res.json())
except Exception as e:
    print("Disease Error:", e)
