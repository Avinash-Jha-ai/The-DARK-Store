import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, IndianRupee, Package, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 5000, orders: 32 },
  { name: 'Thu', sales: 2780, orders: 15 },
  { name: 'Fri', sales: 6000, orders: 40 },
  { name: 'Sat', sales: 4500, orders: 28 },
  { name: 'Sun', sales: 4200, orders: 26 },
];

const StatCard = ({ title, value, icon, trend, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="card" 
    style={{ flex: 1, minWidth: '240px' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <div style={{ padding: '12px', background: `${color}15`, color: color }}>
        {icon}
      </div>
      <div style={{ color: trend > 0 ? '#10b981' : '#ef4444', fontSize: '0.8rem', fontWeight: '600' }}>
        {trend > 0 ? '+' : ''}{trend}%
      </div>
    </div>
    <h3 style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', fontWeight: '500', marginBottom: '8px' }}>{title}</h3>
    <p style={{ fontSize: '1.8rem', fontWeight: '700' }}>{value}</p>
  </motion.div>
);

const DashboardPage = () => {
  return (
    <div className="main-content">
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Business Overview</h1>
          <p style={{ color: 'var(--admin-text-muted)' }}>Welcome back, The DARK Store Admin. Here's what's happening today.</p>
        </div>
        <button className="btn-primary">DOWNLOAD REPORT</button>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
        <StatCard title="Total Revenue" value="₹128,430" icon={<IndianRupee />} trend={12} color="#d4af37" />
        <StatCard title="Active Orders" value="156" icon={<Package />} trend={-4} color="#3b82f6" />
        <StatCard title="New Customers" value="2,420" icon={<Users />} trend={18} color="#10b981" />
        <StatCard title="Conversion Rate" value="3.2%" icon={<TrendingUp />} trend={2} color="#8b5cf6" />
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '1rem' }}>Revenue Trends</h3>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--admin-primary)" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="var(--admin-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', borderRadius: '0' }}
              />
              <Area type="monotone" dataKey="sales" stroke="var(--admin-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '24px', fontSize: '1rem' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { id: 1, user: 'John Doe', action: 'placed an order', time: '2 mins ago' },
              { id: 2, user: 'Sarah Kerrigan', action: 'registered as a seller', time: '1 hour ago' },
              { id: 3, user: 'Artanis', action: 'updated product inventory', time: '3 hours ago' },
              { id: 4, user: 'Jim Raynor', action: 'requested a refund', time: '5 hours ago' },
            ].map((activity) => (
              <div key={activity.id} style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--admin-primary)', marginTop: '6px' }} />
                <div>
                  <span style={{ fontWeight: '600' }}>{activity.user}</span> {activity.action}
                  <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
