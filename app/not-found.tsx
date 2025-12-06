import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '64px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '48px', marginBottom: '16px', color: '#101828' }}>
        404
      </h1>
      <p style={{ fontSize: '20px', color: '#475467', marginBottom: '32px' }}>
        Page not found
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '56px',
          padding: '0 40px',
          backgroundColor: '#E44848',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 500,
          borderRadius: '200px',
          textDecoration: 'none',
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
