import {
  TrendingUp, Lightbulb, CloudSun, AlertTriangle, Landmark, Users,
  ShoppingCart, Bell, ArrowRight, Leaf, BarChart2, Activity,
  FileText, MapPin
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRealtimeData } from '../hooks/useRealtimeData'
import { Community } from '../types/database'

const Dashboard = () => {
  const { user } = useAuth()
  const { data: communities } = useRealtimeData<Community>('communities')
  const firstName = user?.user_metadata?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'Farmer'
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  // Quick action feature cards
  const features = [
    {
      icon: TrendingUp,
      title: 'Crop Price Prediction',
      description: 'Predict mandi prices for the next 4 days across Maharashtra markets.',
      color: 'from-blue-600 to-blue-500',
      iconBg: 'bg-blue-500/20',
      link: '/price-prediction',
      badge: 'AI Powered'
    },
    {
      icon: Lightbulb,
      title: 'Crop Recommendation',
      description: 'Get AI-tailored suggestions based on soil and season.',
      color: 'from-emerald-600 to-green-500',
      iconBg: 'bg-green-500/20',
      link: '/crop-recommendation',
      badge: 'Smart'
    },
    {
      icon: CloudSun,
      title: 'Weather Advice',
      description: 'Real-time weather forecasts with actionable farming tips.',
      color: 'from-orange-600 to-amber-500',
      iconBg: 'bg-orange-500/20',
      link: '/weather-advice',
      badge: 'Live'
    },
    {
      icon: AlertTriangle,
      title: 'Disease Detection',
      description: 'Upload a photo of your crop — get instant disease diagnosis + AI treatment plan.',
      color: 'from-red-600 to-rose-500',
      iconBg: 'bg-red-500/20',
      link: '/disease-detection',
      badge: 'Gemini AI'
    },
    {
      icon: Landmark,
      title: 'Government Schemes',
      description: 'Browse loan waivers, subsidies and insurance schemes for Maharashtra farmers.',
      color: 'from-purple-600 to-violet-500',
      iconBg: 'bg-purple-500/20',
      link: '/government-schemes',
      badge: '8 Active Schemes'
    },
    {
      icon: MapPin,
      title: 'Buyer Marketplace',
      description: 'Connect with verified buyers and retailers across Maharashtra on the map.',
      color: 'from-cyan-600 to-teal-500',
      iconBg: 'bg-cyan-500/20',
      link: '/marketplace',
      badge: 'Live Map'
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Chat with farmers, share insights, and grow together.',
      color: 'from-pink-600 to-rose-500',
      iconBg: 'bg-pink-500/20',
      link: '/community',
      badge: `${communities.length} Communities`
    },
    {
      icon: ShoppingCart,
      title: 'My Orders',
      description: 'Track your active orders and manage deliveries.',
      color: 'from-yellow-600 to-amber-500',
      iconBg: 'bg-yellow-500/20',
      link: '/orders',
      badge: 'Track'
    }
  ]

  // Stats bar data
  const stats = [
    { icon: BarChart2, label: 'Crops Supported', value: '5', sub: 'Onion, Wheat, Rice, Tomato, Potato', color: 'text-blue-400' },
    { icon: Landmark, label: 'Govt Schemes', value: '8', sub: 'Active schemes available', color: 'text-purple-400' },
    { icon: MapPin, label: 'Maharashtra Mandis', value: '100+', sub: 'Markets tracked', color: 'text-green-400' },
    { icon: Activity, label: 'AI Models', value: '3', sub: 'Price, Disease & Weather', color: 'text-orange-400' },
  ]

  // Quick tips for farmers
  const tips = [
    { icon: '🌧️', text: 'Kharif season starts June–July. Start planning water management early.' },
    { icon: '💉', text: 'Upload crop images regularly to detect diseases before they spread.' },
    { icon: '📈', text: 'Check 4-day price predictions before selling your produce at mandi.' },
    { icon: '📋', text: 'Pradhan Mantri Fasal Bima Yojana deadline — enroll before planting.' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-900/40 to-emerald-900/20 border border-green-500/20 rounded-2xl p-8">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-2 right-8 text-[120px]">🌾</div>
          <div className="absolute top-10 right-40 text-[60px]">🌱</div>
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-2">
            <Leaf size={14} />
            KrishiSetu AI Dashboard
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Your AI-powered farming assistant for Maharashtra. Get crop predictions, detect diseases, explore government schemes, and connect with buyers — all in one place.
          </p>
          <div className="flex gap-3 mt-6">
            <Link
              to="/price-prediction"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02]"
            >
              <TrendingUp size={18} />
              Predict Crop Prices
            </Link>
            <Link
              to="/disease-detection"
              className="inline-flex items-center gap-2 bg-dark-card hover:bg-dark-hover border border-dark-border text-white font-semibold px-5 py-2.5 rounded-xl transition-all"
            >
              <AlertTriangle size={18} />
              Check Disease
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-dark-card border border-dark-border rounded-xl p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Icon size={18} className={stat.color} />
                <span className="text-gray-400 text-xs font-medium">{stat.label}</span>
              </div>
              <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-gray-500 text-xs">{stat.sub}</span>
            </div>
          )
        })}
      </div>

      {/* Feature Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">All Features</h2>
          <span className="text-xs text-gray-500">8 modules available</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat) => {
            const Icon = feat.icon
            return (
              <Link
                key={feat.title}
                to={feat.link}
                className="group bg-dark-card border border-dark-border hover:border-green-500/40 rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/5 hover:-translate-y-0.5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 ${feat.iconBg} rounded-xl flex items-center justify-center`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-dark-hover text-gray-400 border border-dark-border">
                    {feat.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1 group-hover:text-green-400 transition-colors">{feat.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{feat.description}</p>
                </div>
                <div className="flex items-center gap-1 text-green-500 text-xs font-semibold mt-auto pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <ArrowRight size={12} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Bottom Row: Tips + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Farming Tips */}
        <div className="lg:col-span-2 bg-dark-card rounded-xl border border-dark-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell size={18} className="text-green-400" />
            <h2 className="text-lg font-bold text-white">Farming Tips & Reminders</h2>
          </div>
          <div className="space-y-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-dark-bg rounded-xl border border-dark-border">
                <span className="text-2xl">{tip.icon}</span>
                <p className="text-gray-300 text-sm leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links Sidebar */}
        <div className="bg-dark-card rounded-xl border border-dark-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <FileText size={18} className="text-green-400" />
            <h2 className="text-lg font-bold text-white">Quick Access</h2>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Produce Listings', link: '/produce-listings', icon: '🌽' },
              { label: 'My Orders', link: '/orders', icon: '📦' },
              { label: 'Government Schemes', link: '/government-schemes', icon: '🏛️' },
              { label: 'Community Hub', link: '/community', icon: '💬' },
              { label: 'Profile Settings', link: '/profile', icon: '👤' },
              { label: 'App Settings', link: '/settings', icon: '⚙️' },
            ].map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-hover border border-transparent hover:border-dark-border transition-all group"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
                <ArrowRight size={14} className="ml-auto text-gray-600 group-hover:text-green-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
