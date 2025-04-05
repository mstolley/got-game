import { JSX } from 'react/jsx-runtime';

async function Loader(): Promise<JSX.Element> {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-40px)] w-[calc(100vw-40px)]">Loading...</div>
    );
}

export default Loader;
