import Link from 'next/link';
import styles from '../../styles/GotGame.module.css';

const Navigation = () => {
    return (
        <div className={styles.nav}>
            <Link href={"/"}>Back to Home</Link>
        </div>
    );
};

export default Navigation;