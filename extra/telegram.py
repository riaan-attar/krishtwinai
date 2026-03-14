from flask import Flask, request
import requests
import google.generativeai as genai

TELEGRAM_TOKEN = "Y8686295155:AAGR55TfGTsvbJEii1Jd1wOzY9tX20LR8ZY"
GEMINI_API_KEY = "AIzaSyAiZo7gRR82VKbLQb8u3D4cOiHq8oSmTSw"

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

app = Flask(__name__)

def send_message(chat_id, text):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": text
    }
    requests.post(url, json=payload)


def ask_gemini(prompt):
    response = model.generate_content(prompt)
    return response.text


@app.route("/", methods=["POST"])
def webhook():
    data = request.get_json()

    if "message" in data:
        chat_id = data["message"]["chat"]["id"]
        user_text = data["message"].get("text", "")

        try:
            reply = ask_gemini(user_text)
        except Exception:
            reply = "Error contacting Gemini API"

        send_message(chat_id, reply)

    return "ok"


if __name__ == "__main__":
    app.run(port=5000)
