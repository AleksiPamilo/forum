import React from "react";
import { FiSun, FiMoon, FiSettings } from "react-icons/fi";
import { useTheme } from "../hooks";
import SidebarDropdown from "./SidebarDropdown";

const Darkmode: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const icon = theme === "dark" ? <FiMoon /> : !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches ? <FiMoon /> : <FiSun />

    return (
        <SidebarDropdown
            label={icon}
            options={[
                {
                    label: <div className="w-full flex items-center justify-center gap-2">
                        <FiSun />
                        <p>Light</p>
                    </div>,
                    value: "light",
                },
                {
                    label: <div className="w-full flex items-center justify-center gap-2">
                        <FiMoon />
                        <p>Dark</p>
                    </div>,
                    value: "dark",
                },
                {
                    label: <div className="w-full flex items-center justify-center gap-2">
                        <FiSettings />
                        <p>System</p>
                    </div>,
                    value: "prefer-system-scheme",
                }
            ]}
            onChange={(value => setTheme(value))}
            btnStyles="bg-transparent text-white w-8 h-8"
        />
    )
}

export default Darkmode;