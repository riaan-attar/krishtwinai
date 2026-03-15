# 🌾 KrishiSetu AI (KrishTwinAI)

> **Empowering Farmers with Data-Driven Intelligence.** KrishiSetu AI is a state-of-the-art agricultural platform that combines Machine Learning and Deep Learning to provide high-precision crop price forecasting and instant plant disease diagnosis.

---

## 🚀 Live Demo & Testing

Experience the platform live at: **[https://krishtwinai.vercel.app/](https://krishtwinai.vercel.app/)**

### 🔐 Test Credentials
Use the following details to access the full features of the demo:
- **Email**: `sakshimalunjkar@gmail.com`
- **Password**: `Pass@123`

---

## ✨ Key Features

### 📈 Future Price Prediction
Anticipate market fluctuations with our advanced forecasting engine. Predict commodity prices for the next 5 days across various regional markets.

#### 🔍 How it Works
- **Algorithm**: Utilizes **XGBoost (Extreme Gradient Boosting)** regressor for robust time-series forecasting.
- **Dynamic Lags**: The model analyzes the last 3 days of historical prices (*Lag-1, Lag-2, Lag-3*) to capture short-term momentum and price volatility.
- **Recursive Forecasting**: Generates a 5-day outlook by using its own previous predictions as inputs for subsequent days, coupled with temporal features like day of the week and seasonality (month).

<!-- SCREENSHOT: Price Prediction Dashboard -->
> [!NOTE]
> *[Place Screenshot of Price Prediction UI here]*

<br/>

### 🌱 Plant Disease Diagnosis
Instant identification of crop diseases using computer vision. Simply upload a leaf photo to get a diagnosis and confidence score.

#### 🔍 How it Works
- **Deep Learning Architecture**: Built on **ResNet50**, a 50-layer deep Residual Network optimized for high-accuracy image classification.
- **Computer Vision Pipeline**: Images are resized, normalized, and passed through residual layers that detect complex patterns like chlorosis, necrosis, and fungal textures.
- **Class Coverage**: Trained to recognize 38 distinct plant-disease pairs from the PlantVillage dataset.
- **Efficiency**: Employs **Lazy Loading** and **Aggressive Garbage Collection** to ensure the model only occupies memory during active inference, allowing it to run on hardware with as little as 512MB RAM.

<!-- SCREENSHOT: Disease Detection Gallery/Form -->
> [!NOTE]
> *[Place Screenshot of Disease Detection UI here]*

<br/>

### 🤖 Automation & n8n Integration
Seamlessly integrated with **n8n** for WhatsApp automation, bringing AI insights directly to the farmer's favorite messaging app.

#### 🔍 How it Works
- **Real-time Triggering**: WhatsApp messages are captured via webhooks and processed by an **n8n workflow**.
- **Intent Recognition**: The system identifies whether the farmer is asking for a price or uploading a disease photo.
- **Unified API**: The same Flask backend that powers the web UI processes the automated requests, ensuring consistent results across all platforms.

<!-- SCREENSHOT: n8n Workflow or WhatsApp Chat -->
> [!NOTE]
> *[Place Screenshot of n8n integration / WhatsApp chat here]*

---

## 🎥 Video Walkthrough

See KrishiSetu AI in action! This video covers the full user journey from authentication to prediction.

<!-- VIDEO: Walkthrough Recording -->
> [!IMPORTANT]
> *[Insert Video Recording link/embed here]*

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Chart.js |
| **Backend** | Flask (Python), Flask-CORS, Gunicorn |
| **Storage & Auth** | Supabase (PostgreSQL & GoTrue) |
| **Compute/Inference** | PyTorch, Joblib, NumPy, Pandas |
| **AI/LLM** | Google Gemini API (Generative Insights) |
| **Automation** | n8n (Hosted Workflow Engine) |

---

## 🧠 Model Architecture

### 📊 Price Prediction Engine (XGBoost)
Our price forecasting uses a **Gradient Boosted Decision Tree (XGBoost)** regressor. 
- **Features**: Lagged prices (Lag1, Lag2, Lag3), temporal features (Day, Month, Day of week), and encoded categorical data (Market, Commodity).
- **Optimization**: Tuned to handle the volatility of agricultural market data with high robustness.

### 🖼️ Disease Classification (ResNet50)
The image recognition system is built on **ResNet50**, a powerful Deep Residual Network.
- **Transfer Learning**: Pre-trained on ImageNet and fine-tuned on the "PlantVillage" dataset.
- **Architectural Twist**: Custom fully-connected layers mapped to 38 distinct crop-disease classes.
- **Memory Optimized**: Implements lazy loading and aggressive garbage collection to run efficiently on 512MB RAM environments.

---

## 💻 Local Setup Guide

Follow these steps to run KrishiSetu AI on your development machine.

### Prerequisites
- **Python 3.10+**
- **Node.js 18+**
- **npm** or **yarn**

### 1. Clone & Prepare
```bash
git clone https://github.com/your-repo/krishtwinai.git
cd krishtwinai
```

### 2. Backend Setup (Flask)
```bash
cd backend
# Create Virtual Environment
python -m venv venv
# Activate (Windows)
.\venv\Scripts\activate
# Activate (macOS/Linux)
# source venv/bin/activate

# Install Dependencies
pip install -r requirements.txt

# Run Server
python app.py
```
> The API will be available at `http://localhost:5001`.

### 3. Frontend Setup (React)
```bash
cd ../frontend
# Install Packages
npm install

# Setup Env Vars
# Copy .env.example to .env and fill in:
# VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_GEMINI_API_KEY

# Run Dev Server
npm run dev
```
> The UI will be available at `http://localhost:5173`.

---

## 📂 Project Structure
```text
krishtwinai/
├── frontend/           # React + Vite Client
│   ├── src/            # Components, Hooks, API services
│   └── vercel.json     # SPA routing for Vercel
├── backend/            # Flask AI Microservice
│   ├── app.py          # Lazy-loading API + Model Logic
│   ├── models/         # Weights (.pth, .pkl)
│   └── requirements.txt
└── README.md           # You are here
```

---
