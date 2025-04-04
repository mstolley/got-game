interface QuestionDisplayProps {
    text: string;
}

function QuestionDisplay({ text }: QuestionDisplayProps) {
    return (
        <div
            className={`sticky md:static w-full top-22 md:mt-22 md:mb-5 z-10 bg-background p-2.5`}
        >
            <h5 className="text-lg">{text}</h5>
        </div>
    );
};

export default QuestionDisplay;
