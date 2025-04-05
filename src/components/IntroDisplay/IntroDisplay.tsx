import Link from 'next/link';
import { Button } from '@/components/Button';

async function IntroDisplay() {
    return (
        <div className="flex mt-22 mb-5 justify-center gap-5">
            <Link href={`/game`}>
                <Button text="Start Game"></Button>
            </Link>

        </div>
    );
}

export default IntroDisplay;
