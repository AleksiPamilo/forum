import { sendEmailVerification as sendVerification, sendPasswordResetEmail, updateEmail, updateProfile as updateUserProfile } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FirebaseServices from "../firebase/FirebaseServices";
import { IUser } from "../interfaces/User";
import { IProfileMessage } from "../interfaces/Message";
import { Message, Thread } from "../mst";

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
export const updateProfile = async ({ username, photoFile }: { username?: string, photoFile?: File }) => {
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

    if (photoFile && !username) {
        const userDoc = doc(firestoreInstance, "users", user.uid);
        await updateDoc(userDoc, { photoUrl }).catch(() => { });
    }

    if (username) {
        const isAvailable = await isUsernameAvailable(username.toLowerCase());
        if (isAvailable) {
            const userDoc = doc(firestoreInstance, "users", user.uid);
            await setDoc(userDoc, { username: username, usernameLowercase: username.toLowerCase(), photoUrl: photoUrl })
                .catch((e) => { });
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
 * @description Update User's Email Address
 * @param email The new email address
 * @returns A promise that resolves to an object containing a success boolean and a message string
 */
export const updateEmailAddress = async (email: string) => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };

    try {
        await updateEmail(user, email);
        return { success: true, message: "Email updated successfully" };
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
    if (username.length >= 3 && username.length <= 20) {
        const q = query(collection(firestoreInstance, "users"), where("usernameLowercase", "==", username));
        const querySnapshot = await getDocs(q);

        return querySnapshot.empty;
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

    const q = query(collection(firestoreInstance, "users"), where("usernameLowercase", "==", username.toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return { success: true, message: "User found", user: { ...querySnapshot.docs[0].data(), uid: querySnapshot.docs[0].id } as IUser };
    } else {
        return { success: false, message: "User Not Found", user: null };
    }
}

/**
 * @description Saves user's about me to the database
 * @param aboutMe The user's about me
 * @returns A promise that resolves to an object containing a success boolean and a message string
 */
export const updateAboutMe = async (aboutMe: string) => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };

    try {
        const userDoc = doc(firestoreInstance, "users", user.uid);
        await updateDoc(userDoc, { about: aboutMe }).catch(() => { });
        return { success: true, message: "About me saved successfully" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
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

/**
 * @description Delete's a thread reply from the database
 * @param reply The reply to delete
 * @returns A promise that resolves to an object containing a success boolean and a message string
 */
export const deleteThreadReply = async (reply: Message) => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };
    if (reply.createdBy !== user.uid) return { success: false, message: "You can't delete this reply!" };

    const threadDoc = doc(firestoreInstance, "forumx", "message");
    const replies = await getDoc(threadDoc).then((doc) => doc.data()?.messages ?? []);

    const index = replies.findIndex((r: Message) => r?.id === reply.id);
    if (index !== -1) {
        replies.splice(index, 1);
    }

    try {
        await updateDoc(threadDoc, { messages: replies });
        return { success: true, message: "Reply deleted successfully!", replies: replies };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}

/**
 * @description Saves the thread reply to the database
 * @param reply The reply to save
 * @returns A promise that resolves to an object containing a success boolean and a message string
 */
export const saveThreadReply = async (reply: Message) => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };

    const messageDoc = doc(firestoreInstance, "forumx", "message")
    const messages = await getDoc(messageDoc).then((doc) => doc.data()?.messages ?? []);
    messages.push(reply);

    try {
        await updateDoc(messageDoc, { messages: messages });
        return { success: true, message: "Reply saved successfully" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}

/**
 * @description Creates a new thread in the database
 * @param thread The post to create
 * @returns A promise that resolves to an object containing a success boolean, a message string and thread location
 */
export const createThread = async (thread: Thread) => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };

    const threadDoc = doc(firestoreInstance, "forumx", "thread")
    const threads = await getDoc(threadDoc).then((doc) => doc.data()?.threads ?? []);

    threads.push(thread);

    try {
        await updateDoc(threadDoc, { threads: threads });
        const threadLocation = `/thread/${thread.title}.${thread.id}`;
        return { success: true, message: "Post created successfully", threadLocation: threadLocation };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}

/**
 * @description Deletes a thread from the database
 * @param Thread The thread to delete
 * @returns A promise that resolves to an object containing a success boolean and a message string
*/
export const deleteThread = async (thread: Thread) => {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };
    if (thread.createdBy !== user.uid) return { success: false, message: "You can't delete this thread!" };

    const threadDoc = doc(firestoreInstance, "forumx", "thread")
    const threads = await getDoc(threadDoc).then((doc) => doc.data()?.threads ?? []);

    const index = threads.findIndex((t: Thread) => t?.id === thread.id);
    if (index !== -1) {
        threads.splice(index, 1);
    }

    try {
        await updateDoc(threadDoc, { threads: threads });
        return { success: true, message: "Thread deleted successfully!" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}