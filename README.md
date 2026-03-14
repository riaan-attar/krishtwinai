# 🌾 KrishiSetu AI (Krishtwinai)

> A comprehensive, AI-powered agricultural platform designed to predict crop prices and diagnose plant diseases.

[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue.svg)](frontend/)
[![Backend](https://img.shields.io/badge/Backend-Flask%20%2B%20PyTorch-green.svg)](backend/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

KrishiSetu AI bridges the gap between traditional farming and modern artificial intelligence by helping farmers make data-driven decisions. The platform provides real-time crop market price predictions and an interactive plant disease classification system to secure crop health and maximize yield profits.

## ✨ Features

- **📈 Future Price Prediction**: Anticipate commodity market prices across different regional markets up to 5 days in advance using trained ML estimators.
- **🌱 Plant Disease Diagnosis**: Upload a picture of a diseased crop leaf, and our AI model will quickly identify the specific disease and confidence level.
- **🤖 WhatsApp Automation (n8n)**: Integrated n8n workflows enable seamless automated interactions with farmers directly through WhatsApp.
- **🎨 Modern User Interface**: A responsive, dark-themed UI built with React and Tailwind CSS, featuring interactive dashboards and intuitive forms.
- **📊 Interactive Analytics**: Detailed charts to visualize historical prices and predictions.
- **🗺️ Smart Insights**: Real-time integration (part of the KrishiSetu suite) and user location-aware tools.

## 🏗️ Architecture & Tech Stack

The project is structured into two main components:

### 🖥️ Frontend (Client Application)
- **Framework**: [React 18](https://reactjs.org/) with TypeScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/) (via `react-chartjs-2`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Extra Libraries**: `pdfjs-dist` (PDF tools), `@google/generative-ai` (Gemini API integration), `@supabase/supabase-js` (authentication/database)

### ⚙️ Backend (AI Microservice & Automation)
- **Framework**: [Flask](https://flask.palletsprojects.com/) + Flask-CORS
- **Machine Learning (Price Prediction)**: Scikit-Learn, Pandas, Joblib
- **Deep Learning (Disease Classification)**: [PyTorch](https://pytorch.org/) & Torchvision (using an optimized ResNet-50 Model)
- **Image Processing**: Pillow
- **Automation Engine**: [n8n](https://n8n.io/) (for WhatsApp messaging)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- **Node.js**: v18 or higher (for the frontend)
- **Python**: v3.8 or higher (for the backend)
- **npm** or **yarn**

### 1. Setting up the Backend (Flask + ML Models)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but highly recommended):
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```
3. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```
   > The backend API will start running on `http://localhost:5001`.

### 2. Setting up the Frontend (React + Vite)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node modules:
   ```bash
   npm install
   ```
3. Configure environment variables (if applicable):
   Ensure you create a `.env` file taking contents from `.env.example` to supply necessary API keys (Supabase, Gemini).
4. Run the development server:
   ```bash
   npm run dev
   ```
   > The frontend application will be available at `http://localhost:5173`.

---

## 🔌 API Endpoints Summary

If you wish to interact directly with the backend AI service, it exposes the following main endpoints:

### `POST /predict/price`
Predicts crop prices for the next 5 days based on recent market trends.
- **Payload**: JSON with `market`, `commodity`, and `today_date`.
- **Response**: Array of predicted prices for upcoming dates.

### `POST /predict/disease`
Classifies an uploaded plant leaf image into one of 38 categories (covering popular crops including Apple, Corn, Grape, Potato, Tomato, and more).
- **Payload**: `multipart/form-data` containing an `image` file.
- **Response**: Identified `plant`, `disease`, `confidence` percentage, and `full_label`.

---

## 📂 Project Structure

```text
krishtwinai/
│
├── frontend/                 # React UI Application
│   ├── src/                  # React components, pages, and hooks
│   ├── public/               # Static assets
│   ├── package.json          # Node dependencies
│   ├── vite.config.ts        # Vite build configuration
│   └── README.md             # Frontend specific documentation
│
└── backend/                  # Flask AI Service
    ├── app.py                # Main Flask application and ML logic
    ├── requirements.txt      # Python dependencies
    ├── crop_price_model.pkl  # Pre-trained core ML model for prices
    └── 01_plant_diseases_classification_pytorch_rn50.pth # Deep learning model
```

## 📝 License

This project is licensed under the MIT License - see the individual project directories for more details.