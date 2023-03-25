import React from "react";
import { useAuth, useModal } from "../../hooks";
import SettingsCard from "../../components/SettingsCard";
import UpdateUsername from "../../components/modals/Profile/UpdateUsername";
import UpdateEmail from "../../components/modals/Profile/UpdateEmail";
import UpdateProfilePicture from "../../components/modals/Profile/UpdateProfilePicture";
import Functions from "../../functions";
import VerificationSent from "../../components/modals/auth/VerificationSent";

const Settings: React.FC = () => {
    const { user } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();

    return (
        <div className="flex w-full">
            <div className="w-[40rem] h-min p-4 rounded-md bg-zinc-900">
                <h1 className="text-2xl font-bold text-white">General Settings</h1>
                <div className="w-full border border-white mt-2 rounded-full" />
                <SettingsCard title="Username" onClick={() => {
                    setModalContent(<UpdateUsername user={user} />);
                    setIsModalOpen(true);
                }} />
                <SettingsCard title="Email" onClick={() => {
                    setModalContent(<UpdateEmail user={user} />);
                    setIsModalOpen(true);
                }} />
                <SettingsCard title="Profile Picture" onClick={() => {
                    setModalContent(<UpdateProfilePicture user={user} />);
                    setIsModalOpen(true);
                }} />
                <div hidden={user?.emailVerified}>
                    <SettingsCard title="Verify Email" label="Send Verification Email" onClick={() => {
                        Functions.firebase.sendEmailVerification();
                        setModalContent(<VerificationSent />);
                        setIsModalOpen(true);
                    }} />
                </div>
            </div>
        </div>
    )
}

export default Settings;
