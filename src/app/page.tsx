import { Character } from '@/interfaces/Character';
import { IntroDisplay } from '@/components/IntroDisplay';
import { Loader } from '@/components/Loader';
import data from '@/data/data.json';

async function Home() {
    let isLoading = false;
    let characters: Character[] | null = null;

    async function fetchData() {
        isLoading = false;

        return data;
    };

    const fetchedData: Character[] = await fetchData();

    return (
        <div className="text-center md:m-2.5 lg:m-5 overflow-hidden max-h-screen">
            {isLoading ? (
                <Loader />
            ) : (
                <IntroDisplay />
            )}
        </div>
    );
};

export default Home;
