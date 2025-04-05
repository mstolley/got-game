"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/Button';

function IntroDisplay() {
    const [isCheatMode, setIsCheatMode] = useState<boolean>(false);

    return (
        <div className="flex mt-22 mb-5 justify-center gap-5">
            <Link href={`/game`}>
                <Button text="Start Game"></Button>
            </Link>
            <div className="flex justify-center items-center h-full p-2.5 gap-2.5 border border-gray-300 dark:border-gray-700 rounded-md">
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
                <label className="hover:cursor-pointer" htmlFor="cheatMode">Cheat Mode</label>
            </div>
        </div>
    );
}

export default IntroDisplay;
