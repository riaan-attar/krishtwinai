import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Truck, Leaf } from 'lucide-react';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'Farmer' | 'Customer' | 'Retailer') => {
    navigate('/login', { state: { selectedRole: role } });
  };

  const roles = [
    {
      id: 'Farmer',
      title: 'Farmer',
      description: 'Access AI crop insights, weather alerts, and marketplace.',
      icon: Leaf,
      color: 'bg-green-600',
    },
    {
      id: 'Customer',
      title: 'Customer',
      description: 'Buy fresh organic produce directly from local farmers.',
      icon: ShoppingBag,
      color: 'bg-blue-600',
    },
    {
      id: 'Retailer',
      title: 'Retailer',
      description: 'Procure bulk inventory and manage supply chain.',
      icon: Truck,
      color: 'bg-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4 py-12">
      <div className="max-w-4xl w-full text-center mb-16">
        <h1 className="text-5xl font-extrabold text-[#1e293b] mb-6 tracking-tight">
          How would you like to use <span className="text-[#2d6a4f]">KrishiSetu</span>?
        </h1>
        <p className="text-xl text-[#64748b] font-medium max-w-2xl mx-auto">
          Select your role to get started with a personalized experience tailored to your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.id}
              onClick={() => handleRoleSelect(role.id as any)}
              className="group bg-white rounded-[2rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-[#2d6a4f] hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 cursor-pointer flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-[#2d6a4f]/5 transition-colors" />
              
              <div className={`w-24 h-24 ${role.color} rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/10`}>
                <Icon className="text-white" size={48} />
              </div>
              
              <h3 className="text-3xl font-bold text-[#1e293b] mb-4">{role.title}</h3>
              <p className="text-[#64748b] text-lg font-medium leading-relaxed mb-10 h-24">
                {role.description}
              </p>
              
              <button className="w-full py-5 bg-[#f8f9fa] group-hover:bg-[#2d6a4f] group-hover:text-white text-[#1e293b] font-bold rounded-2xl transition-all duration-300 text-lg border border-slate-100 group-hover:border-[#2d6a4f]">
                Continue as {role.title}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-20 flex flex-col items-center space-y-4">
        <div className="flex items-center gap-3 px-6 py-2 bg-white rounded-full shadow-sm border border-slate-100">
           <Leaf className="text-[#2d6a4f]" size={20} />
           <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">KrishiSetu AI • Modern Farming</span>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
