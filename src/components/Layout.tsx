import { Outlet } from "react-router-dom"
import Header from "./Header";

const Layout = () => {
    return (
        <div className="flex min-w-[100vw] min-h-[100vh]">
            <div className="min-w-full min-h-full p-4 shadow-xl bg-[#171717] text-white">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;
