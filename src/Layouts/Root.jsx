import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";


const Root = () => {
    const location = useLocation();
    console.log(location)
    const ifLoginPage = location.pathname.includes('login')
    const ifSignUpPage = location.pathname.includes('sign-up')
    return (
        <div>
            {(ifLoginPage || ifSignUpPage) || <NavBar></NavBar>}
            <Outlet></Outlet>
            {(ifLoginPage || ifSignUpPage) || <Footer></Footer>}
        </div>
    );
};

export default Root;