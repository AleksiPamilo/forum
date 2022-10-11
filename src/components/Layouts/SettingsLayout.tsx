import { Outlet, useNavigate } from "react-router-dom"
import Button from "../Button";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../Sidebar";
import Login from "../modals/auth/LoginSignup";
import { useModal } from "../context/ModalContext";

const Layout = () => {
    const { isLoggedIn } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();
    const navigateTo = useNavigate();

    return (
        <div className="flex min-w-[100vw] min-h-[100vh] bg-[#171717]">
            {
                isLoggedIn
                    ? (
                        <>
                            <Sidebar />
                            <Outlet />
                        </>
                    )
                    : (
                        <div className="flex w-screen h-screen justify-center items-center text-white">
                            <div className="flex flex-col p-4 bg-zinc-600 rounded-md shadow-xl">
                                <div className="flex flex-row justify-between mb-4">
                                    <h1 className="text-4xl font-bold">Error</h1>
                                    <Button onClick={() => navigateTo("/")}>Back To Home Page</Button>
                                </div>
                                <p>You must be logged in to view profile settings.</p>
                                <div className="mt-4 justify-end flex flex-row gap-2">
                                    <Button onClick={() => {
                                        setModalContent(<Login />);
                                        setIsModalOpen(true);
                                    }}>Login</Button>
                                    <Button colors={{ background: "bg-green-600 hover:bg-green-700" }} onClick={() => {
                                        setModalContent(<Login isLogin={false} />);
                                        setIsModalOpen(true);
                                    }}>Register</Button>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Layout;
