interface ErrorDisplayProps {
    text: string;
}

async function ErrorDisplay({ text }: ErrorDisplayProps) {
    return (
        <div className="">Error: {text}</div>
    );
};

export default ErrorDisplay;
