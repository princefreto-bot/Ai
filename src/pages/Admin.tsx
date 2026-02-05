import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, DollarSign, ShieldAlert } from 'lucide-react';

const Admin = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Utilisateurs', value: '1,245', icon: Users, color: 'text-blue-500' },
            { label: 'Analyses (24h)', value: '8,502', icon: Activity, color: 'text-pink-500' },
            { label: 'Revenus (Mois)', value: '$24,500', icon: DollarSign, color: 'text-green-500' },
            { label: 'Signalements', value: '3', icon: ShieldAlert, color: 'text-red-500' }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-white/10 p-6 rounded-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-gray-400">Fonctionnalités d'administration complètes à venir.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;