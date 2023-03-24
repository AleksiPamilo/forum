import { Link } from "react-router-dom";
import { navItems } from "../common/NavItems";
import { useAuth, useModal } from "../hooks";
import Button from "./Button";
import Dropdown from "./Dropdown";
import LoginSignup from "./modals/auth/LoginSignup";

const Navigation = () => {
    const { user, logout } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();

    return (
        <nav className="absolute flex gap-2 top-5 right-2">
            {
                !!!user && (
                    <>
                        <Button onClick={() => {
                            setModalContent(<LoginSignup isLogin />);
                            setIsModalOpen(true);
                        }}>Login</Button>
                        <Button onClick={() => {
                            setModalContent(<LoginSignup />);
                            setIsModalOpen(true);
                        }}>Sign Up</Button>
                    </>
                )
            }
        </nav>
    )
}

export default Navigation;
