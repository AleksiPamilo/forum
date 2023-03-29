import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center mt-64 bg-light-primary dark:bg-dark-primary text-black dark:text-white">
            <h1 className="text-4xl font-bold text-center">404</h1>
            <p className="text-center">The page you are looking for does not exist.</p>
            <div className="flex justify-center mt-4">
                <Link to="/forums" className="px-4 py-2 bg-zinc-600 rounded-md shadow-lg text-white">
                    Back To Forums
                </Link>
            </div>
        </div>
    )
}

export default NotFound;
