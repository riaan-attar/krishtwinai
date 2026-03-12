import { Search, Tag, ShoppingCart, Leaf, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListProduceModal from '../components/ListProduceModal'

const CustomerDashboard = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [isListProduceOpen, setIsListProduceOpen] = useState(false)

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Staples']

  const products = [
    { id: 1, name: 'Fresh Potatoes (Jalgaon Variety)', price: 18, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f02bad177', unit: 'kg' },
    { id: 2, name: 'Premium Red Onions (Jalgaon)', price: 22, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1508747703725-719777637510', unit: 'kg' },
    { id: 3, name: 'Sharbati Wheat (Jalgaon Farms)', price: 28, category: 'Grains', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b', unit: 'kg' },
    { id: 4, name: 'Organic Green Peas', price: 60, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530', unit: 'kg' },
    { id: 5, name: 'Desi Tomatoes (Pesticide Free)', price: 31, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea', unit: 'kg' },
    { id: 6, name: 'Jalgaon Grand Naine Bananas', price: 15, category: 'Fruits', image: 'https://images.unsplash.com/photo-1571771894821-ad99026.1c61', unit: 'kg' },
    { id: 7, name: 'Premium Basmati Rice', price: 85, category: 'Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c', unit: 'kg' },
    { id: 8, name: 'Kashmiri Apples', price: 120, category: 'Fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6', unit: 'kg' },
    { id: 9, name: 'Organic Garlic', price: 150, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383', unit: 'kg' },
    { id: 10, name: 'Toor Dal (Unpolished)', price: 140, category: 'Staples', image: 'https://images.unsplash.com/photo-1598115652513-a790570ccca8', unit: 'kg' },
    { id: 11, name: 'Ratnagiri Alphonso Mango', price: 400, category: 'Fruits', image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed', unit: 'kg' },
    { id: 12, name: 'Fresh Spinach (Palak)', price: 40, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb', unit: 'kg' }
  ]

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-[#1b4332] mb-2 tracking-tight">Customer Marketplace</h1>
        <p className="text-gray-500 font-bold text-lg">
          Buy fresh produce, vegetables, and grains directly from farmers at wholesale prices.
        </p>
      </div>

      {/* Promo Banner from Screenshot 2 */}
      <div className="relative rounded-[3rem] overflow-hidden h-96 group shadow-2xl shadow-green-900/10 border border-gray-100">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e" 
          alt="Marketplace Banner" 
          className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent flex flex-col justify-center px-16 space-y-6">
          <span className="bg-[#00966d] text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit uppercase tracking-widest shadow-lg">Super Saver Deals!</span>
          <h2 className="text-7xl font-black text-white leading-none">Farm Fresh <br/> Deliveries</h2>
          <p className="text-2xl text-white font-bold opacity-90 tracking-tight">Directly from local fields to your home</p>
          <div className="flex gap-3 mt-6">
            <div className="w-12 h-2 bg-[#00966d] rounded-full"></div>
            <div className="w-4 h-2 bg-white/30 rounded-full"></div>
            <div className="w-4 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex bg-gray-50 p-1.5 rounded-full border border-gray-100 shadow-sm overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-black transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#1b4332] text-white shadow-xl shadow-green-900/20'
                  : 'text-gray-400 hover:text-[#1b4332]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-[400px]">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-16 pr-6 py-5 bg-gray-50 rounded-full text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#00966d]/10 transition-all border border-gray-100"
          />
        </div>
      </div>

      {/* Product Grid - 12 items matched to Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
            <div className="relative h-60 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <span className="absolute top-5 left-5 bg-white/95 backdrop-blur-md text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg text-gray-800 uppercase tracking-widest border border-white/50">
                {product.category}
              </span>
            </div>
            <div className="p-8 space-y-6">
              <h3 className="text-xl font-black text-[#1e293b] leading-tight min-h-[3rem]">{product.name}</h3>
              <div className="bg-gray-50/80 rounded-[1.5rem] p-5 border border-gray-100 transition-all group-hover:bg-white group-hover:border-[#00966d]/20">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2 leading-none">PRICES STARTING FROM</p>
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-[#00966d]" />
                  <span className="text-3xl font-black text-[#1b4332]">₹{product.price}</span>
                  <span className="text-gray-400 text-sm font-black uppercase tracking-widest mt-1">/{product.unit}</span>
                </div>
              </div>
              <button 
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full bg-[#00966d] hover:bg-[#1b4332] text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-green-900/10 hover:shadow-green-900/20 group"
              >
                <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Listing Promo - Strictly Image 2 */}
      <div className="bg-[#ebfef5] rounded-[3.5rem] p-12 md:p-20 border border-green-100 text-center space-y-8 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-200/20 rounded-full -translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-200/20 rounded-full translate-x-16 translate-y-16"></div>
        
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-green-50">
            <Leaf className="text-[#00966d]" size={32} />
          </div>
          <h3 className="text-4xl font-black text-[#1b4332]">Are you a Farmer or Seller?</h3>
          <p className="text-gray-600 max-w-xl mx-auto text-lg font-bold leading-relaxed opacity-80">
            List your fresh produce directly in the marketplace. Buyers can see your price, quantity, and contact you directly.
          </p>
          <button 
            onClick={() => setIsListProduceOpen(true)}
            className="bg-[#00966d] hover:bg-[#1b4332] text-white font-black px-12 py-5 rounded-2xl transition-all active:scale-95 flex items-center gap-3 shadow-2xl shadow-green-900/20 hover:shadow-green-900/40"
          >
            <Tag size={24} />
            List Your Produce
          </button>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 w-20 h-20 bg-[#00966d] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-900/40 hover:scale-110 transition-all z-[100] group">
        <Plus size={32} className="transition-transform group-hover:rotate-90" />
      </button>

      <ListProduceModal 
        isOpen={isListProduceOpen}
        onClose={() => setIsListProduceOpen(false)}
      />
    </div>
  )
}

export default CustomerDashboard
