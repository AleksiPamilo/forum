import { useState } from "react";
import { useAuth, useModal } from "../../../hooks";
import { FaTimes } from "react-icons/fa";
import Input from "../../Input";
import Button from "../../Button";
import Dropzone from "../../Dropzone";
import ForgotPassword from "./ForgotPassword";

type LoginProps = {
    isLogin?: boolean;
}

const Login: React.FC<LoginProps> = ({ isLogin }) => {
    const { setModalContent, setIsModalOpen, closeModal } = useModal();
    const { login: loginWithEmailAndPassword, signUp } = useAuth();

    const [login, setLogin] = useState<boolean>(isLogin ?? true);
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [photoFile, setPhotoFile] = useState<File | undefined>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const clearFields = () => {
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
    }

    const handleLogin = async () => {
        if (email === "" || password === "") {
            setSuccessMessage(null);
            setErrorMessage("Please fill in all fields");
            return;
        }

        const x = await loginWithEmailAndPassword(email, password);
        switch (x.success) {
            case true:
                setErrorMessage(null);
                setSuccessMessage(x.message);
                clearFields();
                break;
            case false:
                setSuccessMessage(null);
                setErrorMessage(x.message);
                break;
        }
    }

    const handleRegister = async () => {
        if (email === "" || username === "" || password === "" || confirmPassword === "") {
            setSuccessMessage(null);
            setErrorMessage("Please fill in all fields");
            return;
        } else if (password !== confirmPassword) {
            setSuccessMessage(null);
            setErrorMessage("Passwords do not match");
            return;
        }

        const x = await signUp(email, password, username, photoFile);
        switch (x.success) {
            case true:
                setErrorMessage(null);
                setSuccessMessage(x.message);
                clearFields();
                break;
            case false:
                setSuccessMessage(null);
                setErrorMessage(x.message);
                break;
        }
    }

    const handlePasswordModal = () => {
        setModalContent(<ForgotPassword />);
        setIsModalOpen(true);
    }

    return (
        <div className="bg-[#333333] w-[23rem] md:w-[30rem] p-4 rounded-md border text-white border-white shadow-xl">
            {
                login
                    ? <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h1 className="text-2xl font-extrabold">Login</h1>
                            <Button onClick={closeModal}>
                                <FaTimes className="w-5 h-5" />
                            </Button>
                        </div>
                        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(String(e.target.value))} />
                        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(String(e.target.value))} />
                        <div className="flex pb-2">
                            <p className="text-blue-500 cursor-pointer hover:underline" onClick={() => { handlePasswordModal(); clearFields(); }}>Forgot Password?</p>
                        </div>
                        <Button styles="w-full px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white" onClick={handleLogin}>Login</Button>
                        <div className="flex gap-1 py-2 justify-center">
                            <p className="text-gray-500">Don't have an account?</p>
                            <p className="text-blue-500 cursor-pointer hover:underline" onClick={() => { setLogin(false); clearFields(); }}>Register</p>
                        </div>
                    </div>

                    : <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h1 className="text-2xl font-extrabold">Register</h1>
                            <Button onClick={closeModal}>
                                <FaTimes className="w-5 h-5" />
                            </Button>
                        </div>
                        <Input type="text" placeholder="Username" value={username} onChange={e => setUsername(String(e.target.value))} />
                        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(String(e.target.value))} />
                        <Input type="password" autoComplete="new-password" placeholder="Password" value={password} onChange={e => setPassword(String(e.target.value))} />
                        <Input type="password" autoComplete="new-password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(String(e.target.value))} />
                        <div className="pb-2">
                            <span>Profile Picture (optional)</span>
                            <Dropzone onChange={(files) => setPhotoFile(files[0])} acceptedFiles={{
                                "image/*": [".jpg", ".jpeg", ".png"]
                            }} />
                        </div>
                        <Button styles="w-full px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white" onClick={handleRegister}>Register</Button>
                        <div className="flex gap-1 py-2 justify-center">
                            <p className="text-gray-500">Already have an account?</p>
                            <p className="text-blue-500 cursor-pointer hover:underline" onClick={() => { setLogin(true); clearFields(); }}>Login</p>
                        </div>
                    </div>
            }
            <div className="justify-center mt-4 w-full px-4 py-2 rounded-md bg-red-500 text-white" style={{ display: !!errorMessage ? "flex" : "none" }}>
                {errorMessage}
            </div>
            <div className="justify-center mt-4 w-full px-4 py-2 rounded-md bg-green-500 text-white" style={{ display: !!successMessage ? "flex" : "none" }}>
                {successMessage}
            </div>
        </div>
    )
}

export default Login;
