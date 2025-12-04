import styles from './Loader.module.css';

interface LoaderProps {
  fullPage?: boolean;
}

const Loader = ({ fullPage = false }: LoaderProps) => {
  if (fullPage) {
    return (
      <div className={styles.fullPage}>
        <div className={styles.loader} />
      </div>
    );
  }

  return <div className={styles.loader} />;
};

export default Loader;
