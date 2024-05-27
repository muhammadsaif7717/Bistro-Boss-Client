import { Link, NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { TbStarsFilled } from "react-icons/tb";
import { MdEditCalendar } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import useCart from "../Hooks/useCart";
import { ImSpoonKnife } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();

    // TODO : get admin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div className="flex md:gap-5">
            {/*dshboard sidebar */}
            <div className="w-5/12 md:w-64 min-h-screen bg-orange-400">
                {
                    isAdmin ?
                        <div>
                            <ul className="menu  flex flex-col md:gap-5 ">
                                <li><NavLink to={`admin-home`}> <IoHome /> ADMIN HOME</NavLink></li>
                                <li><NavLink to={`add-item`}> <ImSpoonKnife /> ADD ITEM</NavLink></li>
                                <li><NavLink to={`manage-item`}> <TiThMenu /> MANAGE ITEM</NavLink></li>
                                <li><NavLink to={`manage-booking`}> <TbBrandBooking /> MANAGE BOOKINGS </NavLink></li>
                                <li><NavLink to={`all-users`}> <FaPeopleGroup /> ALL USERS</NavLink></li>
                            </ul>
                            <hr className="w-3/4 mx-auto md:my-5" />
                        </div>
                        :
                        <div>
                            <ul className="menu  flex flex-col md:gap-5 ">
                                <li><NavLink to={`user-home`}> <IoHome /> USER HOME</NavLink></li>
                                <li><NavLink to={`reservation`}> <FaCalendarAlt /> RESERVATION</NavLink></li>
                                <li><NavLink to={`payment-history`}> <MdOutlinePayment /> PAYMENT HISTORY</NavLink></li>
                                <li><NavLink to={`my-cart`}> <FaShoppingCart /> MY CART ({cart.length})</NavLink></li>
                                <li><NavLink to={`add-review`}> <TbStarsFilled /> ADD REVIEW</NavLink></li>
                                <li><NavLink to={`my-booking`}> <MdEditCalendar /> MY BOOKING</NavLink></li>
                            </ul>
                            <hr className="w-3/4 mx-auto md:my-5" />
                        </div>
                }

                {/* shared navlink */}
                <ul className="menu pb-0  flex flex-col md:gap-2">
                    <li><Link to={`/`}> <IoHome /> HOME</Link></li>
                    <li><Link to={`/menu`}> <TiThMenu /> MENU</Link></li>
                    <li><Link to={`/shop/salad`}> <FaShoppingBag /> SHOP</Link></li>
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