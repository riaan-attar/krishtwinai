import { Navigation, Locate } from 'lucide-react'
import { useState } from 'react'

interface MarketplaceMapProps {
  selectedCrop?: string
}

const MarketplaceMap = ({ selectedCrop }: MarketplaceMapProps) => {
  const [locating, setLocating] = useState(false)

  const handleDetectLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported.')
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      () => setLocating(false),
      () => { setLocating(false); alert('Unable to detect location.') }
    )
  }

  return (
    <div className="flex flex-col min-h-[600px] rounded-xl border border-dark-border overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-card border-b border-dark-border">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-white">🗺️ Maharashtra Buyer Map</span>
          {selectedCrop && (
            <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full capitalize font-medium">
              {selectedCrop}
            </span>
          )}
        </div>
        <button
          onClick={handleDetectLocation}
          disabled={locating}
          className="flex items-center gap-2 px-4 py-1.5 bg-green-600/90 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-xs font-semibold rounded-lg transition-all"
        >
          {locating ? (
            <><Locate size={13} className="animate-spin" /> Locating...</>
          ) : (
            <><Navigation size={13} /> Detect Location</>
          )}
        </button>
      </div>

      {/* Google Maps Embed */}
      <div className="flex-1">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30411.779537596034!2d75.304601816624!3d17.675128368729585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc4181b8db52943%3A0x1ab147f5432da578!2sPandharpur%2C%20Maharashtra%20413304!5e0!3m2!1sen!2sin!4v1773409077479!5m2!1sen!2sin"
          width="100%"
          height="576"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Maharashtra Map"
        />
      </div>
    </div>
  )
}

export default MarketplaceMap
