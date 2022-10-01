import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FirebaseServices from "../firebase/FirebaseServices";

const authInstance = FirebaseServices.getAuthInstance();
const storageInstance = FirebaseServices.getStorageInstance();

interface IFirebaseFunctions {
    /**
     * @param photoFile 
     * @returns URL of the uploaded photo
     */
    uploadPhotoToStorage: (photoFile: File) => Promise<{ success: boolean, url: string | null }>,
    /**
     * @param username
     * @param photoFile
     * @returns Success message
     */
    updateUserProfile: ({ username, photoFile }: { username?: string, photoFile?: File }) => Promise<{ success: boolean, message: string }>,
}

const Functions = {} as IFirebaseFunctions;

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

export default Functions;
