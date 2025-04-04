interface LossDisplayProps {
    isLoss: boolean;
}

function LossDisplay({ isLoss }: LossDisplayProps) {
    return (
        <div className="mt-22 mb-10">
            <h5 className={`${isLoss && `text-red-500`} text-2xl`}>{isLoss ? 'You lost!' : 'You reached the end of your quest!'}</h5>
        </div>
    );
};

export default LossDisplay;
