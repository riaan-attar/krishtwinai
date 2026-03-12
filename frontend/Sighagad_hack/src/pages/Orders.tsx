import { Plus, CheckCircle, Truck, Clock, Search } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ListProduceModal from '../components/ListProduceModal'

interface Order {
  id: string
  orderNumber: string
  placedDate: string
  status: 'delivered' | 'in-transit' | 'ordered'
  product: string
  location: string
  buyer: string
  quantity: string
  totalPayout: string
}

const Orders = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isListProduceOpen, setIsListProduceOpen] = useState(false)

  const isCustomer = user?.role === 'customer'

  const orders: Order[] = [] // Empty for the "No orders yet" view shown in screenshot

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-black uppercase tracking-wider">
            <CheckCircle size={14} />
            Delivered
          </span>
        )
      case 'in-transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-black uppercase tracking-wider">
            <Truck size={14} />
            In Transit
          </span>
        )
      case 'ordered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-xs font-black uppercase tracking-wider">
            <Clock size={14} />
            Ordered
          </span>
        )
      default:
        return null
    }
  }

  if (isCustomer && orders.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">My Purchases</h1>
            <p className="text-gray-500 font-medium">Track the status of your farm-fresh grocery orders.</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all text-sm"
          >
            <Search size={18} />
            Continue Shopping
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[500px] flex flex-col items-center justify-center p-12 text-center space-y-8">
          <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center">
            <Truck className="text-gray-300" size={56} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-[#111827]">No orders yet</h2>
            <p className="text-gray-500 font-medium max-w-sm">
              Looks like you haven't bought any fresh produce yet. Head back to the marketplace to explore great deals.
            </p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#10b981] hover:bg-[#059669] text-white font-extrabold px-10 py-4 rounded-xl shadow-lg shadow-green-900/10 transition-all active:scale-95 text-lg"
          >
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-[#1b4332] mb-2">{isCustomer ? 'My Purchases' : 'Farmer Orders'}</h1>
          <p className="text-gray-500 font-medium">
            {isCustomer 
              ? 'Track the status of your farm-fresh grocery orders.' 
              : `Manage your incoming produce shipments across ${orders.length} orders.`}
          </p>
        </div>
        {!isCustomer && (
          <button 
            onClick={() => setIsListProduceOpen(true)}
            className="bg-[#00966d] hover:bg-[#1b4332] text-white font-bold px-8 py-4 rounded-xl transition-all active:scale-95 flex items-center gap-3 shadow-xl shadow-green-900/10"
          >
            <Plus size={24} />
            List Produce
          </button>
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            {/* Order Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black text-[#1b4332] mb-1">Order #{order.orderNumber}</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Placed on {order.placedDate}</p>
              </div>
              {getStatusBadge(order.status)}
            </div>

            {/* Order Details */}
            <div className="border-t border-gray-50 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex-1">
                  <h4 className="text-xl font-black text-[#1e293b] mb-2">{order.product}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{isCustomer ? 'Seller' : 'Buyer'}:</span>
                    <span className="text-[#2d6a4f] font-bold">{order.buyer}</span>
                  </div>
                </div>

                <div className="flex gap-12 text-right w-full md:w-auto overflow-x-auto pb-2">
                  <div className="whitespace-nowrap">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-right">QUANTITY</p>
                    <p className="text-2xl font-black text-[#1e293b]">{order.quantity}</p>
                  </div>
                  <div className="whitespace-nowrap">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-right">{isCustomer ? 'TOTAL AMOUNT' : 'TOTAL PAYOUT'}</p>
                    <p className="text-2xl font-black text-[#00966d]">{order.totalPayout}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Farmers */}
      {!isCustomer && (
        <>
          <ListProduceModal 
            isOpen={isListProduceOpen}
            onClose={() => setIsListProduceOpen(false)}
          />
          <button 
            onClick={() => setIsListProduceOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-[#00966d] hover:bg-[#1b4332] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95 group"
          >
            <Plus className="transition-transform group-hover:rotate-90" size={32} />
          </button>
        </>
      )}
    </div>
  )
}

export default Orders
