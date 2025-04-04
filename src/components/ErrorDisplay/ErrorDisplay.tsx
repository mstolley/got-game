interface ErrorDisplayProps {
    text: string;
}

const ErrorDisplay = ({ text }: ErrorDisplayProps) => {
    return (
        <div className="">Error: {text}</div>
    );
};

export default ErrorDisplay;
