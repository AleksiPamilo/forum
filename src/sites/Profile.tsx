import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileMessages from "../components/Profile/ProfileMessages";
import Socials from "../components/Profile/Socials";
import Functions from "../functions";
import { IUser } from "../interfaces/User";

const Profile: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState<IUser | null>(null);
    const { username } = useParams();

    React.useEffect(() => {
        setLoading(true);

        Functions.firebase.getUserByUsername(username).then((data) => {
            setUser(data?.user);
            setLoading(false);
        });
    }, [username]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center mt-60">
                <FaSpinner className="animate-spin w-40 h-40" />
                <h1 className="mt-2 text-2xl font-bold">Loading...</h1>
            </div>
        )
    }

    if (!user?.username) {
        return (
            <div className="flex flex-col justify-center items-center mt-60">
                <h1 className="text-2xl font-bold">User not found!</h1>
            </div>
        )
    }

    return (
        <div className="bg-[#171717] flex flex-col justify-center items-center mt-2">
            <div className="w-full">
                <div className="bg-zinc-800 rounded-lg my-3">
                    <ProfileHeader user={user} />
                </div>
                <div className="flex flex-col md:flex-row w-full gap-3">
                    <div className="flex flex-col rounded-md w-full md:w-[20rem] bg-zinc-800">
                        <Socials user={user} />
                    </div>
                    <div className="flex w-full rounded-md bg-zinc-800">
                        <ProfileMessages user={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
