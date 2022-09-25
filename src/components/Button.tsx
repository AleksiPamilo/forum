type ColorsType = {
    text?: string;
    background?: string;
    hover?: string;
    disabled?: {
        text?: string;
        background?: string;
        hover?: string;
    }
}

type ButtonProps = {
    disabled?: boolean;
    colors?: ColorsType;
    onClick: () => void;
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({ children, disabled, colors, onClick }) => {
    return (
        <div>
            <button
                className={`px-4 py-2 rounded
                    ${colors?.text ? `text-${colors.text}` : "text-white"}
                    ${colors?.hover ? `hover:bg-${colors.hover}` : "hover:bg-blue-700"}
                    ${colors?.background ? `bg-${colors.background}` : "bg-blue-500"}
                    ${colors?.disabled?.text ? `disabled:text-${colors.disabled.text}` : "disabled:text-gray-200"}
                    ${colors?.disabled?.background ? `disabled:bg-${colors.disabled.background}` : "disabled:bg-gray-500"}
                    ${colors?.disabled?.hover ? `disabled:hover:bg-${colors.disabled.hover}` : "disabled:hover:bg-gray-400"}
                    hover:cursor-pointer
                    disabled:cursor-not-allowed
                `}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )
}

export default Button;
