import { IntroDisplay } from '@/components/IntroDisplay';

async function Home() {
    return (
        <div className="text-center md:m-2.5 lg:m-5 overflow-hidden max-h-screen">
            <IntroDisplay />
        </div>
    );
};

export default Home;
