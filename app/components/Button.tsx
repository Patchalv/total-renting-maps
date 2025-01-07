interface ButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
}

const Button = ({ text, className, onClick }: ButtonProps) => {
    return (
        <button 
            className={`bg-orange-500 text-white font-bold py-2 lg:py-3 px-4 rounded-[10px] ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;