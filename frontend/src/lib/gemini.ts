import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  throw new Error('Missing Gemini API key. Please add VITE_GEMINI_API_KEY to your .env file')
}

const genAI = new GoogleGenerativeAI(apiKey)

export interface CropRecommendationInput {
  location: {
    latitude: number
    longitude: number
    region?: string
    state?: string
  }
  soilType?: string
  season?: string
  farmSize?: number
  previousCrops?: string[]
  budget?: number
  waterAvailability?: string
  farmingExperience?: string
}

export interface CropRecommendation {
  name: string
  suitabilityScore: number
  reason: string
  expectedYield: string
  riskLevel: 'Low' | 'Medium' | 'High'
}

export interface CropRecommendationResponse {
  recommendedCrops: CropRecommendation[]
  finalRecommendation: {
    bestCrop: string
    reason: string
  }
}

export async function getCropRecommendations(
  input: CropRecommendationInput
): Promise<CropRecommendationResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
You are an expert agricultural advisor for Indian farmers. Based on the following farmer data, provide high-quality, practical crop recommendations.

Farmer Data:
- Location: Latitude ${input.location.latitude}, Longitude ${input.location.longitude}
- Region/City: ${input.location.region || 'Maharashtra'}
- State: ${input.location.state || 'Maharashtra'}
- Soil Type: ${input.soilType || 'Black Soil'}
- Season: ${input.season || 'Current'}
- Farm Size: ${input.farmSize || 'Not specified'} acres
- Previous Crops: ${input.previousCrops?.join(', ') || 'None'}
- Water Availability: ${input.waterAvailability || 'Average'}
- Budget: ${input.budget || 'Not specified'}
- Farming Experience: ${input.farmingExperience || 'Not specified'}

Your task is to:
1. Recommend the 3 best crops for this specific location, soil, and budget.
2. Provide a detailed, context-aware reason for each.
3. Assign a realistic suitability score (65-98) and risk level.
4. Pick the single best "Final Recommendation".

Provide the output in this EXACT JSON format (no markdown code blocks, just pure JSON):

{
  "recommendedCrops": [
    {
      "name": "Crop Name",
      "suitabilityScore": 92,
      "reason": "Specific explanation based on soil, season, and irrigation.",
      "expectedYield": "Range in quintals/hectare",
      "riskLevel": "Low"
    },
    {
      "name": "Second Crop",
      "suitabilityScore": 87,
      "reason": "..."
    },
    {
      "name": "Third Crop",
      "suitabilityScore": 81,
      "reason": "..."
    }
  ],
  "finalRecommendation": {
    "bestCrop": "Crop Name",
    "reason": "Why this is the #1 choice."
  }
}
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean text and parse JSON
    try {
      const jsonStart = text.indexOf('{')
      const jsonEnd = text.lastIndexOf('}') + 1
      const jsonStr = text.substring(jsonStart, jsonEnd)
      
      const parsedResponse = JSON.parse(jsonStr)
      return parsedResponse as CropRecommendationResponse
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text)
      throw new Error('The AI returned an invalid format. Please try again.')
    }
  } catch (error: any) {
    console.error('Gemini API error:', error)
    throw new Error(error.message || 'Failed to connect to AI service.')
  }
}
