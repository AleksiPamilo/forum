import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

type DropdownOptions = {
    label: string;
    value?: string;
} & (
        | {
            navigateTo: string;
        }
        | {
            onClick: () => void;
        }
    );

type DropdownProps = {
    options: DropdownOptions[];
    label?: JSX.Element | string,
    selected?: string;
    btnStyles?: string;
    onChange?: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, btnStyles, onChange }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleDropdown = () => setOpen(!open);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref])

    return (
        <div ref={ref} className="relative">
            <Button styles={btnStyles} onClick={handleDropdown}>
                {label ?? selected ?? "Select an option"}
            </Button>

            {open && (
                <div className="absolute right-0 text-right mt-2 z-50 w-full min-w-[15rem] rounded border divide-gray-100 shadow bg-gray-700 select-none cursor-pointer">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="py-2 px-4 rounded bg-gray-800 hover:bg-gray-700 text-white"
                            onClick={() => {
                                if ("navigateTo" in option) {
                                    navigate(option.navigateTo);
                                } else {
                                    option.onClick();
                                }

                                onChange?.(option?.value ?? option.label);
                                handleDropdown();
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown;
