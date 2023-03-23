import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

type DropdownOptions = {
    label: string | JSX.Element,
    value?: string,
    navigateTo?: string,
    onClick?: () => void,
}

type DropdownProps = {
    options: DropdownOptions[];
    label?: JSX.Element | string,
    selected?: string;
    btnStyles?: string;
    onChange?: (option: string) => void;
    positionX?: "left" | "right";
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, btnStyles, positionX = "left", onChange }) => {
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
                <div className={`absolute text-right mt-2 z-50 w-full min-w-[15rem] rounded-md border divide-gray-100 shadow bg-gray-300 dark:bg-gray-700 select-none cursor-pointer ${positionX === "left" ? "right-0" : "left-0"}`} >
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white :first-child:rounded-t-md :last-child:rounded-b-md"
                            onClick={() => {
                                if (option.navigateTo) {
                                    navigate(option.navigateTo);
                                } else if (option.onClick) {
                                    option.onClick();
                                }

                                onChange?.(typeof option.label === "string" ? option.label : option.value!);
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
