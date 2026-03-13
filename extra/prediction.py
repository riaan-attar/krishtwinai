import joblib

model = joblib.load("crop_price_model.pkl")
le_market = joblib.load("market_encoder.pkl")
le_commodity = joblib.load("commodity_encoder.pkl")
last_data = joblib.load("last_data.pkl")

import pandas as pd
from datetime import timedelta

def predict_next_5_days(market, commodity, today_date):

    # safety check
    if market not in le_market.classes_:
        return {"error": f"Market '{market}' not found"}

    if commodity not in le_commodity.classes_:
        return {"error": f"Commodity '{commodity}' not found"}

    future_preds = []

    # encode inputs
    market_enc = le_market.transform([market])[0]
    commodity_enc = le_commodity.transform([commodity])[0]

    # get last known lag values
    temp = last_data[(last_data["Market Name"] == market_enc) & 
                     (last_data["Commodity"] == commodity_enc)].sort_values("Price Date")

    lag1 = temp.iloc[-1]["Modal_Price"]
    lag2 = temp.iloc[-2]["Modal_Price"]
    lag3 = temp.iloc[-3]["Modal_Price"]

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
            "predicted_price": round(pred, 2)
        })

        # update lags
        lag3 = lag2
        lag2 = lag1
        lag1 = pred

    return future_preds



# result = predict_next_5_days(user_market, user_commodity, today_date)
result = predict_next_5_days("Nasik", "Onion", "2025-03-12")
print(result)