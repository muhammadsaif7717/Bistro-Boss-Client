import { Link, NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { TbStarsFilled } from "react-icons/tb";
import { MdEditCalendar } from "react-icons/md";
import { IoReorderThreeSharp } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import useCart from "../Hooks/useCart";


const Dashboard = () => {
    const [cart] = useCart();
    return (
        <div className="flex md:gap-5">
            {/*dshboard sidebar */}
            <div className="w-5/12 md:w-64 min-h-screen bg-orange-400">
                <ul className="menu  flex flex-col md:gap-5 ">
                    <li><NavLink to={`/`}> <IoHome /> USER HOME</NavLink></li>
                    <li><NavLink to={`/`}> <FaCalendarAlt /> RESERVATION</NavLink></li>
                    <li><NavLink to={`/`}> <MdOutlinePayment /> PAYMENT HISTORY</NavLink></li>
                    <li><NavLink to={`/dashboard/cart`}> <FaShoppingCart /> MY CART ({ cart.length})</NavLink></li>
                    <li><NavLink to={`/`}> <TbStarsFilled /> ADD REVIEW</NavLink></li>
                    <li><NavLink to={`/`}> <MdEditCalendar /> MY BOOKING</NavLink></li>
                </ul>
                <hr className="w-3/4 mx-auto md:my-5"/>
                <ul className="menu pb-0  flex flex-col md:gap-2">
                    <li><Link to={`/`}> <IoHome /> HOME</Link></li>
                    <li><Link to={`/menu`}> <IoReorderThreeSharp  /> MENU</Link></li>
                    <li><Link to={`/`}> <FaShoppingBag /> SHOP</Link></li>
                    <li><Link to={`/`}> <IoMdMail /> CONTACT</Link></li>
                </ul>
            </div>
            {/* dshboard content */}
            <div className="flex-1 p-2 md:p-5">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;