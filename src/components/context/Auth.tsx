import React from "react";
import FirebaseServices from "../../firebase/FirebaseServices";
import FirebaseFunctions from "../../functions";
import { User, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const authInstance = FirebaseServices.getAuthInstance();

interface IAuthContext {
    user: User | null,
    isLoggedIn: boolean,
    checkLogin: () => void,
    logout: () => void,
    login: (email: string, password: string) => Promise<{ success: boolean, message: string }>,
    signUp: (email: string, password: string, username: string, photoFile?: File) => Promise<{ success: boolean, message: string }>,
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
    const context = React.useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
};

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const checkLogin = React.useCallback(() => {
        authInstance.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        });
    }, []);

    React.useEffect(() => {
        checkLogin();
    }, [checkLogin]);

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
            return { success: true, message: "Login Successful", user: userCredential.user, isLoggedIn: true };
        } catch {
            return { success: false, message: "Invalid Credentials", user: null, isLoggedIn: false };
        }
    }

    const signUp = async (email: string, password: string, username: string, photoFile?: File) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
            const update = await FirebaseFunctions.user.updateProfile({ username, photoFile });
            if (!update.success) {
                await userCredential.user.delete();
                return { success: false, message: update.message, user: null, isLoggedIn: false };
            } else {
                FirebaseFunctions.auth.sendEmailVerification();
            }
            return { success: true, message: "Registration Successful", user: userCredential.user, isLoggedIn: true };
        } catch {
            if (password.length < 6) {
                return { success: false, message: "Password must be at least 6 characters", user: null, isLoggedIn: false };
            } else {
                return { success: false, message: "Registration failed", user: null, isLoggedIn: false };
            }
        }
    }

    const logout = () => {
        signOut(authInstance);
        setIsLoggedIn(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            checkLogin,
            login,
            logout,
            signUp,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
