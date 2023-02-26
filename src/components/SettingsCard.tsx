import React from "react";
import Button from "./Button";

type SettingsCardProps = {
    title: string,
    desc?: string,
    label?: string,
    onClick?: () => void,
};

const SettingsCard: React.FC<SettingsCardProps> = ({ title, desc, label, onClick }) => {
    return (
        <div className="flex items-center justify-between mt-3 p-3 rounded-md border border-blue-600 hover:shadow-glow-5 bg-zinc-800">
            <h1 className="text-xl font-bold text-white">{title}</h1>
            <p className="text-white">{desc}</p>
            <Button onClick={() => onClick?.()} colors={{ background: "bg-blue-600 hover:bg-blue-700" }}>{label ?? "Edit"}</Button>
        </div>
    )
}

export default SettingsCard;
