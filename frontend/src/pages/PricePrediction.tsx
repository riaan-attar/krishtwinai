import { useState } from 'react'
import { Plus } from 'lucide-react'
import ProfitAnalyzer from '../components/ProfitAnalyzer'
import PriceChart from '../components/PriceChart'

interface Prediction {
  date: string;
  predicted_price: number;
}

const PricePrediction = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (data: { crop: string; mandi: string; }) => {
    console.log('Analyzing:', data);
    setLoading(true);
    setError(null);
    
    try {
      // Create a date object for today
      const today = new Date();
      // Format to YYYY-MM-DD
      const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      
      const payload = {
        market: data.mandi,
        commodity: data.crop,
        today_date: formattedDate
      };

      const response = await fetch('http://localhost:5001/predict/price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch predictions');
      }

      const responseData = await response.json();
      setPredictions(responseData.predictions.slice(0, 4)); // Only taking the first 4 to match the prompt request
    } catch (err: any) {
      console.error('Prediction error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred fetching predictions.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Crop Price Prediction</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Predict the price of a crop based on region and date using our AI-powered model.
        </p>
      </div>

      <ProfitAnalyzer onAnalyze={handleAnalyze} />
      <PriceChart predictions={predictions} />

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-6 text-center text-gray-500">
          Loading predictions...
        </div>
      )}

      {/* Recommendation Cards */}
      {!loading && predictions.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">4-Day Price Forecast</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-6">
            {predictions.map((pred: Prediction, index: number) => (
              <div key={index} className={`bg-white dark:bg-dark-card rounded-xl p-6 border-l-4 shadow-sm ${index === 0 ? 'border-green-500' : 'border-blue-500'}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-lg font-bold ${index === 0 ? 'text-green-600 dark:text-green-500' : 'text-blue-600 dark:text-blue-500'}`}>
                    {index === 0 ? 'DAY 1' : `DAY ${index + 1}`}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${index === 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`}>
                    {pred.date}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Predicted Price (₹/Quintal)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{pred.predicted_price}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Market Factors Section */}
      <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-6 border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-300">Top Market Factors</h3>
          <div className="text-right">
            <p className="text-gray-400 text-sm">AI Confidence</p>
            <p className="text-4xl font-bold text-white">82%</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">
            Historical baseline pricing for Wheat
          </span>
          <span className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">
            Regional variations for Nashik Mandi
          </span>
          <span className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">
            Standard seasonal supply patterns
          </span>
        </div>

        <p className="text-gray-500 text-xs mt-4 text-center">
          Based on historical mandi price trends (2020–2025). Models update dynamically on available live data.
        </p>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default PricePrediction
