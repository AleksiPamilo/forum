import { Outlet } from "react-router-dom"
import Header from "./Header";

const Layout = () => {
    return (
        <div className="flex p-8 min-w-[100vw] min-h-[100vh]">
            <div className="min-w-full min-h-full shadow-xl bg-[#171717] text-white">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;
