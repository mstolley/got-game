"use client"

import { useCallback, useEffect, useRef, useState } from 'react';
import { Character } from '@/interfaces/Character';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';
import { shuffleArray } from '@/utils/shuffleArray';
import { getLegibleKey } from '@/utils/getLegibleKey';
import { getRandomKey } from '@/utils/getRandomKey';
import { Button } from '@/components/Button';
import { CharacterDisplay } from '@/components/CharacterDisplay';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { Header } from '@/components/Header';
import { IntroDisplay } from '@/components/IntroDisplay';
import { Loader } from '@/components/Loader';
import { LossDisplay } from '@/components/LossDisplay';
import { QuestionDisplay } from '@/components/QuestionDisplay';

const GotGame = () => {
    const [isCheatMode, setIsCheatMode] = useState<boolean>(false);
    const [localHighScore, setLocalHighScore] = useState<number>(loadFromLocalStorage('highScore') || 0);
    const [localCharacters, setLocalCharacters] = useState<Character[] | null>(loadFromLocalStorage('characters'));
    const [gameCharacters, setGameCharacters] = useState<Character[] | null>(null);
    const [winner, setWinner] = useState<Character | null>(null);
    const [question, setQuestion] = useState<string>('');
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

    const imageClickHandler = useCallback((character: Character) => {
        if (winner) {
            const isWinner = character.id === winner.id;

            if (isWinner) {
                setWins((prevWins) => [...(prevWins || []), character]);
            } else {
                setIsLoss(true);
            }
        }
    }, [winner]);

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
        setQuestion('');
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

    if (error) return <ErrorDisplay text={error.message} />;

    return (
        <div className="text-center m-5">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {!gameCharacters ? (
                        <IntroDisplay
                            isCheatMode={isCheatMode}
                            setIsCheatMode={setIsCheatMode}
                            launchRound={launchRound}
                        />
                    ) : (
                        <Header localHighScore={localHighScore} wins={winsLength} />
                    )}
                    {isLoss && (
                        <>
                            <LossDisplay isLoss={isLoss} />
                            <Button text="Play again" onClick={resetGame} />
                        </>
                    )}
                    {gameCharacters && !isLoss && !isEnd && (
                        <>
                            <QuestionDisplay text={question} />
                            <CharacterDisplay
                                gameCharacters={gameCharacters}
                                onClick={imageClickHandler}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default GotGame;
