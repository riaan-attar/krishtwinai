import { useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import CropRecommendationForm from '../components/CropRecommendationForm'
import CropRecommendationResults from '../components/CropRecommendationResults'
import { getCropRecommendations } from '../lib/gemini'
import { CropRecommendationInput, CropRecommendationResponse } from '../types/crops'

const CropRecommendation = () => {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<CropRecommendationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGetRecommendations = async (input: CropRecommendationInput) => {
    setLoading(true)
    setError(null)
    
    try {
      // Use real API unconditionally
      const recommendations = await getCropRecommendations(input)
      
      // Add metadata
      const enhancedResults: CropRecommendationResponse = {
        ...recommendations,
        generatedAt: new Date().toISOString(),
        location: input.location
      }
      
      setResults(enhancedResults)
    } catch (err: any) {
      console.error('Recommendation error:', err)
      setError(err.message || 'Failed to get recommendations. Please check your internet connection and API key.')
    } finally {
      setLoading(false)
    }
  }

  const handleNewRecommendation = () => {
    setResults(null)
    setError(null)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t('cropRecommendation.title')}</h1>
        <p className="text-gray-400">
          {t('cropRecommendation.subtitle')}
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl p-4 flex items-center gap-3 bg-red-500/10 border border-red-500/20">
          <AlertCircle className="text-red-400" size={20} />
          <div>
            <p className="font-medium text-red-400">
              Error getting recommendations
            </p>
            <p className="text-sm text-red-300">
              {error}
            </p>
          </div>
        </div>
      )}

      {!results ? (
        <CropRecommendationForm onSubmit={handleGetRecommendations} loading={loading} />
      ) : (
        <CropRecommendationResults results={results} onNewRecommendation={handleNewRecommendation} />
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default CropRecommendation
