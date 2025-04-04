"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Character } from '../../interfaces/Character';

interface CharacterDisplayProps {
    gameCharacters: Character[];
    onClick: (character: Character) => void;
}

function CharacterDisplay({ gameCharacters, onClick }: CharacterDisplayProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    function handleClick(character: Character) {
        setIsLoaded(false);
        setTimeout(() => {
            setIsLoaded(true);
            onClick(character);
        }, 500);
    }

    useEffect(() => {
        setIsLoaded(false);

        const timer = setTimeout(() => setIsLoaded(true), 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`flex gap-5 justify-center flex-wrap mt-24 md:mt-5 [transform-style:preserve-3d] ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-300 ease-in-out`}>
            {gameCharacters.map(character => (
                <div key={character.id} className="w-3xs p-2.5 text-left bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg hover:cursor-pointer shadow-md hover:shadow-md transition delay-75 duration-200 ease-in-out">
                    <div className="relative w-full h-0 pb-[100%]" onClick={() => handleClick(character)}>
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
    );
};

export default CharacterDisplay;
