import React, { createContext, useContext, useState, useEffect } from "react";

interface IThemeContext {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

interface Props {
    children: React.ReactNode;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('Call "useThemeContext" only inside a ThemeContextProvider');
    }

    return context;
}

const ThemeContextProvider: React.FC<Props> = ({ children }) => {
    const [theme, setTheme] = useState<string>(localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light");

    useEffect(() => {
        switch (theme) {
            case "dark":
                localStorage.theme = "dark";
                document.documentElement.classList.add("dark");
                break;
            case "light":
                localStorage.theme = "light";
                document.documentElement.classList.remove("dark");
                break;
            default:
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                    document.documentElement.classList.add("dark");
                    localStorage.theme = "dark";
                } else {
                    document.documentElement.classList.remove("dark");
                    localStorage.removeItem("theme");
                }
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContextProvider, useThemeContext };