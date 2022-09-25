import { useAuth, useModal } from "../hooks";
import Button from "./Button";
import Login from "./modals/auth/login";
import Navigation from "./Navigation";

const Header = () => {
    const { user, isLoggedIn, logout } = useAuth();
    const { setIsModalOpen, setModalContent } = useModal();

    const handleModal = () => {
        setIsModalOpen(true);
        setModalContent(<Login />);
    }

    return (
        <>
            <div className="flex w-full pb-2 justify-between align-middle border-b border-gray-200">
                <h1 className="text-2xl font-extrabold">ForumX</h1>
                <div>
                    {
                        isLoggedIn
                            ? <div className="flex flex-row gap-2">
                                <p className="pt-2 mr-4">Hi, {user?.displayName ?? "Unknown User"}</p>
                                <Button onClick={logout}>Logout</Button>
                            </div>
                            : <div className="flex flex-row gap-2">
                                <Button onClick={handleModal}>Login</Button>
                                <Button colors={{ background: "bg-green-600 hover:bg-green-700" }} onClick={handleModal}>Register</Button>
                            </div>
                    }
                </div>
            </div>
            <Navigation />
        </>
    )
}

export default Header;
