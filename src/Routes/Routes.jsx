import { createBrowserRouter } from "react-router-dom";
import Root from '../Layouts/Root'
import Home from "../Components/Home/Home";
import Menu from "../Components/Menu/Menu";
import Shop from "../Components/Shop/Shop";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Components/Secret/Secret";
import Dashboard from "../Layouts/Dashboard";
import MyCart from "../Components/Dashboard/MyCart/MyCart";
import AllUsers from "../Components/Dashboard/AllUsers/AllUsers";
import ManageBooking from "../Components/Dashboard/ManageBooking/ManageBooking";
import AdminHome from "../Components/Dashboard/AdminHome/AdminHome";
import AddItem from "../Components/Dashboard/AddItem/AddItem";
import ManageItem from "../Components/Dashboard/ManageItem/ManageItem";
import UserHome from "../Components/Dashboard/UserHome/UserHome";
import Reservation from "../Components/Dashboard/Reservation/Reservation";
import PaymentHistory from "../Components/Dashboard/PaymentHistory/PaymentHistory";
import AddReview from "../Components/Dashboard/AddReview/AddReview";
import MyBooking from "../Components/Dashboard/MyBooking/MyBooking";
import AdminRiute from "./AdminRiute";

const router = createBrowserRouter([
    //Ui routes
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
    },

    //dashboard
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [

            //Admin routes
            {
                path: 'admin-home',
                element: <AdminRiute><AdminHome></AdminHome></AdminRiute>,
            },
            {
                path: 'add-item',
                element: <AdminRiute><AddItem></AddItem></AdminRiute>,
            },
            {
                path: 'manage-item',
                element: <AdminRiute><ManageItem></ManageItem></AdminRiute>,
            },
            {
                path: 'manage-booking',
                element: <AdminRiute><ManageBooking></ManageBooking></AdminRiute>,
            },
            {
                path: 'all-users',
                element: <AdminRiute><AllUsers></AllUsers></AdminRiute>,
            },

            //user routes
            {
                path: 'user-home',
                element: <UserHome></UserHome>,
            },
            {
                path: 'reservation',
                element: <Reservation></Reservation>,
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>,
            },
            {
                path: 'my-cart',
                element: <PrivateRoute><MyCart></MyCart></PrivateRoute>,
            },
            {
                path: 'add-review',
                element: <AddReview></AddReview>,
            },
            {
                path: 'my-booking',
                element: <MyBooking></MyBooking>,
            },
        ]
    }
]);




export default router