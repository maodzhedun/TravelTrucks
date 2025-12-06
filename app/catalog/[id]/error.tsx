'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Camper details error:', error);
  }, [error]);

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
      <h1 style={{ fontSize: '32px', marginBottom: '16px', color: '#101828' }}>
        Something went wrong!
      </h1>
      <p style={{ fontSize: '16px', color: '#475467', marginBottom: '32px' }}>
        Failed to load camper details. Please try again.
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={reset}
          style={{
            padding: '16px 40px',
            backgroundColor: '#E44848',
            color: '#fff',
            border: 'none',
            borderRadius: '200px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
        <Link
          href="/catalog"
          style={{
            padding: '16px 40px',
            backgroundColor: 'transparent',
            color: '#101828',
            border: '1px solid #DADDE1',
            borderRadius: '200px',
            fontSize: '16px',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Back to Catalog
        </Link>
      </div>
    </div>
  );
}
