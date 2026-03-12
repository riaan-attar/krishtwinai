import React, { useState } from 'react';
import { Store, MapPin, Phone, Upload, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RetailerRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: '',
    storeLocation: '',
    contactNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for registration would go here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full space-y-8">
        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-green-900/5 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-[#00966d] p-8 text-white relative overflow-hidden">
            <div className="relative z-10 flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <Store size={32} className="text-white" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tight">Register as Retailer</h1>
                <p className="text-green-50 font-medium opacity-90">Join our retailer marketplace to reach more customers</p>
              </div>
            </div>
            {/* Abstract Background pattern */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            {/* Store Name */}
            <div className="space-y-3">
              <label className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                Store Name *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#00966d] transition-colors">
                  <Store size={20} />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-50 focus:border-[#00966d] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  placeholder="Enter your store name"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                />
              </div>
            </div>

            {/* Store Location */}
            <div className="space-y-3">
              <label className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                Store Location *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#00966d] transition-colors">
                  <MapPin size={20} />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-50 focus:border-[#00966d] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  placeholder="Enter your store address/location"
                  value={formData.storeLocation}
                  onChange={(e) => setFormData({ ...formData, storeLocation: e.target.value })}
                />
              </div>
            </div>

            {/* Contact Number */}
            <div className="space-y-3">
              <label className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                Contact Number *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#00966d] transition-colors">
                  <Phone size={20} />
                </div>
                <input
                  type="tel"
                  required
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-50 focus:border-[#00966d] outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  placeholder="Enter your contact number"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                />
              </div>
            </div>

            {/* Store Image Upload */}
            <div className="space-y-3">
              <label className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                Store Image *
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-[#00966d] hover:bg-green-50/50 transition-all cursor-pointer group">
                <div className="bg-gray-50 p-4 rounded-2xl group-hover:bg-white group-hover:shadow-lg transition-all">
                  <Upload size={32} className="text-gray-400 group-hover:text-[#00966d]" />
                </div>
                <div className="text-center space-y-1">
                  <p className="font-bold text-gray-700">
                    <span className="text-[#00966d]">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">JPG, PNG, or WEBP (max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#00966d] hover:bg-[#1b4332] text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-green-900/20 group"
            >
              Register as Retailer
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Guidelines/What happens next */}
          <div className="bg-gray-50/80 p-10 border-t border-gray-100">
            <h3 className="text-lg font-black text-[#1b4332] mb-6 flex items-center gap-2">
              What happens next?
            </h3>
            <ul className="space-y-4">
              {[
                'Your registration will be reviewed by our team',
                'Once approved, your store will appear in the marketplace',
                'You can manage your inventory and customer interactions through your dashboard'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 text-[#00966d] p-0.5 rounded-full">
                    <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                  </div>
                  <span className="text-gray-600 font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerRegistration;
