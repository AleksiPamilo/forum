import { Link, Outlet } from "react-router-dom"
import Button from "../Button";
import { useAuth, useModal } from "../../hooks";
import Sidebar from "../Sidebar";
import LoginSignup from "../modals/auth/LoginSignup";
import { navItems } from "../../common/NavItems";

const Layout = () => {
    const { isLoggedIn } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();

    return (
        <div className="flex min-w-[100vw] min-h-[100vh] overflow-hidden bg-light-primary text-black dark:bg-dark-primary dark:text-white">
            <Sidebar NavItems={navItems} />
            {
                isLoggedIn
                    ? (
                        <div className="md:ml-[21rem] mt-10 mr-4">
                            <Outlet />
                        </div>
                    ) : (
                        <div className="w-screen h-screen flex flex-col items-center justify-center">
                            <span className="flex gap-2 items-center text-2xl">
                                <h1 className="text-4xl font-bold text-center">401</h1>
                                <p>-</p>
                                <p className="text-center">Unauthorized</p>
                            </span>
                            <p className="text-2xl text-center">You have to login to view your account's settings!</p>
                            <div className="flex flex-col justify-center mt-4">
                                <div className="flex gap-4 mb-4">
                                    <Button onClick={() => {
                                        setModalContent(<LoginSignup isLogin />);
                                        setIsModalOpen(true);
                                    }}>Login</Button>
                                    <Button onClick={() => {
                                        setModalContent(<LoginSignup />);
                                        setIsModalOpen(true);
                                    }}>Register</Button>
                                </div>
                                <Link to="/" className="px-4 py-2 bg-zinc-600 text-center rounded-md shadow-lg text-white">
                                    Back To Forums
                                </Link>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Layout;
