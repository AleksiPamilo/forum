import {
    requestPasswordReset,
    sendEmailVerification,
    updateProfile,
    isUsernameAvailable,
    getUserByUID,
    getUserByUsername,
    saveProfileMessage,
    deleteProfileMessage,
    updateEmailAddress,
    updateAboutMe,
    saveThreadReply,
    createThread,
    deleteThreadReply,
    deleteThread,
    createCategory,
    createForum,
    deleteCategory,
    deleteForum,
    updateCategory,
    updateForum,
} from "./firebase"

/**
 * @description Gets the time elapsed since the given time
 * @param time The time to compare
 * @returns A string containing the time elapsed
 */
const timeAgo = (time: number) => {
    const timeAgo = Date.now() - time;
    const seconds = Math.floor(timeAgo / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
        return "Just now";
    } else if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (days < 30) {
        return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (months < 12) {
        return `${months} month${months === 1 ? "" : "s"} ago`;
    } else {
        return `${years} year${years === 1 ? "" : "s"} ago`;
    }
}

/**
 * @description Validates that a string doesn't contain special characters
 * @param text The text to be validated
 * @returns boolean
 */
const isValidCharacter = (text: string): boolean => {
    const validCharacterRegex: RegExp = /^[a-zA-Z]*$/;
    return validCharacterRegex.test(text);
}

/**
 * @description Generates a ID
 * @returns string
 */
const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * @description Generate slug froms tring
 */
const generateSlug = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
}

const Functions = {
    timeAgo,
    isValidCharacter,
    generateId,
    generateSlug,
    firebase: {
        requestPasswordReset,
        sendEmailVerification,
        updateProfile,
        isUsernameAvailable,
        getUserByUID,
        getUserByUsername,
        saveProfileMessage,
        deleteProfileMessage,
        updateEmail: updateEmailAddress,
        updateAboutMe,
        saveThreadReply,
        createThread,
        deleteThreadReply,
        deleteThread,
        createCategory,
        createForum,
        deleteCategory,
        deleteForum,
        updateCategory,
        updateForum,
    }
}

export default Functions;
