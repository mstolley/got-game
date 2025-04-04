import styles from '../../styles/GotGame.module.css';

interface HeaderProps {
    localHighScore: number;
    wins: number;
}

const Header = ({ localHighScore, wins }: HeaderProps) => {
    return (
        <header className="mb-10">
            <div className="flex justify-between items-center p-2.5 bg-gray-300 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center">
                    <span className="mr-2.5">Wins</span>
                    <span className="w-10 font-bold rounded-sm py-0 px-1.25 text-green-700 bg-gray-50 dark:bg-gray-200">{wins}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-500 dark:text-gray-400">GotGame</h1>
                <div className="flex items-center">
                    <span className="mr-2.5">High</span>
                    <span className="w-10 font-bold rounded-sm py-0 px-1.25 text-blue-700 bg-gray-50 dark:bg-gray-200">{localHighScore}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;