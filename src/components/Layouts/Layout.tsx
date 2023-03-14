import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom"
import FirebaseServices from "../../firebase/FirebaseServices";
import { useModal } from "../../hooks";
import Button from "../Button";
import Header from "../Header";
import Login from "../modals/auth/LoginSignup";

const authInstance = FirebaseServices.getAuthInstance();

const Layout: FC = () => {
    const { setModalContent, setIsModalOpen, closeModal } = useModal();

    const handleSignIn = (isLogin: boolean) => {
        setModalContent(<Login {...{ isLogin }} />);
        setIsModalOpen(true);
    }

    useEffect(() => {
        authInstance.onAuthStateChanged(user => {
            if (!user) {
                setModalContent(<div className="w-screen h-screen flex pt-24 md:pt-0 md:items-center justify-center px-4 bg-black text-white">
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-6xl font-semibold font-mono">Welcome to ForumX!</h1>
                        <p className="text-lg md:text-2xl">You can browse this forum without signing in.</p>
                        <p className="text-lg md:text-2xl">But you will have to sign in to send messages or create threads!</p>

                        <div className="flex flex-col md:flex-row mt-2 gap-3">
                            <span className="flex flex-row gap-3">
                                <Button onClick={() => handleSignIn(false)}>Register</Button>
                                <Button onClick={() => handleSignIn(false)}>Log In</Button>
                            </span>
                            <Button onClick={closeModal}>Continue without signing in</Button>
                        </div>
                    </div>

                    <div className="absolute bottom-4">
                        <p className="text-xl">This forum's content is not monitored or checked. The website owner is not responsible for the content.</p>
                    </div>
                </div>);
                setIsModalOpen(true);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex min-w-[100vw] min-h-[100vh]">
            <div className="min-w-full min-h-full p-4 shadow-xl bg-black text-white">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;
