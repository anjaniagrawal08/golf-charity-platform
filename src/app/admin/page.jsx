'use client';

import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { supabase, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscribers: 0,
    totalCharities: 0,
    totalDraws: 0,
    totalPrizePool: 0,
    totalCharityContributions: 0,
    pendingPayouts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [usersRes, activeRes, charitiesRes, drawsRes, poolRes, winnersRes] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('users').select('id', { count: 'exact', head: true }).eq('subscription_status', 'active'),
        supabase.from('charities').select('id', { count: 'exact', head: true }),
        supabase.from('draws').select('id', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('prize_pool').select('total_pool'),
        supabase.from('winners').select('prize_amount, payment_status'),
      ]);

      const totalPool = (poolRes.data || []).reduce((s, p) => s + parseFloat(p.total_pool || 0), 0);
      const pending = (winnersRes.data || []).filter(w => w.payment_status === 'pending').length;

      setStats({
        totalUsers: usersRes.count || 0,
        activeSubscribers: activeRes.count || 0,
        totalCharities: charitiesRes.count || 0,
        totalDraws: drawsRes.count || 0,
        totalPrizePool: totalPool,
        pendingPayouts: pending,
      });
      setLoading(false);
    }
    if (!authLoading) loadStats();
  }, [authLoading]);

  if (authLoading || loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, color: '#9333ea' },
    { label: 'Active Subscribers', value: stats.activeSubscribers, color: '#16a34a' },
    { label: 'Total Prize Pool', value: `£${stats.totalPrizePool.toFixed(2)}`, color: '#d4a853' },
    { label: 'Published Draws', value: stats.totalDraws, color: '#b45309' },
    { label: 'Charities', value: stats.totalCharities, color: '#16a34a' },
    { label: 'Pending Payouts', value: stats.pendingPayouts, color: '#dc2626' },
  ];

  const navItems = [
    { href: '/admin/users', label: 'User Management', desc: 'View and manage all users',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
    },
    { href: '/admin/scores', label: 'Score Management', desc: 'View and edit user scores',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>
    },
    { href: '/admin/charities', label: 'Charity Management', desc: 'Add, edit, delete charities',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
    },
    { href: '/admin/draws', label: 'Draw Management', desc: 'Simulate and publish draws',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
    },
    { href: '/admin/winners', label: 'Winners', desc: 'Approve proofs and payouts',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}><path d="M12 2L9.09 8.26 2 9.27l5.18 4.73L5.82 22 12 18.77 18.18 22l-1.36-7.97L22 9.27l-7.09-1.01L12 2z" /></svg>
    },
    { href: '/admin/reports', label: 'Reports', desc: 'Analytics and statistics',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}><path d="M18 20V10M12 20V4M6 20v-6" /></svg>
    },
  ];

  return (
    <div className="page-container">
      <div className="section-header">
        <h1><span className="gradient-text">Admin Dashboard</span></h1>
        <p>Platform overview and management</p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '40px',
      }}>
        {statCards.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '20px' }}>Quick Access</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
      }}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass-card" style={{ padding: '24px', cursor: 'pointer' }}>
              <div style={{ color: 'var(--color-primary-light)', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '6px' }}>{item.label}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
