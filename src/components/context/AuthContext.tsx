import React from "react";
import FirebaseServices from "../../firebase/FirebaseServices";
import { User, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const authInstance = FirebaseServices.getAuthInstance();

interface IAuthContext {
    user: User | null;
    isLoggedIn: boolean,
    checkLogin: () => void;
    logout: () => void,
    login: (email: string, password: string) => Promise<{ success: boolean, message: string }>,
    register: (email: string, password: string, username: string, photoUrl?: string) => Promise<{ success: boolean, message: string }>,
    updateUser: (username?: string, photoURL?: string) => Promise<{ success: boolean, message: string }>
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
            setIsLoggedIn(true);
            setUser(userCredential.user);

            return { success: true, message: "Login Successful" };
        } catch {
            return { success: false, message: "Invalid Credentials" };
        }
    }

    const register = async (email: string, password: string, username: string, photoUrl?: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
            setIsLoggedIn(true);
            setUser(userCredential.user);

            updateUser(username, photoUrl);

            return { success: true, message: "Registration Successful" };
        } catch (e) {
            if (e instanceof Error) {
                if (password.length < 6) {
                    return { success: false, message: "Password must be at least 6 characters" };
                } else {
                    return { success: false, message: "Registration failed" };
                }
            } else {
                return { success: false, message: "Something went wrong. Try again!" };
            }
        }
    }

    const logout = () => {
        signOut(authInstance);
        setIsLoggedIn(false);
        setUser(null);
    }

    const updateUser = async (username?: string, photoUrl?: string) => {
        const user = authInstance.currentUser;
        if (!user) return { success: false, message: "User not logged in" };

        try {
            await updateProfile(user, {
                displayName: username ?? user.displayName ?? null,
                photoURL: photoUrl ?? user.photoURL ?? "https://i.imgur.com/1u0ESiX.png",
            });

            return { success: true, message: "Profile updated successfully" };
        } catch {
            return { success: false, message: "Something unexpected happened. Try again!" };
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            checkLogin,
            login,
            logout,
            register,
            updateUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
