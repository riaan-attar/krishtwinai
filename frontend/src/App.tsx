import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import PricePrediction from './pages/PricePrediction'
import CropRecommendation from './pages/CropRecommendation'
import WeatherAdvice from './pages/WeatherAdvice'
import DiseaseDetection from './pages/DiseaseDetection'
import GovernmentSchemes from './pages/GovernmentSchemes'
import Community from './pages/Community'
import CommunityDetail from './pages/CommunityDetail'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Marketplace from './pages/Marketplace'
import ProduceListings from './pages/ProduceListings'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Landing from './pages/Landing'
import TalkToPDF from './pages/TalkToPDF'
import { useThemeClasses } from './hooks/useThemeClasses'

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const themeClasses = useThemeClasses()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/*"
          element={
          <ProtectedRoute>
              <div className={`flex min-h-screen ${themeClasses.bg} transition-colors relative`}>
                {/* Mobile overlay */}
                {isSidebarOpen && (
                  <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity" 
                    onClick={() => setIsSidebarOpen(false)}
                  />
                )}
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                <div className={`flex-1 w-full max-w-full ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} transition-all duration-300`}>
                  <TopBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                  <main className="p-4 md:p-8 overflow-x-hidden">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/price-prediction" element={<PricePrediction />} />
                      <Route path="/crop-recommendation" element={<CropRecommendation />} />
                      <Route path="/weather-advice" element={<WeatherAdvice />} />
                      <Route path="/disease-detection" element={<DiseaseDetection />} />
                      <Route path="/government-schemes" element={<GovernmentSchemes />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/produce-listings" element={<ProduceListings />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/community/:communityId" element={<CommunityDetail />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/talk-to-pdf" element={<TalkToPDF />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App