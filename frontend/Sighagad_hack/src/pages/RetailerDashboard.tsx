import { useState } from 'react'
import { 
  MapPin, 
  Phone, 
  Star, 
  ArrowLeft, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUpCircle,
  Leaf,
  ExternalLink,
  ShoppingCart
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const [crops] = useState([
    { id: 1, name: 'Wheat', stock: 480, price: 2850, icon: '🌾', color: 'bg-orange-50 text-orange-600 border-orange-100' },
    { id: 2, name: 'Onions', stock: 190, price: 2100, icon: '🧅', color: 'bg-green-50 text-green-600 border-green-100' },
    { id: 3, name: 'Potatoes', stock: 290, price: 1850, icon: '🥔', color: 'bg-green-50 text-green-600 border-green-100' },
    { id: 4, name: 'Tomatoes', stock: 145, price: 2600, icon: '🍅', color: 'bg-green-50 text-green-600 border-green-100' },
  ])

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Top Banner Context Card - STRICT IMAGE 3 */}
      <div className="bg-white rounded-[3rem] shadow-xl shadow-green-900/5 border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[400px]">
        {/* Store Profile Section */}
        <div className="md:w-[55%] relative group">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e" 
            alt="Storefront" 
            className="w-full h-full object-cover min-h-[300px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-12 flex flex-col justify-end text-white">
            <div className="space-y-4">
              <h1 className="text-5xl font-black leading-tight tracking-tight">Anand Vegetable <br/> And Company</h1>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400 text-black px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
                  <Star size={18} fill="black" />
                  <span className="font-extrabold">4.8</span>
                </div>
                <span className="text-sm font-black opacity-80 uppercase tracking-widest">(124 verified reviews)</span>
              </div>
            </div>
          </div>
          {/* Edit overlay */}
          <div className="absolute top-8 right-8 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:bg-white/40 shadow-xl border border-white/20">
            <Edit3 size={24} />
          </div>
        </div>

        {/* Store Info Cards */}
        <div className="md:w-[45%] p-10 md:p-16 space-y-8 flex flex-col justify-center bg-[#fdfdfd] relative">
          {/* Decorative element from screenshot */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-20 opacity-[0.03] rotate-12 scale-150 pointer-events-none">
             <ShoppingCart size={400} />
          </div>

          <div className="flex items-center gap-8 p-8 rounded-[2.5rem] bg-white border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-[#00966d]/10 transition-all group relative z-10">
            <div className="bg-red-50 p-5 rounded-2xl text-red-500 group-hover:scale-110 transition-transform">
              <MapPin size={32} />
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none">Store Location</p>
              <p className="text-[#1b4332] text-lg font-black leading-tight">Jalgaon City, Jalgaon, Maharashtra</p>
            </div>
          </div>

          <div className="flex items-center gap-8 p-8 rounded-[2.5rem] bg-white border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-[#00966d]/10 transition-all group relative z-10">
            <div className="bg-blue-50 p-5 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
              <Phone size={32} />
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none">Contact Information</p>
              <p className="text-[#1b4332] text-lg font-black leading-tight">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 px-10 rounded-[2rem] border border-gray-100 shadow-sm gap-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-[#1b4332] font-black transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Market
        </button>

        <button className="bg-[#e8f5e9] text-[#2e7d32] px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-[#c8e6c9] transition-all group">
          <Leaf size={24} className="group-hover:rotate-12 transition-transform" />
          Quick Purchase
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Map Integration Section */}
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 space-y-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-50 p-2 rounded-lg text-[#00966d]">
              <MapPin size={24} />
            </div>
            <h2 className="text-2xl font-black text-[#1e293b]">Live Maps</h2>
          </div>

          <div className="space-y-6">
             {/* Mock Map Placeholder */}
             <div className="relative rounded-[2.5rem] overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" 
                  className="w-full h-[380px] object-cover opacity-60 grayscale-[0.5]" 
                  alt="Map Placeholder" 
                />
                
                {/* Map Overlay elements from screenshot */}
                <div className="absolute inset-0 p-4">
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black shadow-lg border border-gray-100 flex items-center gap-2 w-fit">
                    <span className="text-blue-600">Open in Maps</span>
                    <ExternalLink size={12} className="text-blue-600" />
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="relative">
                      <div className="absolute -inset-6 bg-[#ef4444]/20 rounded-full animate-pulse"></div>
                      <div className="relative bg-white p-2 rounded-full shadow-2xl border-4 border-[#ef4444]">
                         <MapPin size={24} className="text-[#ef4444]" fill="currentColor" fillOpacity={0.2} />
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white px-3 py-1.5 rounded-xl shadow-xl border border-gray-100 whitespace-nowrap">
                        <p className="text-[10px] font-black text-[#1e293b]">Anand Vegetable</p>
                        <p className="text-[8px] font-bold text-gray-400">And Company</p>
                      </div>
                   </div>
                </div>

                {/* Google logo corner */}
                <div className="absolute bottom-2 left-4">
                  <span className="text-[10px] font-bold text-gray-500 opacity-50">Google</span>
                </div>
             </div>

             <button className="w-full py-5 rounded-[1.5rem] bg-gray-50 text-[#1e293b] font-black border border-gray-100 flex items-center justify-center gap-3 hover:bg-white hover:shadow-lg transition-all group">
                Open Google Maps
                <ExternalLink size={18} />
             </button>
          </div>
        </div>

        {/* Inventory Section */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-12 border border-gray-100 shadow-sm">
           <div className="space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <ShoppingCart size={32} className="text-[#1e293b]" />
                    </div>
                    <div className="space-y-1">
                       <h2 className="text-3xl font-black text-[#1e293b]">Manage Inventory</h2>
                       <p className="text-sm font-bold text-gray-400 max-w-sm leading-relaxed">
                         Configure wholesale market prices and available stock
                       </p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                    <button className="bg-[#2563eb] text-white px-10 py-4 rounded-full font-black shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all text-sm">
                       Save Changes
                    </button>
                    <button className="bg-[#1b4332] text-white px-8 py-4 rounded-full font-black flex items-center gap-3 shadow-lg shadow-green-900/10 hover:bg-[#00966d] transition-all text-sm">
                       <Plus size={20} />
                       Add Crop
                    </button>
                 </div>
              </div>

              {/* Crop Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {crops.map((crop, index) => (
                    <div 
                      key={crop.id} 
                      className={`bg-white rounded-[2rem] p-8 border transition-all duration-300 ${
                        index === 0 
                          ? 'border-orange-300 ring-2 ring-orange-50 shadow-xl' 
                          : 'border-gray-100 shadow-sm hover:shadow-md'
                      }`}
                    >
                       <div className="flex items-center gap-6 mb-10">
                          <div className={`p-4 rounded-2xl text-2xl border shadow-sm ${crop.color}`}>
                             {crop.icon}
                          </div>
                          <div>
                             <h3 className="text-xl font-black text-[#1e293b]">{crop.name}</h3>
                             <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">Stock: {crop.stock} quintal</p>
                          </div>
                       </div>

                       <div className="pt-8 border-t border-gray-50 flex justify-between items-end">
                          <div className="space-y-2">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">PRICE / QUINTAL</p>
                             <p className="text-4xl font-black text-[#1b4332]">₹{crop.price}</p>
                          </div>
                          <div className="flex gap-2">
                             <button className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-500 hover:text-[#00966d] hover:bg-green-50 transition-all">
                                <Edit3 size={18} />
                             </button>
                             <button className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-400">
                                <ArrowUpCircle size={18} />
                             </button>
                             <button className="p-2.5 rounded-xl bg-red-50 border border-red-100 text-red-400">
                                <Trash2 size={18} />
                             </button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
      
      {/* Floating Action Button from screenshot */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-[#00966d] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-900/40 hover:scale-110 transition-all z-[100] group">
        <div className="relative">
          <Leaf size={28} className="transition-transform group-hover:rotate-12" />
          <Plus size={14} className="absolute -top-1 -right-1 bg-[#1b4332] rounded-full p-0.5 border-2 border-[#00966d]" />
        </div>
      </button>
    </div>
  )
}

export default RetailerDashboard
