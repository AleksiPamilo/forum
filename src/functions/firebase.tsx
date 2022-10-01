import { sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FirebaseServices from "../firebase/FirebaseServices";

const authInstance = FirebaseServices.getAuthInstance();
const storageInstance = FirebaseServices.getStorageInstance();

interface IFirebaseFunctions {
    /**
     * @description Uploads a photo to the storage bucket
     * @param photoFile 
     * @returns URL of the uploaded photo
     */
    uploadPhotoToStorage: (photoFile: File) => Promise<{ success: boolean, url: string | null }>,
    /**
     * @description Updates the user's profile
     * @param username
     * @param photoFile
     * @returns Success bool and Message
     */
    updateUserProfile: ({ username, photoFile }: { username?: string, photoFile?: File }) => Promise<{ success: boolean, message: string }>,
    auth: IAuthFunctions
}

interface IAuthFunctions {
    /**
     * @description Sends an password reset email to the user
     * @param email
     * @returns Success bool and Message
     */
    requestPasswordReset: (email: string) => Promise<{ success: boolean, message: string }>,
    /**
     * @description Sends an email verification to the user
     * @returns Success bool and Message
     */
    sendEmailVerification: () => Promise<{ success: boolean, message: string }>,
}

const Functions = {} as IFirebaseFunctions;
Functions.auth = {} as IAuthFunctions;

Functions.updateUserProfile = async ({ username, photoFile }) => {
    const user = authInstance.currentUser;
    let photoUrl: string | null = null;

    if (!user) return { success: false, message: "User not logged in" };
    if (photoFile) {
        const uploaded = await Functions.uploadPhotoToStorage(photoFile);
        if (uploaded.success) {
            photoUrl = uploaded.url;
        }
    }

    try {
        await updateProfile(user, {
            displayName: username ?? user.displayName,
            photoURL: photoUrl ?? user.photoURL ?? "https://i.imgur.com/1u0ESiX.png",
        });

        return { success: true, message: "Profile updated successfully" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}

Functions.uploadPhotoToStorage = async (photoFile: File) => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in", url: null };

    const storageRef = ref(storageInstance, `profilepictures/${user.uid}`);

    try {
        await uploadBytes(storageRef, photoFile);
        return { success: true, url: await getDownloadURL(storageRef) };
    } catch {
        return { success: false, url: null };
    }
}

Functions.auth.requestPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(authInstance, email);
        return { success: true, message: "Password reset email sent" };
    } catch {
        return { success: false, message: "We couldn't find that account!" };
    }
}

Functions.auth.sendEmailVerification = async () => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };

    try {
        await sendEmailVerification(user);
        return { success: true, message: "Email verification sent" };
    } catch {
        return { success: false, message: "We couldn't find that account!" };
    }
}

export default Functions;
