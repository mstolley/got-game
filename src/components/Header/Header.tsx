import { Character } from '@/interfaces/Character';
import { useEffect, useState } from 'react';
interface HeaderProps {
    localHighScore: number;
    winner: Character | null;
    wins: number;
}

function Header({ localHighScore, winner, wins }: HeaderProps) {
    const [isCheatMode, setIsCheatMode] = useState<boolean>(false);

    useEffect(() => {
        if (isCheatMode && winner) {
            console.log(winner);
        }
    }, [isCheatMode, winner]);

    return (
        <header className="fixed top-0 left-0 w-full z-20 h-14">
            <div className="flex justify-between items-center p-2.5 bg-gray-300 dark:bg-gray-800">
                <div className="flex items-center">
                    <span className="mr-2.5">Wins</span>
                    <span className="w-10 font-bold rounded-sm py-0 px-1.25 text-green-800 bg-green-100">{wins}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-500 dark:text-gray-400">GotGame</h1>
                <div className="flex items-center">
                    <div className="flex justify-center items-center h-full p-2.5 gap-2.5 border border-gray-300 dark:border-gray-700 rounded-md mr-2.5">
                        <input
                            className="hover:cursor-pointer"
                            id="cheatMode"
                            name="cheatMode"
                            aria-label="Cheat Mode"
                            aria-describedby="cheatMode"
                            aria-checked={isCheatMode}
                            aria-invalid={isCheatMode}
                            aria-required="false"
                            aria-labelledby="cheatMode"
                            aria-live="polite"
                            type="checkbox"
                            checked={isCheatMode}
                            onChange={() => setIsCheatMode(!isCheatMode)}
                        />
                        <label className="hover:cursor-pointer" htmlFor="cheatMode">Cheat</label>
                    </div>
                    <span className="mr-2.5">High</span>
                    <span className="w-10 font-bold rounded-sm py-0 px-1.25 text-blue-800 bg-blue-100">{localHighScore}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
