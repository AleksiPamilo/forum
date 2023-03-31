import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

type DropdownOptions = {
    label: string,
    value: string,
} & (
        | {
            onClick: () => void,
        }
        | {
            href: string,
        }
    )

type DropdownProps = {
    label: string | JSX.Element,
    options?: DropdownOptions[],
    onChange?: (value: string) => void,
    colors?: string,
};

const Dropdown: React.FC<DropdownProps> = ({ label, options, colors, onChange }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div className="relative">
            <Button onClick={() => setOpen(!open)} colors={{ background: `${colors ? colors : "bg-zinc-400 hover:bg-zinc-500 dark:bg-zinc-800 hover:dark:bg-zinc-700"}` }}>{label}</Button>
            <div hidden={!open} className={`absolute max-w-[10rem] max-h-[10rem] overflow-y-auto right-0 mt-2 rounded-md divide-y ${colors ? colors : "divide-zinc-300 bg-zinc-100 dark:bg-zinc-800 dark:divide-zinc-700"}`}>
                {
                    options?.map((option, index) => (
                        <button
                            key={index}
                            className={`block px-4 py-2 text-sm first:rounded-t-md last:rounded-b-md ${colors ? colors : "text-gray-700 dark:text-gray-500 hover:bg-zinc-200 dark:hover:bg-dark-primary"}`}
                            onClick={() => {
                                onChange?.(option.label);
                                setOpen(false);

                                if ("onClick" in option) {
                                    option.onClick();
                                } else {
                                    navigate(option.href);
                                }
                            }}
                        >
                            {option.label}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Dropdown;
