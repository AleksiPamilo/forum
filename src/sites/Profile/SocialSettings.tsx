import React from "react";
import { useAuth, useModal } from "../../hooks";
import SettingsCard from "../../components/SettingsCard";
import UpdateAboutMe from "../../components/modals/Profile/UpdateAboutMe";

const Settings: React.FC = () => {
    const { user } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();

    return (
        <div className="flex justify-center mt-14 w-full">
            <div className="w-[40rem] h-min p-4 rounded-md bg-zinc-900">
                <h1 className="text-2xl font-bold text-white">General Settings</h1>
                <div className="w-full border border-white mt-2 rounded-full" />
                <SettingsCard title="About Me" onClick={() => {
                    setModalContent(<UpdateAboutMe user={user} />);
                    setIsModalOpen(true);
                }} />
            </div>
        </div>
    )
}

export default Settings;
