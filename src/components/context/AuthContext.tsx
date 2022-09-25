import React from "react";
import FirebaseServices from "../../firebase/FirebaseServices";
import { signInWithEmailAndPassword, User } from "firebase/auth";

const authInstance = FirebaseServices.getAuthInstance();

interface IAuthContext {
    user: User | null;
    isLoggedIn: boolean,
    login: (username: string, password: string) => void,
    logout: () => void,
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

    const login = (email: string, password: string) => {
        signInWithEmailAndPassword(authInstance, email, password)
            .then((userCredential) => {
                setIsLoggedIn(true);
                setUser(userCredential.user);
            })
            .catch((error) => {
                console.log(error);
            }
            );
    }

    const logout = () => {

    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}