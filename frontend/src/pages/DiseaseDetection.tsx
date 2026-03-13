import { useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { useThemeClasses } from '../hooks/useThemeClasses'
import { useLanguage } from '../context/LanguageContext'
import DiseaseDetectionForm from '../components/DiseaseDetectionForm'
import DiseaseDetectionResults from '../components/DiseaseDetectionResults'
import { generateTreatmentPlan } from '../utils/gemini'

interface DiseaseDetectionResponse {
  disease: string
  confidence: number
  description: string
  symptoms: string[]
  treatment: string[]
  prevention: string[]
}

const DiseaseDetection = () => {
  const { t } = useLanguage()
  const themeClasses = useThemeClasses()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<DiseaseDetectionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDetectDisease = async (image: File) => {
    setLoading(true)
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append('image', image)

      const response = await fetch('http://localhost:5001/predict/disease', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || t('disease.error'))
      }

      const data = await response.json()
      
      const parsedConfidence = parseFloat(data.confidence) / 100
      const diseaseName = data.disease ? data.disease.replace(/_/g, ' ') : 'Unknown'
      const plantName = data.plant || 'Unknown'
      
      let symptoms = [t('disease.diagVisual'), t('disease.checkSurround')]
      let treatment = [t('disease.consultExpert'), t('disease.reviewTreatments')]
      let prevention = [t('disease.ensureRotation'), t('disease.avoidOverhead')]

      if (diseaseName.toLowerCase() !== 'healthy' && diseaseName !== 'Unknown') {
        try {
          const geminiPlan = await generateTreatmentPlan(diseaseName, plantName);
          if (geminiPlan.symptoms && geminiPlan.symptoms.length > 0) symptoms = geminiPlan.symptoms;
          if (geminiPlan.treatment && geminiPlan.treatment.length > 0) treatment = geminiPlan.treatment;
          if (geminiPlan.prevention && geminiPlan.prevention.length > 0) prevention = geminiPlan.prevention;
        } catch (geminiErr) {
          console.error("Gemini failed:", geminiErr);
        }
      } else if (diseaseName.toLowerCase() === 'healthy') {
        symptoms = [t('disease.healthy.symptom1'), t('disease.healthy.symptom2')];
        treatment = [t('disease.healthy.treatment1'), t('disease.healthy.treatment2')];
        prevention = [t('disease.healthy.prevention1'), t('disease.healthy.prevention2')];
      }
      
      const newResults: DiseaseDetectionResponse = {
        disease: diseaseName.toLowerCase() === 'healthy' ? t('disease.healthy.name') : diseaseName,
        confidence: isNaN(parsedConfidence) ? 0 : parsedConfidence,
        description: t('disease.detectedOnPlant').replace('{plant}', plantName) + `. ${data.full_label ? t('disease.label').replace('{label}', data.full_label) : ''}`,
        symptoms,
        treatment,
        prevention
      }
      
      setResults(newResults)
    } catch (err: any) {
      console.error('Disease detection error:', err)
      setError(err instanceof Error ? err.message : t('disease.failedToConnect'))
    } finally {
      setLoading(false)
    }
  }

  const handleNewSearch = () => {
    setResults(null)
    setError(null)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${themeClasses.text.primary}`}>
          {t('disease.title')}
        </h1>
        <p className={themeClasses.text.secondary}>
          {t('disease.subtitle')}
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-red-400" size={20} />
          <div>
            <p className="text-red-400 font-medium">{t('disease.error')}</p>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      )}

      {!results ? (
        <DiseaseDetectionForm onSubmit={handleDetectDisease} loading={loading} />
      ) : (
        <DiseaseDetectionResults results={results} onNewSearch={handleNewSearch} />
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default DiseaseDetection
