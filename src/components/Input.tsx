import React from "react";

type InputProps = {
    type?: string;
    placeholder?: string;
    value: string;
    styles?: string;
    autoComplete?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, styles, autoComplete, onChange }) => {
    const defaultStyle = "px-4 py-2 rounded-md border border-gray-300 text-black";

    return (
        <input
            type={type ?? "text"}
            placeholder={placeholder}
            className={styles ?? defaultStyle}
            value={value}
            autoComplete={autoComplete}
            onChange={e => onChange(e)} />
    )
}

export default Input;
