type ColorsType = {
    text?: string;
    background?: string;
    disabled?: {
        text?: string;
        background?: string;
    },
}

type ButtonProps = {
    disabled?: boolean;
    colors?: ColorsType;
    styles?: string;
    onClick: () => void;
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({ children, disabled, colors, styles, onClick }) => {
    const defaultStyle = `
        ${colors?.text ? colors.text : "text-white"}
        ${colors?.background ? colors.background : "bg-blue-500 hover:bg-blue-600"}
        ${disabled && colors?.disabled?.background ? colors.disabled?.background : "disabled:bg-gray-600"}
        px-4 py-2 rounded-md
    `;

    return (
        <div>
            <button
                className={`
                    ${styles ?? defaultStyle}
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
