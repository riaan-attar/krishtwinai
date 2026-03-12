import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-700">
        {/* Logo and Branding */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-4">
            <Leaf className="w-16 h-16 text-[#2d6a4f]" fill="#2d6a4f" />
            <h1 className="text-6xl font-bold text-[#1e293b] tracking-tight">KrishiSetu AI</h1>
          </div>
          <p className="text-2xl text-[#64748b] font-medium tracking-wide">
            Your all-in-one platform for modern farming.
          </p>
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-xl text-[#334155] leading-relaxed">
          Get AI-powered crop insights, connect with a community of farmers, and trade on our exclusive marketplace.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <button
            onClick={() => navigate('/select-role')}
            className="w-full sm:w-48 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-green-900/10 transition-all active:scale-95 text-lg"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/select-role')}
            className="w-full sm:w-48 bg-white hover:bg-[#f1f5f9] text-[#334155] font-semibold py-4 px-8 rounded-xl border border-[#e2e8f0] shadow-sm transition-all active:scale-95 text-lg"
          >
            Log In
          </button>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="mt-24 text-[#94a3b8] font-medium tracking-widest text-sm uppercase">
        Digital India Initiative
      </div>
    </div>
  );
};

export default Landing;
