import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const location = useLocation();
  const state = location.state as { selectedRole?: 'Farmer' | 'Customer' | 'Retailer' };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'Farmer' | 'Customer' | 'Retailer'>(state?.selectedRole || 'Farmer');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const roleMap: Record<string, 'farmer' | 'customer' | 'retailer'> = {
      Farmer: 'farmer',
      Customer: 'customer',
      Retailer: 'retailer',
    };
    login(activeTab + ' ' + (email.split('@')[0] || 'User'), roleMap[activeTab]);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 border border-[#e2e8f0]">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#1e293b] mb-3">Login</h1>
          <p className="text-[#64748b] font-medium">
            Enter your email below to login to your account
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex bg-[#f1f5f9] p-1.5 rounded-2xl mb-8">
          {(['Farmer', 'Customer', 'Retailer'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab
                  ? 'bg-white text-[#1e293b] shadow-sm'
                  : 'text-[#64748b] hover:text-[#1e293b]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1e293b] ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8] group-focus-within:text-[#2d6a4f] transition-colors" />
              <input
                type="email"
                placeholder="ramesh@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all text-slate-900 font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1e293b] ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8] group-focus-within:text-[#2d6a4f] transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            className="w-full bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/10 transition-all active:scale-[0.98] text-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#64748b] font-medium">
            Don't have an account? <Link to="/signup" className="text-[#1e293b] font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
