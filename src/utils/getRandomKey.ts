import { Character } from '../interfaces/Character';

export async function getRandomKey(character: Character): Promise<string> {
    const keys = Object.keys(character) as (keyof Character)[];
    const filteredKeys = keys.filter(key => (
        key !== null &&
        key !== 'fullName' &&
        key !== 'id' &&
        key !== 'image' &&
        key !== 'imageUrl'
    ));
    const randomIndex = Math.floor(Math.random() * filteredKeys.length);

    return filteredKeys[randomIndex] as string;
};
