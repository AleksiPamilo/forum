import { sendEmailVerification as sendVerification, sendPasswordResetEmail, updateEmail, updateProfile as updateUserProfile } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FirebaseServices from "../firebase/FirebaseServices";
import { IUser } from "../interfaces/User";
import { IProfileMessage } from "../interfaces/Message";
import { Category, Forum, Reply, Thread } from "../mst";

const firestoreInstance = FirebaseServices.getFirestoreInstance();
const authInstance = FirebaseServices.getAuthInstance();
const storageInstance = FirebaseServices.getStorageInstance();

/* Auth Functions */

/**
 * @description Sends an password reset email to the user
 * @param email The email of the user
 * @returns A promise that resolves to an object containing a success boolean and a message string
 */
export async function requestPasswordReset(email: string) {
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
export async function sendEmailVerification() {
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
export async function uploadPhoto(photoFile: File) {
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
export async function updateProfile({ username, photoFile }: { username?: string, photoFile?: File }) {
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
export async function updateEmailAddress(email: string) {
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
export async function isUsernameAvailable(username: string) {
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
export async function getUserByUID(uid: string) {
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
export async function getUserByUsername(username?: string) {
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
export async function updateAboutMe(aboutMe: string) {
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
export async function saveProfileMessage(message: IProfileMessage, profileOwnerUid: string) {
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
export async function deleteProfileMessage(message: IProfileMessage, profileOwnerUid: string) {
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
export async function deleteThreadReply(reply: Reply) {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };
    if (reply.createdBy !== user.uid) return { success: false, message: "You can't delete this reply!" };

    const threadDoc = doc(firestoreInstance, "forumx", "thread")
    const threads = await getDoc(threadDoc).then((doc) => doc.data()?.threads);
    const replies = threads.find((t: Thread) => t.id === reply.threadId)?.replies ?? [];
    const replyIndex = replies.findIndex((r: Reply) => r?.id === reply.id);
    const threadIndex = threads.findIndex((t: Thread) => t.id === reply.threadId);


    if (replyIndex !== -1) {
        replies.splice(replyIndex, 1);
    }

    if (threadIndex !== -1) {
        threads[threadIndex].replies = replies;
    }

    try {
        await updateDoc(threadDoc, { threads: threads });
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
export async function saveThreadReply(reply: Reply) {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };

    const threadDoc = doc(firestoreInstance, "forumx", "thread")
    const threads = await getDoc(threadDoc).then((doc) => doc.data()?.threads);
    const replies = threads.find((t: Thread) => t.id === reply.threadId)?.replies ?? [];
    replies.push(reply)

    const index = threads.findIndex((t: Thread) => t.id === reply.threadId);
    if (index !== -1) {
        threads[index].replies = replies;
    }

    try {
        await updateDoc(threadDoc, { threads: threads });
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
export async function createThread(thread: Thread) {
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
export async function deleteThread(thread: Thread) {
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

/**
 * @description Create a Category in the database
 * @param category The category to create
 * @returns A promise that resolves to an object containing a success boolean and a message string
 */
export async function createCategory(category: Category) {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };
    if (!(await user.getIdTokenResult().then((idTokenResult) => idTokenResult.claims.admin))) return { success: false, message: "You don't have permission to do this!" };

    const categoryDoc = doc(firestoreInstance, "forumx", "category")
    const categories = await getDoc(categoryDoc).then((doc) => doc.data()?.categories ?? []);

    categories.push(category);

    try {
        await updateDoc(categoryDoc, { categories: categories });
        return { success: true, message: "Category created successfully" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}

/**
 * @description Create a Forum in the database
 * @param forum The forum to create
 * @returns A promise that resolves to an object containing a success boolean and a message string
*/
export async function createForum(forum: Forum) {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };
    if (!(await user.getIdTokenResult().then((idTokenResult) => idTokenResult.claims.admin))) return { success: false, message: "You don't have permission to do this!" };

    const forumDoc = doc(firestoreInstance, "forumx", "forum")
    const forums = await getDoc(forumDoc).then((doc) => doc.data()?.forums ?? []);

    forums.push(forum);

    try {
        await updateDoc(forumDoc, { forums: forums });
        return { success: true, message: "Forum created successfully" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}

/**
 * @description Deletes a category from the database
 * @param category The category to delete
 * @returns A promise that resolves to an object containing a success boolean and a message string
 */
export async function deleteCategory(category: Category) {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };
    if (!(await user.getIdTokenResult().then((idTokenResult) => idTokenResult.claims.admin))) return { success: false, message: "You don't have permission to do this!" };

    const categoryDoc = doc(firestoreInstance, "forumx", "category")
    const categories = await getDoc(categoryDoc).then((doc) => doc.data()?.categories ?? []);

    const index = categories.findIndex((c: Category) => c?.id === category.id);
    if (index !== -1) {
        categories.splice(index, 1);
    }

    try {
        await updateDoc(categoryDoc, { categories: categories });
        return { success: true, message: "Category deleted successfully!" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}

/**
 * @description Deletes a forum from the database
 * @param forum The forum to delete
 * @returns A promise that resolves to an object containing a success boolean and a message string
*/
export async function deleteForum(forum: Forum) {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };
    if (!(await user.getIdTokenResult().then((idTokenResult) => idTokenResult.claims.admin))) return { success: false, message: "You don't have permission to do this!" };

    const forumDoc = doc(firestoreInstance, "forumx", "forum")
    const forums = await getDoc(forumDoc).then((doc) => doc.data()?.forums ?? []);

    const index = forums.findIndex((f: Forum) => f?.id === forum.id);
    if (index !== -1) {
        forums.splice(index, 1);
    }

    try {
        await updateDoc(forumDoc, { forums: forums });
        return { success: true, message: "Forum deleted successfully!" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}

/**
 * @description Updates a category in the database
 * @param category The category to update
 * @returns A promise that resolves to an object containing a success boolean and a message string
*/
export async function updateCategory(category: Category) {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };
    if (!(await user.getIdTokenResult().then((idTokenResult) => idTokenResult.claims.admin))) return { success: false, message: "You don't have permission to do this!" };

    const categoryDoc = doc(firestoreInstance, "forumx", "category")
    const categories = await getDoc(categoryDoc).then((doc) => doc.data()?.categories ?? []);

    const index = categories.findIndex((c: Category) => c?.id === category.id);
    if (index !== -1) {
        categories[index] = category;
    }

    try {
        await updateDoc(categoryDoc, { categories: categories });
        return { success: true, message: "Category updated successfully!" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}

/**
 * @description Updates a forum in the database
 * @param forum The forum to update
 * @returns A promise that resolves to an object containing a success boolean and a message string
 */
export async function updateForum(forum: Forum) {
    const user = authInstance.currentUser;
    if (!user) return { success: false, message: "User not logged in" };
    if (!(await user.getIdTokenResult().then((idTokenResult) => idTokenResult.claims.admin))) return { success: false, message: "You don't have permission to do this!" };

    const forumDoc = doc(firestoreInstance, "forumx", "forum")
    const forums = await getDoc(forumDoc).then((doc) => doc.data()?.forums ?? []);

    const index = forums.findIndex((f: Forum) => f?.id === forum.id);
    if (index !== -1) {
        forums[index] = forum;
    }

    try {
        await updateDoc(forumDoc, { forums: forums });
        return { success: true, message: "Forum updated successfully!" };
    } catch {
        return { success: false, message: "Something unexpected happened. Try again!" };
    }
}
