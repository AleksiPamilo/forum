import { requestPasswordReset, sendEmailVerification, updateProfile, isUsernameAvailable, getUserByUID, } from "./firebase"

/**
 * @description Gets the time elapsed since the given time
 * @param time The time to compare
 * @returns A string containing the time elapsed
 */
const timeElapsed = (time: number) => {
    const timeAgo = Date.now() - time;
    const seconds = Math.floor(timeAgo / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
        return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
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

const functions = {
    timeElapsed,
    firebase: {
        requestPasswordReset,
        sendEmailVerification,
        updateProfile,
        isUsernameAvailable,
        getUserByUID,
    }
}

export default functions;
