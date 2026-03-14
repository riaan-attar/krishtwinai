import requests

# Test price
try:
    res = requests.post("https://krishtwinai.onrender.com/predict/price", json={
        "market": "Nasik",
        "commodity": "Onion",
        "today_date": "2025-03-12"
    })
    print("Price Response:", res.status_code, res.json())
except Exception as e:
    print("Price Error:", e)

# Test disease
try:
    with open(r"c:\Users\Riaan\Desktop\krishtwinai\backend\image.png", "rb") as f:
        res = requests.post("https://krishtwinai.onrender.com/predict/disease", files={"image": f})
        print("Disease Response:", res.status_code, res.json())
except Exception as e:
    print("Disease Error:", e)
