import React from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

type DropdownOptionsType = {
    label: string;
    value: string;
};

type SearchableDropdownType = {
    options: DropdownOptionsType[];
    selected?: string;
    label?: string;
    onChange: (option: DropdownOptionsType) => void;
}

// TODO: Multiselect
// TODO: Search bar

const SearchableDropdown: React.FC<SearchableDropdownType> = ({ selected, label, options, onChange }) => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <div className="relative text-white select-none">
            <button onClick={() => setOpen(!open)} className="py-2 px-3 border border-blue-600 hover:shadow-glow-2 rounded-md flex flex-row items-center gap-2">
                <p>{selected ?? label ?? "Select"}</p>
                {open ? <AiFillCaretUp /> : <AiFillCaretDown />}
            </button>
            <div hidden={!open} className="min-w-[10rem] mt-2 rounded-md absolute border border-blue-600 bg-black">
                {
                    options.map((option, index) => (
                        <div key={index} onClick={() => {
                            onChange(option);
                            setOpen(false);
                        }} className="py-2 px-3 cursor-pointer hover:bg-blue-600 hover:text-white">
                            {option.label}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchableDropdown;
