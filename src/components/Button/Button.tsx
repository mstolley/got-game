interface ButtonProps {
    text: string;
    className?: string;
    isDisabled?: boolean;
    onClick: () => void;
}

function Button({ text = 'Start', className, isDisabled = false, onClick }: ButtonProps) {
    const buttonClass = className ? className : 'py-2.5 px-5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 border-0 rounded-md cursor-pointer transition delay-75 duration-200 ease-in-out';

    return (
        <button
            className={buttonClass}
            disabled={isDisabled}
            aria-label={text}
            aria-describedby={text}
            aria-labelledby={text}
            aria-live="polite"
            type="button"
            onClick={onClick}
        >{text}</button>

    );
};

export default Button;
