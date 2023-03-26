import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth, useModal } from "../../hooks";
import Button from "../Button";
import LoginSignup from "../modals/auth/LoginSignup";
import Sidebar from "../Sidebar";
import { adminNavItems } from "../../common/AdminNavItems";

const SecuredLayout: React.FC = () => {
    const { user, isAdmin } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();

    if (!user) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-light-primary text-black dark:bg-dark-primary dark:text-white">
                <span className="flex gap-2 items-center text-2xl">
                    <h1 className="text-4xl font-bold text-center">401</h1>
                    <p>-</p>
                    <p className="text-center">Unauthorized</p>
                </span>
                <p className="text-2xl text-center">You have to login to view this page!</p>
                <div className="flex flex-col justify-center mt-4">
                    <div className="flex gap-4 mb-4">
                        <Button onClick={() => {
                            setModalContent(<LoginSignup isLogin />);
                            setIsModalOpen(true);
                        }}>Login</Button>
                        <Button onClick={() => {
                            setModalContent(<LoginSignup />);
                            setIsModalOpen(true);
                        }
                        }>Register</Button>
                    </div>
                    <Link to="/forums" className="px-4 py-2 bg-zinc-600 text-center rounded-md shadow-lg text-white">
                        Back To Forums
                    </Link>
                </div>
            </div>
        )
    }

    if (!isAdmin) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-light-primary text-black dark:bg-dark-primary dark:text-white">
                <span className="flex gap-2 items-center text-2xl">
                    <h1 className="text-4xl font-bold text-center">403</h1>
                    <p>-</p>
                    <p className="text-center">Forbidden</p>
                </span>
                <p className="text-2xl text-center">You are not authorized to view this page!</p>
                <div className="flex flex-col justify-center mt-4">
                    <Link to="/forums" className="px-4 py-2 bg-zinc-600 text-center rounded-md shadow-lg text-white">
                        Back To Forums
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-w-[100vw] min-h-[100vh] shadow-xl bg-light-primary dark:bg-dark-primary text-black dark:text-white overflow-hidden pl-4 md:pl-0">
            <Sidebar NavItems={adminNavItems} />
            <div className="md:ml-[21rem] pt-6 pr-4 md:mt-0">
                <Outlet />
            </div>
        </div>
    )
}

export default SecuredLayout;
