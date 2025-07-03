import Footer from "@/ui/Footer";
import NavBar from "@/ui/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
    return (
        <div className="w-11/12 mx-auto">
        <NavBar/>
            <Outlet/>
        <Footer/>
        </div>
    );
};

export default RootLayout;