import { useState } from 'react'
import { Upload, Loader } from 'lucide-react'
import { useThemeClasses } from '../hooks/useThemeClasses'

interface DiseaseDetectionFormProps {
  onSubmit: (image: File) => Promise<void>
  loading: boolean
}

const DiseaseDetectionForm = ({ onSubmit, loading }: DiseaseDetectionFormProps) => {
  const themeClasses = useThemeClasses()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) {
      alert('Please upload a plant image for disease detection')
      return
    }
    await onSubmit(imageFile)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className={`${themeClasses.card} rounded-xl p-8 ${themeClasses.border} border`}>
        <div className="max-w-2xl mx-auto">
          {/* Image Upload */}
          <div>
            <label className={`block text-sm font-medium mb-4 text-center ${themeClasses.text.primary}`}>
              Upload Plant Image
            </label>
            <div className={`border-2 border-dashed ${themeClasses.border} rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                disabled={loading}
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img src={imagePreview} alt="Preview" className="w-full max-h-96 object-contain rounded-lg" />
                    <p className={`text-sm ${themeClasses.text.secondary}`}>Click here to change image</p>
                  </div>
                ) : (
                  <div className="space-y-4 py-8">
                    <Upload className={`mx-auto ${themeClasses.text.secondary}`} size={48} />
                    <div className="space-y-2">
                      <p className={`text-lg font-medium ${themeClasses.text.primary}`}>
                        Click to upload or drag and drop
                      </p>
                      <p className={`text-sm ${themeClasses.text.secondary}`}>
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              'Detect Disease'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default DiseaseDetectionForm
