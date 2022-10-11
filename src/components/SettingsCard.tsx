import React from "react";
import Button from "./Button";

type SettingsCardProps = {
    title: string,
    desc?: string,
    onClick?: () => void,
};

const SettingsCard: React.FC<SettingsCardProps> = ({ title, desc, onClick }) => {
    return (
        <div className="flex items-center justify-between mt-3 p-3 rounded-md border border-white bg-zinc-800">
            <h1 className="text-xl font-bold text-white">{title}</h1>
            <p className="text-white">{desc}</p>
            <Button onClick={() => onClick?.()} colors={{ background: "bg-green-600 hover:bg-green-700" }}>Edit</Button>
        </div>
    )
}

export default SettingsCard;
