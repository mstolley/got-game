"use client"

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Character } from '../interfaces/Character';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { shuffleArray } from '../utils/shuffleArray';
import { getRandomKey } from '../utils/getRandomKey';
import { Header } from '../components/Header';
import { getLegibleKey } from '../utils/getLegibleKey';

const GotGame = () => {
    const [isCheatMode, setIsCheatMode] = useState(false);
    const [localHighScore, setLocalHighScore] = useState<number>(loadFromLocalStorage('highScore') || 0);
    const [localCharacters, setLocalCharacters] = useState<Character[] | null>(loadFromLocalStorage('characters'));
    const [gameCharacters, setGameCharacters] = useState<Character[] | null>(null);
    const [winner, setWinner] = useState<Character | null>(null);
    const [question, setQuestion] = useState<string | null>(null);
    const [wins, setWins] = useState<Character[] | null>(null);
    const [isLoss, setIsLoss] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const winsLength = wins ? wins.length : 0;
    const prevWinsRef = useRef<number>(winsLength); // Initialize with the current wins value

    const memoizedGetRandomKey = useCallback((getRandomKey), []);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('/api');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            saveToLocalStorage('characters', result);
            setLocalCharacters(result);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    const launchRound = useCallback(() => {
        if (localCharacters && localCharacters.length >= 4) {
            const cleanCharacters = localCharacters.filter(character => !wins?.includes(character));
            const shuffledCharacters = shuffleArray(cleanCharacters);
            const selectedCharacters = shuffledCharacters?.slice(0, 4);
            const randomKey = memoizedGetRandomKey(localCharacters[0]);
            const legibleKey = getLegibleKey(randomKey);
            const winner = selectedCharacters?.find((char: Character) => char[randomKey] !== undefined && char[randomKey] !== null);
            const question = winner?.[randomKey]
                ? `Which character has a ${legibleKey} of ${winner?.[randomKey]}?`
                : `Which character has no ${legibleKey}?`;

            const shuffledSelectedCharacters = shuffleArray(selectedCharacters);

            if (cleanCharacters) {
                setGameCharacters(shuffledSelectedCharacters);
                setWinner(winner || null);
                setQuestion(question);
            } else {
                alert('BADASS');
                setIsEnd(true);
            }
        } else {
            setError(new Error('Not enough characters to start the game.'));
        }

        setIsLoading(false);
    }, [localCharacters, memoizedGetRandomKey, wins]);

    const resetGame = useCallback(() => {
        setIsLoss(false);
        setGameCharacters(null);
        setWinner(null);
        setQuestion(null);
        setWins(null);

        launchRound();
    }, [launchRound]);

    useEffect(() => {
        if (localCharacters === null) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [localCharacters]);

    useEffect(() => {
        if (isCheatMode && winner) {
            console.log(winner);
        }
    }, [isCheatMode, winner]);

    useEffect(() => {
        if (prevWinsRef.current !== winsLength) {
            launchRound();
        }

        prevWinsRef.current = winsLength;
    }, [winsLength, launchRound]);

    useEffect(() => {
        if (isLoss) {
            const isNewHighScore = winsLength > localHighScore;
            const scoreToSet = isNewHighScore ? winsLength : localHighScore;

            if (isNewHighScore) {
                alert(`New high score: ${scoreToSet}`);
            }
            setLocalHighScore(scoreToSet);
            saveToLocalStorage('highScore', scoreToSet);
        }
    }, [isLoss, winsLength, localHighScore]);

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="text-center m-5">
            {isLoading ? (
                <div className="flex justify-center items-center h-[calc(100vh-40px)] w-[calc(100vw-40px)]">Loading...</div>
            ) : (
                <>
                    {!gameCharacters ? (
                        <div className="flex mb-5 justify-center gap-5">
                            <button className="py-2.5 px-5 bg-gray-600 border-0 rounded-md cursor-pointer transition-colors hover:bg-gray-700" onClick={launchRound}>Start</button>
                            <div className="flex justify-center items-center h-full p-2.5 gap-2.5 border border-gray-200 rounded-md">
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
                    ) : (
                        <Header
                            localHighScore={localHighScore}
                            wins={winsLength}
                        />
                    )}
                    {isLoss && (
                        <>
                            {isEnd ? (
                                <div className="mt-10 mb-10">
                                    <h5 className="text-2xl">You reached the end of your quest!</h5>
                                </div>

                            ) : (
                                <div className="mt-10 mb-10">
                                    <h5 className="text-red-500 text-2xl">You lost!</h5>
                                </div>
                            )}

                            <button className="py-2.5 px-5 bg-gray-600 border-0 rounded-md cursor-pointer transition-colors hover:bg-gray-700" onClick={resetGame}>Play Again</button>
                        </>
                    )}
                    {gameCharacters && !isLoss && !isEnd && (
                        <>
                            {question && (
                                <div className="mb-5">
                                    <h5 className="text-lg">{question}</h5>
                                </div>
                            )}
                            {gameCharacters && (
                                <div className="flex gap-5 justify-center flex-wrap">
                                    {gameCharacters.map(character => (
                                        <div key={character.id} className="w-3xs p-2.5 text-left bg-gray-300 dark:bg-gray-400 rounded-lg hover:cursor-pointer shadow-md hover:shadow-md transition-shadow duration-300">
                                            <div className="relative w-full h-0 pb-[100%]" onClick={() => character === winner ? setWins([...(wins || []), character]) : setIsLoss(true)}>
                                                <Image
                                                    className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
                                                    priority
                                                    src={character.imageUrl}
                                                    blurDataURL={character.imageUrl}
                                                    alt={`image_${character.id}`}
                                                    width={268}
                                                    height={268}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default GotGame;
