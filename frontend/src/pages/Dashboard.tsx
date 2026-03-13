import {
  TrendingUp, Lightbulb, CloudSun, AlertTriangle, Landmark, Users,
  ShoppingCart, Bell, ArrowRight, Leaf, BarChart2, Activity,
  FileText, MapPin
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRealtimeData } from '../hooks/useRealtimeData'
import { Community } from '../types/database'
import { useLanguage } from '../context/LanguageContext'

const Dashboard = () => {
  const { user } = useAuth()
  const { data: communities } = useRealtimeData<Community>('communities')
  const { t } = useLanguage()
  const firstName = user?.user_metadata?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'Farmer'
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? t('dashboard.greetingMorning') : hour < 18 ? t('dashboard.greetingAfternoon') : t('dashboard.greetingEvening')

  // Quick action feature cards
  const features = [
    {
      icon: TrendingUp,
      title: t('dashboard.predictCropPrices'),
      description: t('dashboard.cropPricePredictionDesc'),
      color: 'from-blue-600 to-blue-500',
      iconBg: 'bg-blue-500/20',
      link: '/price-prediction',
      badge: t('badge.aiPowered')
    },
    {
      icon: Lightbulb,
      title: t('dashboard.cropRecommendation'),
      description: t('dashboard.cropRecommendationDesc'),
      color: 'from-emerald-600 to-green-500',
      iconBg: 'bg-green-500/20',
      link: '/crop-recommendation',
      badge: t('badge.smart')
    },
    {
      icon: CloudSun,
      title: t('dashboard.weatherAdvice'),
      description: t('dashboard.weatherAdviceDesc'),
      color: 'from-orange-600 to-amber-500',
      iconBg: 'bg-orange-500/20',
      link: '/weather-advice',
      badge: t('badge.live')
    },
    {
      icon: AlertTriangle,
      title: t('dashboard.diseaseDetection'),
      description: t('dashboard.diseaseDetectionDesc'),
      color: 'from-red-600 to-rose-500',
      iconBg: 'bg-red-500/20',
      link: '/disease-detection',
      badge: t('badge.geminiAi')
    },
    {
      icon: Landmark,
      title: t('dashboard.governmentSchemes'),
      description: t('dashboard.governmentSchemesDesc'),
      color: 'from-purple-600 to-violet-500',
      iconBg: 'bg-purple-500/20',
      link: '/government-schemes',
      badge: t('badge.activeSchemes')
    },
    {
      icon: MapPin,
      title: t('dashboard.buyerMarketplace'),
      description: t('dashboard.buyerMarketplaceDesc'),
      color: 'from-cyan-600 to-teal-500',
      iconBg: 'bg-cyan-500/20',
      link: '/marketplace',
      badge: t('badge.liveMap')
    },
    {
      icon: Users,
      title: t('dashboard.communityHub'),
      description: t('dashboard.communityHubDesc'),
      color: 'from-pink-600 to-rose-500',
      iconBg: 'bg-pink-500/20',
      link: '/community',
      badge: t('badge.communities').replace('{count}', communities.length.toString())
    },
    {
      icon: ShoppingCart,
      title: t('dashboard.myOrders'),
      description: t('dashboard.myOrdersDesc'),
      color: 'from-yellow-600 to-amber-500',
      iconBg: 'bg-yellow-500/20',
      link: '/orders',
      badge: t('badge.track')
    }
  ]

  // Stats bar data
  const stats = [
    { icon: BarChart2, label: t('stat.cropsSupported'), value: '5', sub: t('stat.cropsSub'), color: 'text-blue-400' },
    { icon: Landmark, label: t('stat.govtSchemes'), value: '8', sub: t('stat.schemesSub'), color: 'text-purple-400' },
    { icon: MapPin, label: t('stat.maharashtraMandis'), value: '100+', sub: t('stat.mandisSub'), color: 'text-green-400' },
    { icon: Activity, label: t('stat.aiModels'), value: '3', sub: t('stat.modelsSub'), color: 'text-orange-400' },
  ]

  // Quick tips for farmers
  const tips = [
    { icon: '🌧️', text: t('tip.1') },
    { icon: '💉', text: t('tip.2') },
    { icon: '📈', text: t('tip.3') },
    { icon: '📋', text: t('tip.4') },
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
            {t('dashboard.welcomeMsg')}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            {t('dashboard.assistantDesc')}
          </p>
          <div className="flex gap-3 mt-6">
            <Link
              to="/price-prediction"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02]"
            >
              <TrendingUp size={18} />
              {t('dashboard.predictCropPrices')}
            </Link>
            <Link
              to="/disease-detection"
              className="inline-flex items-center gap-2 bg-dark-card hover:bg-dark-hover border border-dark-border text-white font-semibold px-5 py-2.5 rounded-xl transition-all"
            >
              <AlertTriangle size={18} />
              {t('dashboard.checkDisease')}
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
          <h2 className="text-xl font-bold text-white">{t('dashboard.allFeatures')}</h2>
          <span className="text-xs text-gray-500">{t('dashboard.modulesAvailable')}</span>
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
                  {t('dashboard.open')} <ArrowRight size={12} />
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
            <h2 className="text-lg font-bold text-white">{t('dashboard.farmingTips')}</h2>
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
            <h2 className="text-lg font-bold text-white">{t('dashboard.quickAccess')}</h2>
          </div>
          <div className="space-y-2">
            {[
              { label: t('label.produceListings'), link: '/produce-listings', icon: '🌽' },
              { label: t('dashboard.myOrders'), link: '/orders', icon: '📦' },
              { label: t('dashboard.governmentSchemes'), link: '/government-schemes', icon: '🏛️' },
              { label: t('dashboard.communityHub'), link: '/community', icon: '💬' },
              { label: t('label.profileSettings'), link: '/profile', icon: '👤' },
              { label: t('label.appSettings'), link: '/settings', icon: '⚙️' },
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
