import { sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FirebaseServices from "../firebase/FirebaseServices";

const firestoreInstance = FirebaseServices.getFirestoreInstance();
const authInstance = FirebaseServices.getAuthInstance();
const storageInstance = FirebaseServices.getStorageInstance();

const Functions = {} as IFirebaseFunctions;

export interface IFirebaseFunctions {
    /* Auth Functions */

    /**
     * @description Sends an password reset email to the user
     * @param email The email of the user
     * @returns A promise that resolves to an object containing a success boolean and a message string
     */
    requestPasswordReset: (email: string) => Promise<{ success: boolean, message: string }>,
    /**
     * @description Sends an email verification to the user
     * @returns A promise that resolves to an object containing a success boolean and a message string
     */
    sendEmailVerification: () => Promise<{ success: boolean, message: string }>,

    /* Storage Functions */
    /**
     * @description Uploads a photo to the storage
     * @param photoFile The photo file to upload
     * @returns A promise that resolves to an object containing a success boolean, a message string, and the url of the uploaded photo
     */
    uploadPhoto: (photoFile: File) => Promise<{ success: boolean, url: string | null }>,

    /* User Functions */
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
    /**
     * @description Gets the user's data from the database
     * @param uid The user's uid
     * @returns A promise that resolves to an object containing the user's data
     */
    getUserByUID: (uid: string | null | undefined) => Promise<{ success: boolean, message: string, user: { username: string, photoUrl: string } }>
}

/* Auth Functions */
Functions.requestPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(authInstance, email);
        return { success: true, message: "Password reset email sent" };
    } catch {
        return { success: false, message: "We couldn't find that account!" };
    }
}

Functions.sendEmailVerification = async () => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };

    try {
        await sendEmailVerification(user);
        return { success: true, message: "Email verification sent" };
    } catch {
        return { success: false, message: "We couldn't find that account!" };
    }
}

/* Storage Functions */

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

/* User Functions */

Functions.updateProfile = async ({ username, photoFile }) => {
    const user = authInstance.currentUser;
    let photoUrl: string | null = null;

    if (!user) return { success: false, message: "User not logged in" };
    if (!username && !photoFile) return { success: false, message: "No changes to make" };

    if (photoFile) {
        const uploaded = await Functions.uploadPhoto(photoFile);
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

Functions.isUsernameAvailable = async (username) => {
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

Functions.getUserByUID = async (uid) => {
    if (!uid) return { success: false, message: "User not logged in", user: { username: "", photoUrl: "" } };

    const snap = await getDoc(doc(firestoreInstance, "users", uid));
    if (snap.exists()) {
        return { success: true, message: "", user: snap.data() as { username: string, photoUrl: string } };
    } else {
        return { success: false, message: "User not found", user: { username: "", photoUrl: "" } };
    }
}

export default Functions;
