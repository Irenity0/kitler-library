import Footer from "@/ui/Footer";
import NavBar from "@/ui/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
    return (
        <>
        <div className="w-11/12 mx-auto">
        <NavBar/>
            <Outlet/>
        </div>
        <Footer/>
        </>
    );
};

export default RootLayout;