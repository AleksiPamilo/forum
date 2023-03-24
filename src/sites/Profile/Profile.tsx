import React from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileMessages from "../../components/Profile/ProfileMessages";
import Socials from "../../components/Profile/Socials";
import Functions from "../../functions";
import { useAuth } from "../../hooks";
import { IUser } from "../../interfaces/User";

const Profile: React.FC = () => {
    const { user: currentUser } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState<IUser | null>(null);
    const { username } = useParams();

    React.useEffect(() => {
        setLoading(true);

        if (!username) {
            if (currentUser && currentUser?.displayName) {
                Functions.firebase.getUserByUsername(currentUser.displayName).then((data) => {
                    setUser(data?.user);
                    setLoading(false);
                });
                return;
            }

            setLoading(false);
            return;
        }

        Functions.firebase.getUserByUsername(username).then((data) => {
            setUser(data?.user);
            setLoading(false);
        });
    }, [username, currentUser]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center mt-60">
                <FaSpinner className="animate-spin w-40 h-40" />
                <h1 className="mt-2 text-2xl font-bold">Loading...</h1>
            </div>
        )
    }

    if (!user || !user?.username) {
        return (
            <div className="flex flex-col justify-center items-center mt-60">
                <h1 className="text-2xl font-bold">User not found</h1>
                <p className="mt-2">The user you are looking for doesn't exist.</p>
                <Link to="/forums" className="mt-2 px-4 py-2 bg-zinc-600 hover:bg-zinc-700 rounded-md shadow-lg text-white">
                    Back To Forums
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center mt-2">
            <div className="w-full">
                <div className="bg-zinc-300 dark:bg-zinc-900 rounded-lg my-3">
                    <ProfileHeader user={user} />
                </div>
                <div className="flex flex-col md:flex-row w-full gap-3">
                    <div className="flex flex-col rounded-md w-full md:w-[20rem] bg-zinc-300 dark:bg-zinc-900">
                        <Socials user={user} />
                    </div>
                    <div className="flex w-full rounded-md bg-zinc-300 dark:bg-zinc-900">
                        <ProfileMessages user={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
