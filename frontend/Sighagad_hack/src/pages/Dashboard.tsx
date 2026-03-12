import { useAuth } from '../context/AuthContext'
import FarmerDashboard from './FarmerDashboard'
import CustomerDashboard from './CustomerDashboard'
import RetailerDashboard from './RetailerDashboard'

const Dashboard = () => {
  const { user } = useAuth()

  if (!user) return null

  switch (user.role) {
    case 'farmer':
      return <FarmerDashboard />
    case 'customer':
      return <CustomerDashboard />
    case 'retailer':
      return <RetailerDashboard />
    default:
      return <FarmerDashboard />
  }
}

export default Dashboard
