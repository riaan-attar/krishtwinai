import { useState } from 'react'
import { 
  MapPin, 
  ChevronDown, 
  Navigation, 
  Star, 
  Send,
  Zap,
  Layout,
  Search,
  Maximize2,
  Scan
} from 'lucide-react'

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Buyer Map')
  const [selectedCrop, setSelectedCrop] = useState('Wheat (Sharbati)')

  const buyers = [
    {
      id: 1,
      name: 'Anand Vegetable And Company',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
      isRecommended: true,
      tag: 'WHOLESALE MARKET',
      rating: 4.8,
      offeredPrice: '2850/q',
      transport: 'N/A',
      netProfit: '2850/q'
    },
    {
      id: 2,
      name: 'Ekdunt Vegetables',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b',
      isRecommended: false,
      tag: 'WHOLESALE MARKET',
      rating: 4.6,
      offeredPrice: '2800/q',
      transport: 'N/A',
      netProfit: '2800/q'
    },
    {
      id: 3,
      name: 'RATNA TRADING COMPANY',
      image: 'https://images.unsplash.com/photo-159524357228-91a4daadcfea',
      isRecommended: false,
      tag: 'WHOLESALE MARKET',
      rating: 4.2,
      offeredPrice: '2750/q',
      transport: '₹50/q',
      netProfit: '2700/q'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-[#1e293b]">Buyer Network</h1>
          <p className="text-gray-500 font-bold text-lg">Locate verified wholesale buyers and exporters for your produce directly on the map.</p>
        </div>
      </div>

      {/* Tabs and Crop Selector Row */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-transparent gap-4">
        <div className="flex gap-8 border-b-2 border-gray-100 w-full md:w-auto">
          {['Buyer Map', 'Live Market & Buyers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-black transition-all relative ${
                activeTab === tab 
                  ? 'text-[#1e293b]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[#1e293b]"></div>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
             <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Selling Crop:</span>
             <button className="flex items-center gap-2 font-black text-[#1e293b]">
                {selectedCrop}
                <ChevronDown size={16} />
             </button>
          </div>
        </div>
      </div>

      {/* Discover Banner */}
      <div className="bg-[#e7f3ee] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#d1e7dd]">
        <div className="flex items-center gap-8">
          <div className="bg-white p-5 rounded-[2rem] text-[#00966d] shadow-sm border border-[#d1e7dd]">
            <MapPin size={40} />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-[#1b4332]">Discover Buyers & Retailers</h3>
            <p className="text-[#2d6a4f] font-bold leading-relaxed max-w-xl">
              Detect your location to find the nearest and most profitable buyers for your crop using live OpenStreetMap tracking.
            </p>
          </div>
        </div>
        <button className="bg-[#1b4332] text-white px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-[#00966d] transition-all shadow-xl shadow-green-900/20">
          <Scan size={24} />
          Detect My Location
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: List */}
        <div className="lg:col-span-1 border-r border-gray-100 hidden lg:block">
           {/* Mobile indicator for small layout but technically side scroll in image */}
        </div>
        
        <div className="lg:col-span-4 space-y-6">
           <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-black text-[#1e293b]">Nearby Retailers</h2>
              <button className="text-xs font-black text-gray-400 flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                 Highest Profit
                 <ChevronDown size={14} />
              </button>
           </div>

           <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              {buyers.map((buyer) => (
                <div key={buyer.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group border-b-4 border-b-transparent hover:border-b-[#00966d]">
                   <div className="flex items-center gap-5 mb-8">
                      <img src={buyer.image} alt={buyer.name} className="w-16 h-16 rounded-[1.25rem] object-cover shadow-md" />
                      <div className="space-y-1">
                         <div className="flex items-center gap-2">
                            <h4 className="font-black text-[#1e293b] leading-tight">{buyer.name}</h4>
                            <div className="text-blue-500 bg-blue-50 p-0.5 rounded-full">
                               <Zap size={10} fill="currentColor" />
                            </div>
                         </div>
                         {buyer.isRecommended && (
                           <div className="bg-green-50 text-[#00966d] text-[8px] font-black px-2 py-0.5 rounded-full w-fit border border-green-100">
                              AI Recommended
                           </div>
                         )}
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{buyer.tag}</span>
                            <div className="flex items-center gap-1.5 text-yellow-500 font-black text-[10px]">
                               <Star size={10} fill="currentColor" />
                               {buyer.rating}
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-3 mb-8">
                      <div className="flex justify-between items-center text-sm">
                         <span className="font-bold text-gray-400">Offered Price</span>
                         <span className="font-black text-[#1e293b]">₹{buyer.offeredPrice}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                         <span className="font-bold text-gray-400 flex items-center gap-2">
                           <MapPin size={14} />
                           Transport
                         </span>
                         <span className="font-black text-red-400">{buyer.transport}</span>
                      </div>
                      <div className="bg-green-50/50 p-4 rounded-2xl flex justify-between items-center border border-green-100/50">
                         <span className="font-bold text-[#00966d] flex items-center gap-2 italic">
                            <Zap size={14} className="group-hover:animate-bounce" />
                            Net Profit
                         </span>
                         <span className="text-xl font-black text-[#00966d]">₹{buyer.netProfit}</span>
                      </div>
                   </div>

                   <button className="w-full py-4 rounded-2xl bg-gray-50 text-[#1e293b] font-black border border-gray-100 flex items-center justify-center gap-3 hover:bg-[#00966d] hover:text-white transition-all">
                      <Send size={18} />
                      Get Directions
                   </button>
                </div>
              ))}
           </div>
        </div>

        {/* Right Column: Map */}
        <div className="lg:col-span-7 h-[850px] relative rounded-[3rem] overflow-hidden border border-gray-100 shadow-xl group">
           <img 
             src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80" 
             className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-1000" 
             alt="Live Map" 
           />
           <div className="absolute inset-0 bg-[#3b82f6]/5"></div>
           
           {/* Map Controls Overlay */}
           <div className="absolute top-6 left-6 flex flex-col gap-4">
              <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-2">
                 <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                    <Maximize2 size={18} />
                 </button>
              </div>
           </div>

           {/* Pins Layer */}
           <div className="absolute inset-0 flex items-center justify-center -mt-20">
              <div className="relative group">
                 <div className="absolute -inset-10 bg-blue-500/10 rounded-full animate-ping"></div>
                 <div className="relative cursor-pointer transition-transform hover:scale-110 active:scale-95">
                    <div className="bg-blue-600 p-3 rounded-full shadow-2xl border-4 border-white text-white">
                       <MapPin size={24} fill="currentColor" fillOpacity={0.2} />
                    </div>
                    {/* Tooltip on hover or persistent */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] bg-[#1e293b] text-white px-4 py-2 rounded-xl text-xs font-black shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                       Anand Vegetable And Company
                       <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1e293b]"></div>
                    </div>
                 </div>
              </div>
           </div>

           {/* More pins mockup */}
           <div className="absolute top-1/2 left-1/3 mt-20">
              <div className="bg-blue-600/80 p-2 rounded-full shadow-lg border-2 border-white text-white">
                 <MapPin size={16} fill="currentColor" fillOpacity={0.2} />
              </div>
           </div>

           <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <div className="bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-full shadow-xl border border-gray-100 text-[10px] font-black text-gray-500 flex items-center gap-3">
                 <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    LEAFLET
                 </span>
                 <span className="text-gray-200">|</span>
                 <span>© OPENSTREETMAP CONTRIBUTORS</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default FarmerDashboard
