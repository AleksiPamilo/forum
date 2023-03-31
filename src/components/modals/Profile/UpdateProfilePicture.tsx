import { User } from "firebase/auth";
import React from "react";
import { FaTimes } from "react-icons/fa";
import Functions from "../../../functions";
import Button from "../../Button";
import { useModal } from "../../../hooks";
import Dropzone from "../../Dropzone";

type UpdateProfilePictureProps = {
    user: User | null,
};

const UpdateProfilePicture: React.FC<UpdateProfilePictureProps> = ({ user }) => {
    const { closeModal } = useModal();
    const [photoFile, setPhotoFile] = React.useState<File | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    return (
        <div className="w-[30rem] flex flex-col bg-zinc-900 p-4 border-2 border-blue-600 shadow-glow-7 rounded-md">
            <div className="flex flex-row justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Update Profile Picture</h1>
                <Button onClick={closeModal}>
                    <FaTimes className="w-5 h-5" />
                </Button>
            </div>

            <Dropzone maxFiles={1} acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png"] }} onChange={files => setPhotoFile(files[0])} />

            <div className="mt-2 flex justify-between">
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">{success}</p>}
                {!error && !success && !photoFile && <p className="text-gray-500 mt-2">Select a file.</p>}
                {!error && !success && photoFile && <p className="text-gray-500 mt-2">Continue by clicking save.</p>}

                <Button colors={{ background: "bg-green-600 hover:bg-green-700" }} onClick={() => {
                    if (!user?.emailVerified) {
                        setSuccess(null);
                        setError("Please verify your email before updating your photo.");
                        return;
                    } else if (!photoFile) {
                        setSuccess(null);
                        setError("Please select a photo to upload.");
                        return;
                    }

                    Functions.firebase.updateProfile({ photoFile: photoFile })
                        .then(((r) => {
                            if (r.success) {
                                setError(null);
                                setSuccess(r.message);
                            } else {
                                setSuccess(null);
                                setError(r.message);
                            }
                        })
                        );
                }}>Save</Button>
            </div>
        </div>
    )
}

export default UpdateProfilePicture;
