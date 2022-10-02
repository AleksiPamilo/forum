import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import FirebaseServices from "../../firebase/FirebaseServices";

const authInstance = FirebaseServices.getAuthInstance();
const Functions = {} as IAuthFunctions;

export interface IAuthFunctions {
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
}

Functions.requestPasswordReset = async (email: string) => {
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

export default Functions;
