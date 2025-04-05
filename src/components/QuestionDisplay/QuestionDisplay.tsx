interface QuestionDisplayProps {
    text: string;
}

function QuestionDisplay({ text }: QuestionDisplayProps) {
    return (
        <div
            className="fixed flex left-0 top-14 z-10 items-end justify-center w-full bg-background p-2.5 h-20"
        >
            <h5 className="text-lg">{text}</h5>
        </div>
    );
};

export default QuestionDisplay;
