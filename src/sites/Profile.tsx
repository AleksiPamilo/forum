import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
// import Functions from "../functions";

// MockData
import { user } from "../mockdata/user";

const Profile: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    //const [user, setUser] = React.useState<{ username: string, photoUrl: string } | null>(null);
    const { username } = useParams();

    React.useEffect(() => {
        setLoading(true);
        // Functions.firebase.getUserByUsername(username).then((data) => {
        //     setUser(data.user);
        //     setLoading(false);
        // });
        setTimeout(() => setLoading(false), 150);
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
        <div className="bg-[#171717] flex justify-center items-center mt-2">
            <div className="w-[100rem] bg-zinc-800">
                <ProfileHeader user={user} />
            </div>
        </div>
    )
}

export default Profile;
