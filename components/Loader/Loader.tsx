import styles from './Loader.module.css';

interface LoaderProps {
  fullPage?: boolean;
}

const Loader = ({ fullPage = false }: LoaderProps) => {
  if (fullPage) {
    return (
      <div className={styles.overlay}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Loader;
