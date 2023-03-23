import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
    return (
        <div className="flex flex-col w-screen h-screen items-center justify-center text-6xl bg-black text-white">
            This UI rebuild is a work in progress.
            <Link to="/forums" className="text-blue-500">Click here to go to the forums.</Link>
        </div>
    )
}

export default LandingPage;
