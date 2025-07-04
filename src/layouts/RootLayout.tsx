import Footer from "@/ui/Footer";
import NavBar from "@/ui/Navbar";
import { Outlet, useLocation } from "react-router";
import { Toaster } from 'react-hot-toast';

const RootLayout = () => {

      const location = useLocation();
  const isHomeRoute = location.pathname === "/";

    return (
        <>
        <div className="w-11/12 mx-auto">
        <NavBar/>
            <Outlet/>
        </div>
       {isHomeRoute &&  <Footer/>}
       <Toaster/>
        </>
    );
};

export default RootLayout;