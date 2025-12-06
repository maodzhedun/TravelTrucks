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
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#101828' }}>
        Camper Not Found
      </h2>
      <p style={{ fontSize: '16px', color: '#475467', marginBottom: '32px' }}>
        The camper you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/catalog"
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
        Back to Catalog
      </Link>
    </div>
  );
}
