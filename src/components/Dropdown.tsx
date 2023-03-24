import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
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
    icon?: JSX.Element,
    btnStyles?: string;
    onChange?: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, icon, btnStyles, onChange }) => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleDropdown = () => setOpen(!open);

    return (
        <div>
            <Button onClick={handleDropdown} styles={btnStyles ?? "text-black dark:text-white text-center text-xl flex items-center gap-2 group flex items-center w-full rounded-lg group hover:bg-light-secondary dark:bg-dark-primary dark:text-white dark:hover:bg-dark-secondary"}>
                <p className="text-xl text-left bg-zinc-300 dark:bg-zinc-900 p-2 rounded-md opacity-95">{icon}</p>
                <p className="text-xl">{label}</p>
                {open ? <AiOutlineUp className="text-xl" /> : <AiOutlineDown className="text-xl" />}
            </Button>
            <li className="list-none">
                <ul id="dropdown-example" className={`${open ? "block" : "hidden"} py-2 space-y-2`}>
                    {
                        options.map((option) => (
                            <li className="flex items-center w-full p-2 text-base font-normal text-gray-900  rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">
                                <button className="w-full h-full " onClick={() => {
                                    if (option.navigateTo) {
                                        navigate(option.navigateTo);
                                    }
                                    if (option.onClick) {
                                        option.onClick();
                                    }

                                    onChange?.(option?.value ?? "");
                                    handleDropdown();
                                }}>
                                    {option.label}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </li>
        </div >
    )
}

export default Dropdown;
