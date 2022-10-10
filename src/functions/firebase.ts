import { sendEmailVerification as sendVerification, sendPasswordResetEmail, updateProfile as updateUserProfile } from "firebase/auth";
import { doc, getDoc, updateDoc, writeBatch } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FirebaseServices from "../firebase/FirebaseServices";
import { IUser } from "../interfaces/User";
import { IProfileMessage } from "../interfaces/Message";

const firestoreInstance = FirebaseServices.getFirestoreInstance();
const authInstance = FirebaseServices.getAuthInstance();
const storageInstance = FirebaseServices.getStorageInstance();

/* Auth Functions */

/**
 * @description Sends an password reset email to the user
 * @param email The email of the user
 * @returns A promise that resolves to an object containing a success boolean and a message string
 */
export const requestPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(authInstance, email);
        return { success: true, message: "Password reset email sent" };
    } catch {
        return { success: false, message: "We couldn't find that account!" };
    }
}

/**
 * @description Sends an email verification to the user
 * @returns A promise that resolves to an object containing a success boolean and a message string
 */
export const sendEmailVerification = async () => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };

    try {
        await sendVerification(user);
        return { success: true, message: "Email verification sent" };
    } catch {
        return { success: false, message: "We couldn't find that account!" };
    }
}

/* Storage Functions */

/**
 * @description Uploads a photo to the storage
 * @param photoFile The photo file to upload
 * @returns A promise that resolves to an object containing a success boolean, a message string, and the url of the uploaded photo
 */
export const uploadPhoto = async (photoFile: File) => {
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

/**
* @description Updates the user's profile
* @param username The username of the user
* @param photoFile The profile photo of the user
* @returns A promise that resolves to an object containing a success boolean and a message string
*/
export const updateProfile = async ({ username, photoFile }: { username: string, photoFile?: File }) => {
    const user = authInstance.currentUser;
    let photoUrl: string | null = null;

    if (!user) return { success: false, message: "User not logged in" };
    if (!username && !photoFile) return { success: false, message: "No changes to make" };

    if (photoFile) {
        const uploaded = await uploadPhoto(photoFile);
        if (uploaded.success) {
            photoUrl = uploaded.url ?? "https://i.imgur.com/1u0ESiX.png";
        }
    } else {
        photoUrl = "https://i.imgur.com/1u0ESiX.png"
    }

    if (username) {
        const isAvailable = await isUsernameAvailable(username);
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
        await updateUserProfile(user, {
            displayName: username ?? user.displayName,
            photoURL: photoUrl ?? user.photoURL ?? "https://i.imgur.com/1u0ESiX.png",
        });

        return { success: true, message: "Profile updated successfully" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}

/**
 * @description Checks if the given username is available
 * @param username The username to check
 * @returns A promise that resolves to a boolean
 */
export const isUsernameAvailable = async (username: string) => {
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

/**
 * @description Gets the user's data from the database
 * @param uid The user's uid
 * @returns A promise that resolves to an object containing the user's data
 */
export const getUserByUID = async (uid: string) => {
    if (!uid) return { success: false, message: "User not logged in", user: null };

    const snap = await getDoc(doc(firestoreInstance, "users", uid));
    if (snap.exists()) {
        return { success: false, message: "User not found", user: { ...snap.data(), uid: snap.id } as IUser };
    } else {
        return { success: false, message: "User not found", user: null };
    }
}

/**
 * @Description Gets the user's data from the database
 * @param username The user's username
 * @returns A promise that resolves to an object containing the user's data
 */
export const getUserByUsername = async (username?: string) => {
    if (!username) return { success: false, message: "User Not Found", user: null };

    const snap = await getDoc(doc(firestoreInstance, "usernames", username.toLowerCase()));
    if (snap.exists()) {
        return getUserByUID(snap.data()?.uid);
    } else {
        return { success: false, message: "User not found", user: null };
    }
}

/**
 * @description Saves the message to the database
 * @param message The message to save
 * @returns A promise that resolves to an object containing a success boolean and a message string
*/
export const saveProfileMessage = async (message: IProfileMessage, profileOwnerUid: string) => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };

    const userDoc = doc(firestoreInstance, "users", profileOwnerUid);
    const messages = await getDoc(userDoc).then((doc) => doc.data()?.messages ?? []);

    messages.push(message);

    try {
        await updateDoc(userDoc, { messages: messages });
        return { success: true, message: "Message saved successfully" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}

/**
 * @description Deletes the message from the database
 * @param message The message to delete
 * @returns A promise that resolves to an object containing a success boolean and a message string
*/
export const deleteProfileMessage = async (message: IProfileMessage, profileOwnerUid: string) => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };
    if (message.createdBy.uid !== user.uid) return { success: false, message: "You can't delete this message!" };

    const userDoc = doc(firestoreInstance, "users", profileOwnerUid);
    const messages = await getDoc(userDoc).then((doc) => doc.data()?.messages ?? []);

    const index = messages.findIndex((msg: IProfileMessage) => msg?.id === message.id);
    if (index !== -1) {
        messages.splice(index, 1);
    }

    try {
        await updateDoc(userDoc, { messages: messages });
        return { success: true, message: "Message deleted successfully!" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}