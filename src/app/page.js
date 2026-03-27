'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function HomePage() {
  const { user } = useAuth();
  const [featuredCharities, setFeaturedCharities] = useState([]);

  useEffect(() => {
    async function loadCharities() {
      const supabase = createClient();
      const { data } = await supabase
        .from('charities')
        .select('*')
        .eq('is_featured', true)
        .limit(3);
      if (data) setFeaturedCharities(data);
    }
    loadCharities();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background orbs */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12), transparent 70%)',
          filter: 'blur(60px)',
        }} className="animate-float" />
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 168, 83, 0.08), transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '20%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.07), transparent 70%)',
          filter: 'blur(50px)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            borderRadius: '50px',
            background: 'rgba(124, 58, 237, 0.08)',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            fontSize: '0.85rem',
            color: 'var(--color-primary-light)',
            marginBottom: '24px',
            fontWeight: '500',
            letterSpacing: '0.03em',
          }} className="animate-fade-in">
            Where Golf Meets Generosity
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-1px',
          }} className="animate-fade-in-up">
            Play Golf. <span className="gradient-text">Win Big.</span><br />
            Change Lives.
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: '1.7',
          }} className="animate-fade-in-up" >
            Subscribe, track your Stableford scores, and enter monthly draws for incredible prizes —
            all while supporting the charities you care about most.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }} className="animate-fade-in-up">
            <Link href={user ? '/dashboard' : '/signup'} className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
              {user ? 'Go to Dashboard' : 'Get Started'}
            </Link>
            <Link href="/charities" className="btn-secondary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
              Explore Charities
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginTop: '64px',
            maxWidth: '500px',
            margin: '64px auto 0',
          }}>
            {[
              { value: '£50K+', label: 'Prizes Awarded' },
              { value: '2,500+', label: 'Active Players' },
              { value: '£30K+', label: 'Charity Raised' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-accent)' }}>{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(180deg, transparent, rgba(17, 24, 39, 0.5))',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '56px', fontSize: '1.05rem' }}>
            Three simple steps to start winning and giving
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
          }}>
            {[
              {
                title: 'Subscribe & Choose',
                desc: 'Pick a monthly or yearly plan and select a charity to support. A portion of your subscription goes directly to your chosen cause.',
                color: '#7c3aed',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px', color: '#f59e0b' }}>
                    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="M9 14l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: 'Track Your Scores',
                desc: 'Enter your Stableford golf scores (1-45). Your last 5 scores are your entry numbers for the monthly prize draw.',
                color: '#b45309',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px', color: '#b45309' }}>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                  </svg>
                ),
              },
              {
                title: 'Win & Give Back',
                desc: 'Each month, 5 numbers are drawn. Match 3, 4, or 5 of your scores to win from the prize pool. No 5-match winner? The jackpot rolls over!',
                color: '#d4a853',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px', color: '#d4a853' }}>
                    <path d="M6 9H4.5a2.5 2.5 0 110-5C7 4 7 7 7 7" />
                    <path d="M18 9h1.5a2.5 2.5 0 000-5C17 4 17 7 17 7" />
                    <path d="M4 22h16" />
                    <path d="M10 22V12" /><path d="M14 22V12" />
                    <rect x="4" y="9" width="16" height="3" rx="1" />
                  </svg>
                ),
              },
            ].map((step, i) => (
              <div key={i} className="glass-card" style={{ padding: '40px 28px', textAlign: 'center' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '18px',
                  background: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
                  border: `1px solid ${step.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Tiers */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Prize <span className="gradient-text">Tiers</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '56px', fontSize: '1.05rem' }}>
            The more scores you match, the bigger the prize
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {[
              { matches: '5 Matches', pct: '40%', label: 'JACKPOT', gradient: 'linear-gradient(135deg, #d4a853, #e8c97d)', sub: 'Rolls over if unclaimed!',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="1.5" style={{ width: '36px', height: '36px' }}><path d="M12 2L9.09 8.26 2 9.27l5.18 4.73L5.82 22 12 18.77 18.18 22l-1.36-7.97L22 9.27l-7.09-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              },
              { matches: '4 Matches', pct: '35%', label: 'SECOND TIER', gradient: 'linear-gradient(135deg, #9333ea, #b45309)', sub: 'Split among all 4-match winners',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" style={{ width: '36px', height: '36px' }}><path d="M8 21h8M12 17v4M7 4h10l1 8H6L7 4z" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="4" r="1" /></svg>
              },
              { matches: '3 Matches', pct: '25%', label: 'THIRD TIER', gradient: 'linear-gradient(135deg, #16a34a, #f59e0b)', sub: 'Split among all 3-match winners',
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" style={{ width: '36px', height: '36px' }}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              }
            ].map((tier, i) => (
              <div key={i} className="glass-card" style={{ padding: '36px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {i === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    height: '3px',
                    background: tier.gradient,
                  }} />
                )}
                <div style={{ marginBottom: '16px' }}>{tier.icon}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-accent)', letterSpacing: '2px', marginBottom: '8px' }}>
                  {tier.label}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px' }}>{tier.matches}</h3>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '900',
                  background: tier.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '12px',
                }}>
                  {tier.pct} of Pool
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{tier.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Charities */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.5), transparent)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Charities We <span className="gradient-text">Support</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '56px', fontSize: '1.05rem' }}>
            Your subscription directly impacts these amazing organizations
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {featuredCharities.length > 0 ? featuredCharities.map((charity) => (
              <Link key={charity.id} href={`/charities/${charity.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="glass-card" style={{ padding: '32px', textAlign: 'left', height: '100%' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: 'var(--gradient-success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '26px', height: '26px' }}>
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '10px' }}>{charity.name}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                    {charity.description?.substring(0, 120)}...
                  </p>
                </div>
              </Link>
            )) : (
              [1, 2, 3].map(i => (
                <div key={i} className="glass-card" style={{ padding: '32px', opacity: 0.5 }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--color-border)', marginBottom: '20px' }} />
                  <div style={{ height: '20px', width: '70%', background: 'var(--color-border)', borderRadius: '6px', marginBottom: '10px' }} />
                  <div style={{ height: '14px', width: '100%', background: 'var(--color-border)', borderRadius: '6px', marginBottom: '6px' }} />
                  <div style={{ height: '14px', width: '80%', background: 'var(--color-border)', borderRadius: '6px' }} />
                </div>
              ))
            )}
          </div>

          <Link href="/charities" className="btn-secondary" style={{ marginTop: '40px', display: 'inline-flex' }}>
            View All Charities
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '56px 40px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(14, 165, 233, 0.06))',
          border: '1px solid rgba(124, 58, 237, 0.15)',
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>
            Ready to Make a Difference?
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginBottom: '32px', lineHeight: '1.7' }}>
            Join thousands of golfers who are winning prizes and supporting charities.
            Plans start from just £9.99/month.
          </p>
          <Link href="/signup" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
            Subscribe Now
          </Link>
        </div>
      </section>
    </div>
  );
}
