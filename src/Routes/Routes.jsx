import { createBrowserRouter } from "react-router-dom";
import Root from '../Layouts/Root'
import Home from "../Components/Home/Home";
import Menu from "../Components/Menu/Menu";
import Shop from "../Components/Shop/Shop";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Components/Secret/Secret";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/menu',
                element: <Menu></Menu>,
            },
            {
                path: '/shop/:category',
                element: <Shop></Shop>,
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/sign-up',
                element: <SignUp></SignUp>
            },
            {
                path: '/secret',
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            },
        ]
    }
]);




export default router