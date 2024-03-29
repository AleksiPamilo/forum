import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import Button from "./Button";

export type DropdownOptions = {
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

const SidebarDropdown: React.FC<DropdownProps> = ({ label, options, icon, btnStyles, onChange }) => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleDropdown = () => setOpen(!open);

    return (
        <div>
            <Button onClick={handleDropdown} styles={btnStyles ?? "text-black dark:text-white text-center text-lg flex items-center gap-2 group py-2 flex items-center w-full rounded-lg group hover:bg-light-secondary dark:bg-dark-primary dark:text-white dark:hover:bg-dark-secondary"}>
                <p hidden={!!!icon} className="text-lg text-left bg-zinc-200 dark:bg-zinc-900 p-2 rounded-md opacity-95">{icon}</p>
                <p className="text-lg">{label}</p>
                {open ? <AiOutlineCaretUp className="text-lg" /> : <AiOutlineCaretDown className="text-lg" />}
            </Button>
            <li className="list-none">
                <ul className={`${open ? "block" : "hidden"} py-2 space-y-2`}>
                    {
                        options.map((option) => (
                            <li className="flex items-center w-full p-2 text-xl font-normal text-gray-900 rounded-lg group hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700 pl-11">
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

export default SidebarDropdown;
