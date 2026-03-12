import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { User, Mail, MapPin, Lock, Eye, EyeOff } from 'lucide-react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { selectedRole?: 'Farmer' | 'Customer' | 'Retailer' };

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'Farmer' | 'Customer' | 'Retailer'>(state?.selectedRole || 'Farmer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation logic here
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10 border border-[#e2e8f0]">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1e293b] mb-3">Create an account</h1>
          <p className="text-[#64748b] font-medium">
            Enter your information to join the KrishiSetu AI community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1e293b] ml-1">Display Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="Display Name"
                  className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all text-slate-900 font-medium"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1e293b] ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all text-slate-900 font-medium"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1e293b] ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all text-slate-900 font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1e293b] ml-1">Region</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
              <input
                type="text"
                placeholder="Enter Region"
                className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all text-slate-900 font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1e293b] ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-4 bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all text-slate-900 font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1e293b] ml-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full pl-12 pr-12 py-4 bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all text-slate-900 font-medium"
                required
              />
            </div>
          </div>

        {/* Role Selection Tabs */}
        <div className="flex bg-[#f1f5f9] p-1.5 rounded-2xl mb-8">
          {(['Farmer', 'Customer', 'Retailer'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setRole(tab)}
              className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all ${
                role === tab
                  ? 'bg-white text-[#1e293b] shadow-sm'
                  : 'text-[#64748b] hover:text-[#1e293b]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

          <button
            type="submit"
            className="w-full bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] text-lg"
          >
            Create an account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#64748b] font-medium">
            Already have an account? <Link to="/login" className="text-[#1e293b] font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
