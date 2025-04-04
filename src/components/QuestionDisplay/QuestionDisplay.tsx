interface QuestionDisplayProps {
    question: string;
}

const QuestionDisplay = ({ question }: QuestionDisplayProps) => {
    return (
        <div className="mb-5">
            <h5 className="text-lg">{question}</h5>
        </div>
    );
};

export default QuestionDisplay;
