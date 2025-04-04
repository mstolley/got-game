interface IntroDisplayProps {
    isCheatMode: boolean;
    setIsCheatMode: (isCheatMode: boolean) => void;
}

const IntroDisplay = ({ isCheatMode, setIsCheatMode }: IntroDisplayProps) => {
    return (
        <div className="flex mb-5 justify-center gap-5">
            <button className="py-2.5 px-5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 border-0 rounded-md cursor-pointer transition delay-75 duration-300 ease-in-out" onClick={launchRound}>Start</button>
            <div className="flex justify-center items-center h-full p-2.5 gap-2.5 border border-gray-300 dark:border-gray-700 rounded-md">
                <input
                    className="hover:cursor-pointer"
                    id="cheatMode"
                    name="cheatMode"
                    aria-label="Cheat Mode"
                    aria-describedby="cheatMode"
                    aria-checked={isCheatMode}
                    aria-invalid={isCheatMode ? 'true' : 'false'}
                    aria-required="false"
                    aria-labelledby="cheatMode"
                    aria-live="polite"
                    type="checkbox"
                    checked={isCheatMode}
                    onChange={() => setIsCheatMode(!isCheatMode)}
                />
                <label className="hover:cursor-pointer" htmlFor="cheatMode">Cheat Mode</label>
            </div>
        </div>
    );
};

export default IntroDisplay;
