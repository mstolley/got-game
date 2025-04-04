interface QuestionDisplayProps {
    text: string;
}

const QuestionDisplay = ({ text }: QuestionDisplayProps) => {
    return (
        <div className="mb-5">
            <h5 className="text-lg">{text}</h5>
        </div>
    );
};

export default QuestionDisplay;
