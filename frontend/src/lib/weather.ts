import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

export interface LocationData {
  latitude: number
  longitude: number
  city?: string
  state?: string
  country?: string
  district?: string
}

export interface WeatherData {
  location: LocationData
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    condition: string
    description: string
    pressure: number
    visibility: number
    uvIndex: number
    feelsLike: number
  }
  forecast: {
    today: {
      high: number
      low: number
      rainChance: number
      condition: string
    }
    tomorrow: {
      high: number
      low: number
      rainChance: number
      condition: string
    }
    dayAfter: {
      high: number
      low: number
      rainChance: number
      condition: string
    }
  }
}

export interface FarmingAdvice {
  suitableActivities: string[]
  recommendedCrops: string[]
  warnings: string[]
  recommendations: {
    category: string
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
  }[]
  irrigation: {
    needed: boolean
    amount: string
    timing: string
    method: string
  }
  pestControl: {
    riskLevel: 'low' | 'medium' | 'high'
    recommendations: string[]
  }
}

export interface WeatherAdviceResponse {
  weather: WeatherData
  advice: FarmingAdvice
  generatedAt: string
}

// Get current location using browser geolocation
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // Try to get location details using reverse geocoding
          const locationDetails = await reverseGeocode(latitude, longitude)
          resolve({
            latitude,
            longitude,
            ...locationDetails
          })
        } catch (error) {
          // If reverse geocoding fails, return just coordinates
          resolve({ latitude, longitude })
        }
      },
      (error) => {
        reject(new Error(`Location access denied: ${error.message}`))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  })
}

// Reverse geocoding to get location details
const reverseGeocode = async (lat: number, lon: number) => {
  try {
    // Using OpenCage Geocoding API (free tier available)
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=demo&limit=1`
    )
    const data = await response.json()
    
    if (data.results && data.results[0]) {
      const result = data.results[0].components
      return {
        city: result.city || result.town || result.village,
        state: result.state,
        country: result.country,
        district: result.county || result.district
      }
    }
  } catch (error) {
    console.warn('Reverse geocoding failed:', error)
  }
  return {}
}

// Get weather data using WeatherAPI.com
export const getWeatherData = async (location: LocationData): Promise<WeatherData> => {
  const weatherApiKey = import.meta.env.VITE_WEATHERAPI_KEY

  // If no API key is configured, fall back to mock data
  if (!weatherApiKey) {
    console.warn('VITE_WEATHERAPI_KEY not set — using mock weather data')
    return getMockWeatherData(location)
  }

  try {
    const q = `${location.latitude},${location.longitude}`
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${q}&days=3&aqi=no&alerts=no`

    const response = await fetch(url)

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData?.error?.message || `WeatherAPI error ${response.status}`)
    }

    const data = await response.json()

    const current = data.current
    const [today, tomorrow, dayAfter] = data.forecast.forecastday

    // Fill in location from API response if available
    const apiLoc = data.location
    if (apiLoc) {
      location.city = location.city || apiLoc.name
      location.state = location.state || apiLoc.region
      location.country = location.country || apiLoc.country
    }

    return {
      location,
      current: {
        temperature: current.temp_c,
        humidity: current.humidity,
        windSpeed: current.wind_kph,
        condition: current.condition.text,
        description: current.condition.text,
        pressure: current.pressure_mb,
        visibility: current.vis_km,
        uvIndex: current.uv,
        feelsLike: current.feelslike_c,
      },
      forecast: {
        today: {
          high: today.day.maxtemp_c,
          low: today.day.mintemp_c,
          rainChance: today.day.daily_chance_of_rain,
          condition: today.day.condition.text,
        },
        tomorrow: {
          high: tomorrow.day.maxtemp_c,
          low: tomorrow.day.mintemp_c,
          rainChance: tomorrow.day.daily_chance_of_rain,
          condition: tomorrow.day.condition.text,
        },
        dayAfter: {
          high: dayAfter.day.maxtemp_c,
          low: dayAfter.day.mintemp_c,
          rainChance: dayAfter.day.daily_chance_of_rain,
          condition: dayAfter.day.condition.text,
        },
      },
    }
  } catch (error) {
    console.error('WeatherAPI.com fetch failed, using mock data:', error)
    return getMockWeatherData(location)
  }
}

// Mock fallback (used when API key is absent or call fails)
const getMockWeatherData = (location: LocationData): WeatherData => ({
  location,
  current: {
    temperature: Math.round(20 + Math.random() * 15),
    humidity: Math.round(40 + Math.random() * 40),
    windSpeed: Math.round(5 + Math.random() * 15),
    condition: ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Sunny'][Math.floor(Math.random() * 5)],
    description: 'Pleasant weather conditions',
    pressure: Math.round(1000 + Math.random() * 50),
    visibility: Math.round(8 + Math.random() * 7),
    uvIndex: Math.round(3 + Math.random() * 8),
    feelsLike: Math.round(22 + Math.random() * 13),
  },
  forecast: {
    today: { high: Math.round(25 + Math.random() * 10), low: Math.round(15 + Math.random() * 8), rainChance: Math.round(Math.random() * 60), condition: 'Partly Cloudy' },
    tomorrow: { high: Math.round(24 + Math.random() * 12), low: Math.round(16 + Math.random() * 7), rainChance: Math.round(Math.random() * 80), condition: 'Light Rain' },
    dayAfter: { high: Math.round(26 + Math.random() * 9), low: Math.round(17 + Math.random() * 6), rainChance: Math.round(Math.random() * 40), condition: 'Sunny' },
  },
})


// Generate farming advice using Gemini AI
export const getFarmingAdvice = async (weather: WeatherData): Promise<FarmingAdvice> => {
  if (!apiKey || apiKey === 'AIzaSyDummy_Key_Replace_With_Real_Key') {
    return getMockFarmingAdvice(weather)
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
You are an expert agricultural advisor for Indian farmers. Based on the following weather data, provide comprehensive farming advice in JSON format.

Weather Data:
- Location: ${weather.location.city}, ${weather.location.state}
- Current Temperature: ${weather.current.temperature}°C
- Humidity: ${weather.current.humidity}%
- Wind Speed: ${weather.current.windSpeed} km/h
- Condition: ${weather.current.condition}
- Today's Forecast: High ${weather.forecast.today.high}°C, Low ${weather.forecast.today.low}°C, Rain Chance ${weather.forecast.today.rainChance}%
- Tomorrow's Forecast: High ${weather.forecast.tomorrow.high}°C, Low ${weather.forecast.tomorrow.low}°C, Rain Chance ${weather.forecast.tomorrow.rainChance}%

Provide advice in this EXACT JSON format:

{
  "suitableActivities": ["activity1", "activity2", "activity3"],
  "recommendedCrops": ["crop1", "crop2", "crop3"],
  "warnings": ["warning1", "warning2"],
  "recommendations": [
    {
      "category": "Irrigation",
      "title": "Irrigation advice title",
      "description": "Detailed irrigation advice based on weather",
      "priority": "high"
    },
    {
      "category": "Crop Care",
      "title": "Crop care advice title", 
      "description": "Detailed crop care advice",
      "priority": "medium"
    }
  ],
  "irrigation": {
    "needed": true,
    "amount": "2-3 inches",
    "timing": "Early morning",
    "method": "Drip irrigation recommended"
  },
  "pestControl": {
    "riskLevel": "medium",
    "recommendations": ["Check for aphids", "Monitor for fungal diseases"]
  }
}

Consider:
- Current season and weather patterns
- Suitable crops for the region and season
- Irrigation needs based on humidity and rain forecast
- Pest and disease risks based on weather conditions
- Optimal farming activities for current conditions
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      
      const parsedAdvice = JSON.parse(jsonMatch[0])
      return parsedAdvice as FarmingAdvice
    } catch (parseError) {
      console.error('Failed to parse AI response:', text)
      return getMockFarmingAdvice(weather)
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    return getMockFarmingAdvice(weather)
  }
}

// Mock farming advice for fallback
const getMockFarmingAdvice = (weather: WeatherData): FarmingAdvice => {
  const temp = weather.current.temperature
  const humidity = weather.current.humidity
  const rainChance = weather.forecast.today.rainChance

  let activities = ['Monitor crop health', 'Check soil moisture']
  let crops = ['Wheat', 'Rice', 'Cotton']
  let warnings: string[] = []
  let irrigationNeeded = true
  let pestRisk: 'low' | 'medium' | 'high' = 'low'

  // Temperature-based advice
  if (temp > 35) {
    activities.push('Provide shade to sensitive crops', 'Increase irrigation frequency')
    warnings.push('High temperature alert - protect crops from heat stress')
    irrigationNeeded = true
  } else if (temp < 15) {
    activities.push('Protect crops from cold', 'Reduce irrigation')
    warnings.push('Cold weather - monitor for frost damage')
    irrigationNeeded = false
  } else {
    activities.push('Optimal conditions for field work', 'Apply fertilizers')
  }

  // Humidity-based advice
  if (humidity > 80) {
    pestRisk = 'high'
    activities.push('Monitor for fungal diseases', 'Ensure good air circulation')
    warnings.push('High humidity increases disease risk')
  } else if (humidity < 40) {
    activities.push('Increase irrigation', 'Mulch around plants')
    irrigationNeeded = true
  }

  // Rain-based advice
  if (rainChance > 70) {
    activities.push('Postpone spraying', 'Ensure proper drainage')
    irrigationNeeded = false
    warnings.push('Heavy rain expected - prepare drainage systems')
  } else if (rainChance < 20) {
    activities.push('Plan irrigation schedule', 'Check water reserves')
    irrigationNeeded = true
  }

  // Regional crop recommendations
  const region = weather.location.state?.toLowerCase()
  if (region?.includes('maharashtra')) {
    crops = ['Soybean', 'Cotton', 'Sugarcane', 'Tur', 'Jowar']
  } else if (region?.includes('punjab') || region?.includes('haryana')) {
    crops = ['Wheat', 'Rice', 'Maize', 'Sugarcane', 'Cotton']
  } else if (region?.includes('karnataka') || region?.includes('tamil nadu')) {
    crops = ['Rice', 'Ragi', 'Groundnut', 'Cotton', 'Sugarcane']
  }

  return {
    suitableActivities: activities.slice(0, 5),
    recommendedCrops: crops.slice(0, 4),
    warnings,
    recommendations: [
      {
        category: 'Irrigation',
        title: irrigationNeeded ? 'Irrigation Required' : 'Reduce Irrigation',
        description: irrigationNeeded 
          ? `Current weather conditions require regular irrigation. With ${humidity}% humidity and ${rainChance}% rain chance, maintain soil moisture levels.`
          : `With high humidity (${humidity}%) and ${rainChance}% rain chance, reduce irrigation to prevent waterlogging.`,
        priority: 'high' as const
      },
      {
        category: 'Crop Care',
        title: 'Weather-Based Crop Management',
        description: `Temperature at ${temp}°C is ${temp > 30 ? 'high' : temp < 20 ? 'cool' : 'optimal'} for most crops. ${pestRisk === 'high' ? 'Monitor closely for pests and diseases.' : 'Good conditions for crop growth.'}`,
        priority: 'medium' as const
      }
    ],
    irrigation: {
      needed: irrigationNeeded,
      amount: irrigationNeeded ? (temp > 30 ? '3-4 inches' : '2-3 inches') : '1-2 inches',
      timing: temp > 30 ? 'Early morning and evening' : 'Morning',
      method: humidity > 70 ? 'Drip irrigation to reduce humidity' : 'Sprinkler or drip irrigation'
    },
    pestControl: {
      riskLevel: pestRisk,
      recommendations: pestRisk === 'high' 
        ? ['Monitor for fungal diseases', 'Check for aphids and thrips', 'Ensure good ventilation']
        : ['Regular crop inspection', 'Maintain field hygiene']
    }
  }
}

// Main function to get complete weather advice
export const getWeatherAdvice = async (location: LocationData): Promise<WeatherAdviceResponse> => {
  try {
    const weather = await getWeatherData(location)
    const advice = await getFarmingAdvice(weather)
    
    return {
      weather,
      advice,
      generatedAt: new Date().toISOString()
    }
  } catch (error) {
    throw new Error(`Failed to get weather advice: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}