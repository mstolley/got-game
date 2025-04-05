interface ErrorDisplayProps {
    text: string;
}

async function ErrorDisplay({ text = 'Something happened' }: ErrorDisplayProps) {
    return (
        <div className="mt-5 text-center">Error: {text}</div>
    );
};

export default ErrorDisplay;
