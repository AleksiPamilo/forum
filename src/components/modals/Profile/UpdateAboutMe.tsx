import { User } from "firebase/auth";
import React from "react";
import { FaTimes } from "react-icons/fa";
import Functions from "../../../functions";
import { IUser } from "../../../interfaces/User";
import Button from "../../Button";
import { useModal } from "../../context/ModalContext";

type UpdateAboutMeProps = {
    user: User | null,
};

const UpdateAboutMe: React.FC<UpdateAboutMeProps> = ({ user: firebaseUser }) => {
    const { closeModal } = useModal();
    const [user, setUser] = React.useState<IUser | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);
    const ref = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        (async () => {
            const data = await Functions.firebase.getUserByUID(firebaseUser?.uid!);
            setUser(data.user);
        })();
    }, [firebaseUser?.uid]);

    return (
        <div className="w-[30rem] flex flex-col relative bg-zinc-900 p-4 border-2 border-blue-600 shadow-glow-7 rounded-md">
            <div className="flex flex-row justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Update About Me</h1>
                <Button onClick={closeModal}>
                    <FaTimes className="w-5 h-5" />
                </Button>
            </div>
            <div className="flex flex-row gap-4 justify-between">
                <textarea placeholder={user?.about || "About me..."} className="w-full max-h-[20rem] px-4 py-2 mb-10 rounded-md placeholder:text-gray-500 text-gray-600 bg-gray-900 focus:outline-none border-2 border-[#355af060] focus:shadow-[0_0_5px_1px_rgba(33,54,163)]"
                    ref={ref}
                >
                    {user?.about}
                </textarea>
                <div className="absolute bottom-2 right-4">
                    <Button colors={{ background: "bg-green-600 hover:bg-green-700" }} onClick={() => {
                        if (ref.current?.value) {
                            Functions.firebase.updateAboutMe(ref.current.value)
                                .then(((r) => {
                                    if (r.success) {
                                        setError(null);
                                        setSuccess(r.message);
                                    } else {
                                        setSuccess(null);
                                        setError(r.message);
                                    }
                                }));
                        } else {
                            setError("Please enter a value");
                        }
                    }}>Save</Button>
                </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </div>
    )
}

export default UpdateAboutMe;
