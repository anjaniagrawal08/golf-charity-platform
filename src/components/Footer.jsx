import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #e2e8f0',
      background: '#f8f4ea',
      padding: '48px 24px 24px',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <path d="M6 9l6-6 6 6" />
                  <path d="M12 3v14" />
                  <path d="M4 21h16" />
                </svg>
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>
                Golf<span style={{ color: 'var(--color-primary-light)' }}>Charity</span>
              </span>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
              Play golf, win prizes, and make a real difference for charities that matter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Home</Link>
              <Link href="/charities" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Charities</Link>
              <Link href="/signup" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Subscribe</Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Platform
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/dashboard" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Dashboard</Link>
              <Link href="/dashboard/scores" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>My Scores</Link>
              <Link href="/dashboard/draws" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Draws</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>help@golfcharity.com</span>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Terms of Service</span>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Privacy Policy</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #dbe6f0',
          paddingTop: '24px',
          textAlign: 'center',
          color: '#475569',
          fontSize: '0.8rem',
        }}>
          &copy; 2026 GolfCharity Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
