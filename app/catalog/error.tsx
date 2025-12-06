'use client';

import { useEffect } from 'react';
import styles from './page.module.css';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Catalog error:', error);
  }, [error]);

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.empty}>
          <h3>Something went wrong!</h3>
          <p>Failed to load campers. Please try again.</p>
          <button
            onClick={reset}
            style={{
              marginTop: '16px',
              padding: '12px 32px',
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
        </div>
      </div>
    </section>
  );
}
