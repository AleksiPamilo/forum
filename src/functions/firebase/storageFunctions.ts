import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FirebaseServices from "../../firebase/FirebaseServices";

const authInstance = FirebaseServices.getAuthInstance();
const storageInstance = FirebaseServices.getStorageInstance();
const Functions = {} as IStorageFunctions;

export interface IStorageFunctions {
    /**
     * @description Uploads a photo to the storage
     * @param photoFile The photo file to upload
     * @returns A promise that resolves to an object containing a success boolean, a message string, and the url of the uploaded photo
     */
    uploadPhoto: (photoFile: File) => Promise<{ success: boolean, url: string | null }>,
}

Functions.uploadPhoto = async (photoFile) => {
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
