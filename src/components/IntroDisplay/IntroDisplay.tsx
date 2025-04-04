import { Button } from '../Button';
interface IntroDisplayProps {
    isCheatMode: boolean;
    setIsCheatMode: (isCheatMode: boolean) => void;
    launchRound: () => void;
}

function IntroDisplay({ isCheatMode, setIsCheatMode, launchRound }: IntroDisplayProps) {
    return (
        <div className="flex mt-22 mb-5 justify-center gap-5">
            <Button text="Start" onClick={launchRound} />
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
