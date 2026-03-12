import { ArrowLeft, Star, ShieldCheck, Zap, TrendingDown, Clock, MapPin, ShoppingCart, Info } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductComparison = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock data for different products
  const productsData: Record<string, any> = {
    '1': {
      name: 'Fresh Potatoes (Jalgaon Variety)',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f02bad177',
      description: 'Starch-rich, farm-fresh potatoes delivered to your door.',
      avgPrice: '₹18.50',
      lowestPrice: '₹17',
    },
    '2': {
      name: 'Premium Red Onions (Jalgaon)',
      image: 'https://images.unsplash.com/photo-1508747703725-719777637510',
      description: 'Delivered fresh to your location.',
      avgPrice: '₹23.50',
      lowestPrice: '₹22',
    },
    '3': {
      name: 'Sharbati Wheat (Jalgaon Farms)',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b',
      description: 'Gold-grade wheat grains, perfect for premium flour.',
      avgPrice: '₹30.00',
      lowestPrice: '₹28',
    },
    '4': {
      name: 'Organic Green Peas',
      image: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530',
      description: 'Sweet and tender green peas, harvested daily.',
      avgPrice: '₹65.00',
      lowestPrice: '₹60',
    },
    '5': {
      name: 'Desi Tomatoes (Pesticide Free)',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea',
      description: 'Juicy, sun-ripened tomatoes grown without pesticides.',
      avgPrice: '₹34.00',
      lowestPrice: '₹31',
    },
    '6': {
      name: 'Jalgaon Grand Naine Bananas',
      image: 'https://images.unsplash.com/photo-1571771894821-ad990261c611',
      description: 'Worlds famous Jalgaon bananas, sweet and nutritious.',
      avgPrice: '₹18.00',
      lowestPrice: '₹15',
    },
    '7': {
      name: 'Premium Basmati Rice',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
      description: 'Long-grain aromatic basmati rice from the foothills.',
      avgPrice: '₹95.00',
      lowestPrice: '₹85',
    },
    '8': {
      name: 'Kashmiri Apples',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6',
      description: 'Crunchy and sweet apples directly from Kashmiri orchards.',
      avgPrice: '₹140.00',
      lowestPrice: '₹120',
    }
  }

  const currentProduct = productsData[id || '2'] || productsData['2']

  const productInfo = {
    name: currentProduct.name,
    image: currentProduct.image,
    description: currentProduct.description,
    stats: [
      { label: 'AVG MARKET PRICE', value: currentProduct.avgPrice, unit: '/ kg', icon: TrendingDown, color: 'text-gray-400' },
      { label: 'LOWEST DEAL STARTS', value: currentProduct.lowestPrice, unit: 'inc. transport', icon: Zap, color: 'text-green-500' },
      { label: 'EST. FASTEST DELIVERY', value: 'Same Day', unit: '', icon: Clock, color: 'text-blue-500' },
      { label: 'VERIFIED FARMERS', value: '6 Direct', unit: '', icon: ShieldCheck, color: 'text-gray-400' },
    ]
  }

  const sellers = [
    {
      id: 1,
      name: 'Sunil Shinde',
      location: 'Bhusawal',
      rating: 4.5,
      basePrice: parseFloat(currentProduct.lowestPrice.replace('₹', '')) + 0.5,
      transport: 1.25,
      aiScore: 79.6,
      delivery: '1-Day Delivery',
      isRecommended: true,
    },
    {
      id: 2,
      name: 'Ramesh Patil',
      location: 'Jalgaon District',
      rating: 4.8,
      basePrice: parseFloat(currentProduct.lowestPrice.replace('₹', '')),
      transport: 0.28,
      aiScore: 78.2,
      delivery: 'Same Day Delivery',
      isRecommended: false,
    },
    {
      id: 3,
      name: 'Santosh Chaudhari',
      location: 'Muktainagar',
      rating: 4.7,
      basePrice: parseFloat(currentProduct.lowestPrice.replace('₹', '')) + 1.2,
      transport: 2.24,
      aiScore: 75.0,
      delivery: '2 Days',
      isRecommended: false,
    },
    {
      id: 4,
      name: 'Kishore Agro',
      location: 'Pachora',
      rating: 4.2,
      basePrice: parseFloat(currentProduct.lowestPrice.replace('₹', '')) + 0.15,
      transport: 3.15,
      aiScore: 71.1,
      delivery: '2 Days',
      isRecommended: false,
    },
    {
      id: 5,
      name: 'Vijay Farms',
      location: 'Yawal',
      rating: 5.0,
      basePrice: parseFloat(currentProduct.lowestPrice.replace('₹', '')) + 0.4,
      transport: 0.14,
      aiScore: 70.0,
      delivery: 'Same Day Delivery',
      isRecommended: false,
    },
    {
      id: 6,
      name: 'Ganesh Mali',
      location: 'Raver',
      rating: 4.4,
      basePrice: parseFloat(currentProduct.lowestPrice.replace('₹', '')) + 0.8,
      transport: 1.26,
      aiScore: 66.8,
      delivery: '2 Days',
      isRecommended: false,
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24">
      {/* Navigation */}
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-gray-500 hover:text-[#1b4332] font-bold transition-all group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Marketplace
      </button>

      {/* Product Hero Header */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-10 items-center">
        <div className="w-full lg:w-1/3 h-64 rounded-3xl overflow-hidden shadow-lg bg-gray-100">
          <img src={productInfo.image} alt={productInfo.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 space-y-8 w-full">
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="bg-orange-50 text-orange-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-orange-100">Live Comparison Active</span>
              <span className="bg-purple-50 text-purple-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-purple-100 flex items-center gap-1">
                <Zap size={10} fill="currentColor" />
                AI-Powered
              </span>
            </div>
            <h1 className="text-4xl font-black text-[#1b4332]">{productInfo.name}</h1>
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <MapPin size={18} className="text-gray-400" />
              {productInfo.description}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6 border-t border-gray-50">
            {productInfo.stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <Icon size={14} className={`${stat.color} mb-0.5`} />
                    <span className="text-xl font-black text-[#1e293b]">{stat.value}</span>
                    <span className="text-gray-400 text-xs font-bold">{stat.unit}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-[#1b4332]">Compare Deals</h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest cursor-pointer hover:text-[#1b4332]">
            AI-Ranked by Best Value
            <TrendingDown size={14} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sellers.map((seller) => (
            <div 
              key={seller.id} 
              className={`bg-white rounded-[2.5rem] overflow-hidden border transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 flex flex-col ${
                seller.isRecommended 
                  ? 'border-[#7c3aed] ring-4 ring-purple-50 shadow-purple-100' 
                  : 'border-gray-100 shadow-sm'
              }`}
            >
              {seller.isRecommended && (
                <div className="bg-gradient-to-r from-[#7c3aed] to-[#9333ea] py-2 px-6 flex items-center justify-center gap-2">
                   <Zap size={14} fill="white" className="text-white" />
                   <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">AI RECOMMENDED 🔥</span>
                </div>
              )}

              <div className="p-8 space-y-8 flex-1 flex flex-col">
                {/* Seller Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="text-xl font-black text-[#1e293b]">{seller.name}</h3>
                      <ShieldCheck size={16} className="text-blue-500" fill="#eff6ff" />
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-bold uppercase tracking-wider">
                      <MapPin size={12} />
                      {seller.location}
                    </div>
                  </div>
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-xl flex items-center gap-1.5">
                    <Star size={14} fill="currentColor" />
                    <span className="font-black text-sm">{seller.rating}</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-gray-400">
                    <span className="uppercase tracking-widest font-black text-[10px]">Farm Base Price</span>
                    <span className="text-[#1e293b]">₹{seller.basePrice.toFixed(2)}/kg</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-gray-400">
                    <span className="uppercase tracking-widest font-black text-[10px] flex items-center gap-2">
                       <TruckIcon size={14} />
                       Transport
                    </span>
                    <span className="text-gray-500">+₹{seller.transport.toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-6 border-t border-dashed border-gray-100 flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-green-600 text-[10px] font-black uppercase tracking-widest">Final Delivered Price</p>
                      <p className="text-3xl font-black text-[#1b4332]">₹{(seller.basePrice + seller.transport).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* AI Score */}
                <div className="bg-[#f8f9fa] rounded-2xl p-4 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <Info size={14} className="text-gray-400" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">AI Score</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${seller.aiScore}%` }}></div>
                    </div>
                    <span className="text-xs font-black text-purple-600">{seller.aiScore}%</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg w-fit ${
                    seller.delivery.includes('Same Day') ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'
                  }`}>
                    {seller.delivery}
                  </span>
                  <button className="w-full bg-[#00966d] hover:bg-[#1b4332] text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-green-900/10 group-hover:shadow-green-900/20">
                    <ShoppingCart size={20} />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const TruckIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
)

export default ProductComparison
