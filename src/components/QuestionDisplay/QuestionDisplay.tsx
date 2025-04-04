interface QuestionDisplayProps {
    text: string;
}

const QuestionDisplay = ({ text }: QuestionDisplayProps) => {
    return (
        <div className="sticky md:static w-full top-22 md:mt-22 md:mb-5 z-10 opacity-80 md:opacity-100 bg-background p-2.5">
            <h5 className="text-lg">{text}</h5>
        </div>
    );
};

export default QuestionDisplay;
