import styles from '../../styles/GotGame.module.css';

interface HeaderProps {
    localHighScore: number;
    wins: number;
}

const Header = ({ localHighScore, wins }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.scoreContainer}>
                <div className={styles.wins}>
                    <span className={styles.scoreKey}>Wins</span>
                    <span className={styles.scoreValue}>{wins}</span>
                </div>
                <h1 className="text-3xl font-bold">GotGame</h1>
                <div className={styles.high}>
                    <span className={styles.scoreKey}>High</span>
                    <span className={styles.scoreValue}>{localHighScore}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;