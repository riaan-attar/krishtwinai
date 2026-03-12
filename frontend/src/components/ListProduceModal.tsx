import { Leaf, ChevronDown, X } from 'lucide-react'
import { FormEvent, useState } from 'react'

interface ListProduceModalProps {
  isOpen: boolean
  onClose: () => void
}

const ListProduceModal = ({ isOpen, onClose }: ListProduceModalProps) => {
  const [product, setProduct] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [contact, setContact] = useState('')
  const [description, setDescription] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#f8f9fa] rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white">
        {/* Header */}
        <div className="p-10 pb-6 relative">
          <button
            onClick={onClose}
            className="absolute right-8 top-8 text-gray-400 hover:text-[#111827] transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#e6f4ea] rounded-xl flex items-center justify-center">
              <Leaf className="text-[#2d6a4f]" size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-[#111827]">List Your Produce</h2>
          </div>
          <p className="text-gray-500 font-medium">
            Fill in your crop details. Your listing will appear live in the marketplace immediately after submission.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-10 pt-0 space-y-8">
          <div>
            <label className="block text-xs font-black mb-3 text-[#64748b] uppercase tracking-widest">
              PRODUCE NAME <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g. Fresh Tomatoes, Alphonso Mango..."
              className="w-full px-6 py-4 bg-white text-[#111827] rounded-2xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all font-medium placeholder:text-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black mb-3 text-[#64748b] uppercase tracking-widest">
              CATEGORY
            </label>
            <div className="relative">
              <select
                className="w-full px-6 py-4 bg-white text-[#111827] rounded-2xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] appearance-none cursor-pointer font-medium"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Staples">Staples</option>
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black mb-3 text-[#64748b] uppercase tracking-widest">
                PRICE / KG (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 35"
                className="w-full px-6 py-4 bg-white text-[#111827] rounded-2xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all font-medium placeholder:text-gray-300"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black mb-3 text-[#64748b] uppercase tracking-widest">
                AVAILABLE QTY (KG)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 500"
                className="w-full px-6 py-4 bg-white text-[#111827] rounded-2xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all font-medium placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black mb-3 text-[#64748b] uppercase tracking-widest">
                YOUR NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Patil"
                className="w-full px-6 py-4 bg-white text-[#111827] rounded-2xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all font-medium placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-black mb-3 text-[#64748b] uppercase tracking-widest">
                LOCATION / VILLAGE
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Nashik, Maharashtra"
                className="w-full px-6 py-4 bg-white text-[#111827] rounded-2xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all font-medium placeholder:text-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black mb-3 text-[#64748b] uppercase tracking-widest">
              CONTACT NUMBER
            </label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-6 py-4 bg-white text-[#111827] rounded-2xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all font-medium placeholder:text-gray-300"
            />
          </div>

          <div>
            <label className="block text-xs font-black mb-3 text-[#64748b] uppercase tracking-widest">
              IMAGE URL <span className="text-gray-400 font-normal normal-case">(optional — leave blank for auto)</span>
            </label>
            <input
              type="text"
              placeholder="https://example.com/my-tomatoes.jpg"
              className="w-full px-6 py-4 bg-white text-[#111827] rounded-2xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all font-medium placeholder:text-gray-300"
            />
          </div>

          <div>
            <label className="block text-xs font-black mb-3 text-[#64748b] uppercase tracking-widest">
              DESCRIPTION (OPTIONAL)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your produce — variety, quality, harvest date..."
              rows={3}
              className="w-full px-6 py-4 bg-white text-[#111827] rounded-2xl border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] resize-none transition-all font-medium placeholder:text-gray-300"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-[#1e293b] font-bold rounded-2xl border border-[#e2e8f0] transition-all active:scale-95 shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-4 bg-[#00966d] hover:bg-[#1b4332] text-white font-bold rounded-2xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-900/10"
            >
              <Leaf size={20} />
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ListProduceModal
