import { useAuth } from "../hooks";

export default function Home() {
    const { isLoggedIn, login, logout } = useAuth();

    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => login("aleksi.pamilo@gmail.com", "123456")}>Login</button>
            <button onClick={logout}>LogOut</button>
        </div>
    )
}
