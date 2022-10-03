import { updateProfile } from "firebase/auth";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import FirebaseServices from "../../firebase/FirebaseServices";
import StorageFunctions from "./storageFunctions";

const firestoreInstance = FirebaseServices.getFirestoreInstance();
const authInstance = FirebaseServices.getAuthInstance();
const Functions = {} as IUserFunctions;

export interface IUserFunctions {
    /**
     * @description Updates the user's profile
     * @param username The username of the user
     * @param photoFile The profile photo of the user
     * @returns A promise that resolves to an object containing a success boolean and a message string
     */
    updateProfile: ({ username, photoFile }: { username?: string, photoFile?: File }) => Promise<{ success: boolean, message: string }>,
    /**
     * @description Checks if the given username is available
     * @param username The username to check
     * @returns A promise that resolves to a boolean
     */
    isUsernameAvailable: (username: string) => Promise<boolean>,
}

Functions.updateProfile = async ({ username, photoFile }) => {
    const user = authInstance.currentUser;
    let photoUrl: string | null = null;

    if (!user) return { success: false, message: "User not logged in" };
    if (!username && !photoFile) return { success: false, message: "No changes to make" };

    if (photoFile) {
        const uploaded = await StorageFunctions.uploadPhoto(photoFile);
        if (uploaded.success) {
            photoUrl = uploaded.url;
        }
    }

    if (username) {
        const isAvailable = await Functions.isUsernameAvailable(username);
        if (isAvailable) {
            const userDoc = doc(firestoreInstance, "users", user.uid);
            const usernameDoc = doc(firestoreInstance, "usernames", username.toLowerCase());
            const batch = writeBatch(firestoreInstance);

            batch.set(userDoc, { username: username, photoUrl: photoUrl }, { merge: true });
            batch.set(usernameDoc, { uid: user.uid }, { merge: true });

            await batch.commit()
                .catch((error) => {
                    console.error("Error updating username:", error);
                });
        } else {
            return { success: false, message: "Username not available" };
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

Functions.isUsernameAvailable = async (username: string) => {
    username = username.toLowerCase();
    if (username.length >= 3 && username.length <= 20) {
        const snap = await getDoc(doc(firestoreInstance, "usernames", username));
        if (snap.exists()) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

export default Functions;
