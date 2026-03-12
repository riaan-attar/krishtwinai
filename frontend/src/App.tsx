import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import PricePrediction from './pages/PricePrediction'
import CropRecommendation from './pages/CropRecommendation'
import WeatherAdvice from './pages/WeatherAdvice'
import Community from './pages/Community'
import CommunityDetail from './pages/CommunityDetail'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Marketplace from './pages/Marketplace'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import RoleSelection from './pages/RoleSelection'
import ProductComparison from './pages/ProductComparison'

import RetailerRegistration from './pages/RetailerRegistration'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex min-h-screen bg-[#f1f5f9] dark:bg-dark-bg light:bg-light-bg transition-colors">
      {isAuthenticated && <Sidebar isOpen={isSidebarOpen} />}
      <div className={`flex-1 ${isAuthenticated && isSidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'} transition-all duration-300`}>
        {isAuthenticated && <TopBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
        <main className={isAuthenticated ? "p-4 md:p-8" : "min-h-screen"}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/select-role" element={<RoleSelection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/price-prediction" element={<ProtectedRoute><PricePrediction /></ProtectedRoute>} />
            <Route path="/crop-recommendation" element={<ProtectedRoute><CropRecommendation /></ProtectedRoute>} />
            <Route path="/weather-advice" element={<ProtectedRoute><WeatherAdvice /></ProtectedRoute>} />
            <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
            <Route path="/community/:communityId" element={<ProtectedRoute><CommunityDetail /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductComparison /></ProtectedRoute>} />
            <Route path="/register-retailer" element={<ProtectedRoute><RetailerRegistration /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
