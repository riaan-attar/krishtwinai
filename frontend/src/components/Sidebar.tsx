import { 
  LayoutDashboard, 
  TrendingUp, 
  Lightbulb, 
  CloudSun, 
  ShoppingCart, 
  Users, 
  Package, 
  User, 
  Settings, 
  LogOut,
  Leaf,
  Tag,
  Store
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface SidebarProps {
  isOpen: boolean
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    logout()
    navigate('/login')
  }

  const navItems = [
    // Farmer Items
    { icon: LayoutDashboard, label: 'Dashboard', section: 'main', path: '/dashboard', roles: ['farmer'] },
    { icon: TrendingUp, label: 'Crop Price Prediction', section: 'ai-tools', path: '/price-prediction', roles: ['farmer'] },
    { icon: Lightbulb, label: 'Crop Recommendation', section: 'ai-tools', path: '/crop-recommendation', roles: ['farmer'] },
    { icon: CloudSun, label: 'Weather & Farming Advice', section: 'ai-tools', path: '/weather-advice', roles: ['farmer'] },
    { icon: ShoppingCart, label: 'Marketplace', section: 'platform', path: '/dashboard', roles: ['farmer'] },
    { icon: Users, label: 'Community', section: 'platform', path: '/community', roles: ['farmer'] },
    { icon: Package, label: 'Orders', section: 'platform', path: '/orders', roles: ['farmer'] },

    // Customer Items (Strictly Image 2)
    { icon: ShoppingCart, label: 'Marketplace', section: 'main', path: '/dashboard', roles: ['customer'] },
    { icon: Tag, label: 'My Orders', section: 'account', path: '/orders', roles: ['customer'] },

    // Retailer Items (Strictly Image 3)
    { icon: LayoutDashboard, label: 'Dashboard', section: 'main', path: '/dashboard', roles: ['retailer'] },
    { icon: Store, label: 'Register as Retailer', section: 'manage', path: '/register-retailer', roles: ['retailer'] },

    // Common Account items
    { icon: User, label: 'Profile', section: 'account', path: '/profile', roles: ['farmer', 'retailer', 'customer'] },
    { icon: Settings, label: 'Settings', section: 'account', path: '/settings', roles: ['farmer', 'retailer', 'customer'] },
  ]

  const sections = {
    'ai-tools': 'AI Tools',
    'platform': 'Platform',
    'manage': 'Manage',
    'account': 'Account'
  }

  const filteredNavItems = navItems.filter(item => 
    !user || item.roles.includes(user.role)
  )

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#f8f9fa] border-r border-gray-100 transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-0'
      } overflow-hidden`}
    >
      <div className="flex items-center gap-3 p-8 border-b border-gray-100">
        <Leaf className="text-[#2d6a4f]" size={28} />
        <span className="text-xl font-black text-[#1b4332]">KrishiSetu AI</span>
      </div>

      <nav className="py-6 overflow-y-auto h-[calc(100vh-180px)]">
        {filteredNavItems.map((item, index) => {
          const Icon = item.icon
          const showSection = index > 0 && 
                             filteredNavItems[index - 1].section !== item.section && 
                             sections[item.section as keyof typeof sections]
          const isActive = location.pathname === item.path
          
          return (
            <div key={item.label + item.path}>
              {showSection && (
                <div className="px-6 py-4 text-[10px] uppercase text-gray-400 font-black tracking-[0.2em]">
                  {sections[item.section as keyof typeof sections]}
                </div>
              )}
              <Link
                to={item.path}
                className={`flex items-center px-8 py-3.5 transition-all duration-200 group relative ${
                  isActive 
                    ? 'text-[#1b4332] font-bold' 
                    : 'text-gray-500 hover:text-[#1b4332] font-medium'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2d6a4f] rounded-r-lg" />
                )}
                <Icon size={20} className={`${isActive ? 'text-[#2d6a4f]' : 'text-gray-400 group-hover:text-[#2d6a4f]'} mr-4 transition-colors`} />
                <span className="text-sm">{item.label}</span>
              </Link>
            </div>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-3 text-red-500 hover:bg-red-50 transition-all rounded-xl font-bold text-sm"
        >
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
