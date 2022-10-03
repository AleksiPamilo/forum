import { useState } from "react";
import { useAuth, useModal } from "../../../hooks";
import { FaSpinner, FaTimes } from "react-icons/fa";
import Input from "../../Input";
import Button from "../../Button";
import Dropzone from "../../Dropzone";
import ForgotPassword from "./ForgotPassword";
import FirebaseFunctions from "../../../functions";

type LoginProps = {
    isLogin?: boolean;
}

const inputStyle = "px-4 py-2 rounded-md text-black bg-gray-900 text-zinc-300 focus:outline-none border border-slate-400 focus:border-[#355af060]"
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
    const [loading, setLoading] = useState<boolean>(false);

    const clearFields = () => {
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setPhotoFile(undefined);
        setLoading(false);
    }

    const handleLogin = async () => {
        if (email === "" || password === "") {
            setSuccessMessage(null);
            setErrorMessage("Please fill in all fields");
            return;
        }

        setLoading(true);
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
                setLoading(false);
                break;
        }
    }

    const handleRegister = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);

        setLoading(true);
        if (email === "" || username === "" || password === "" || confirmPassword === "") {
            setSuccessMessage(null);
            setErrorMessage("Please fill in all fields");
            return;
        } else if (password !== confirmPassword) {
            setSuccessMessage(null);
            setErrorMessage("Passwords do not match");
            return;
        }

        const isUsernameAvailable = await FirebaseFunctions.user.isUsernameAvailable(username);
        if (!(username.length >= 3 && username.length <= 20)) {
            setSuccessMessage(null);
            setErrorMessage("Username must be between 3 and 20 characters");
            return;
        } else if (!isUsernameAvailable) {
            setSuccessMessage(null);
            setErrorMessage("Username is already taken");
            return;
        };

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
                setLoading(false);
                break;
        }
    }

    const handlePasswordModal = () => {
        setModalContent(<ForgotPassword />);
        setIsModalOpen(true);
    }

    return (
        <div className="bg-zinc-900 w-[23rem] md:w-[30rem] p-4 rounded-md border-2 text-white border-blue-900 shadow-xl">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-extrabold">{login ? "Login" : "Register"}</h1>
                <Button colors={{ background: "bg-blue-700 hover:bg-blue-800" }} onClick={closeModal}>
                    <FaTimes className="w-5 h-5" />
                </Button>
            </div>
            {
                login
                    ? <div className="flex flex-col gap-2">
                        <Input styles={inputStyle} type="email" placeholder="Email" value={email} onChange={e => setEmail(String(e.target.value))} />
                        <Input styles={inputStyle} type="password" placeholder="Password" value={password} onChange={e => setPassword(String(e.target.value))} />
                        <div className="flex pb-2">
                            <p className="text-blue-500 cursor-pointer hover:underline" onClick={() => { handlePasswordModal(); clearFields(); }}>Forgot Password?</p>
                        </div>
                        <Button styles="w-full px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white disabled:cursor-not-allowed" disabled={loading} onClick={handleLogin}>
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin w-5 h-5 mr-2" />
                                    <span>Logging in...</span>
                                </div>
                            )
                                : "Login"
                            }
                        </Button>
                    </div>

                    : <div className="flex flex-col gap-2">
                        <Input styles={inputStyle} type="text" placeholder="Username" value={username} onChange={e => setUsername(String(e.target.value))} />
                        <Input styles={inputStyle} type="email" placeholder="Email" value={email} onChange={e => setEmail(String(e.target.value))} />
                        <Input styles={inputStyle} type="password" autoComplete="new-password" placeholder="Password" value={password} onChange={e => setPassword(String(e.target.value))} />
                        <Input styles={inputStyle} type="password" autoComplete="new-password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(String(e.target.value))} />
                        <div className="mt-5 mb-6">
                            <span>Profile Picture (optional)</span>
                            <Dropzone onChange={(files) => setPhotoFile(files[0])} acceptedFiles={{
                                "image/*": [".jpg", ".jpeg", ".png"]
                            }} />
                        </div>
                        <Button styles="w-full px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white disabled:cursor-not-allowed" disabled={loading} onClick={handleRegister}>
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin w-5 h-5 mr-2" />
                                    <span>Registering...</span>
                                </div>
                            )
                                : "Register"
                            }
                        </Button>
                    </div>
            }
            <div className="justify-center mt-4 w-full px-4 py-2 rounded-md bg-red-500 text-white" style={{ display: !!errorMessage ? "flex" : "none" }}>
                {errorMessage}
            </div>
            <div className="justify-center mt-4 w-full px-4 py-2 rounded-md bg-green-500 text-white" style={{ display: !!successMessage ? "flex" : "none" }}>
                {successMessage}
            </div>
            <div className="flex gap-1 py-2 justify-center">
                <p className="text-gray-500">{
                    login ? "Don't have an account?" : "Already have an account?"
                }</p>
                <p className="text-blue-500 cursor-pointer hover:underline" onClick={() => { setLogin(!login); clearFields(); }}>
                    {login ? "Register" : "Login"}
                </p>
            </div>
        </div>
    )
}

export default Login;
