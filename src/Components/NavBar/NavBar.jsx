import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


const NavBar = () => {
    const { user, logOutUser } = useContext(AuthContext)

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                console.log('User Logged Out')
            })
            .catch(err => console.log(err.message))
    }

    const navOptions = <div className=" flex gap-5 text-lg">
        <NavLink to={`/`}>Home</NavLink>
        <NavLink to={`/menu`}>Menu</NavLink>
        <NavLink to={`/shop/salad`}>Shop</NavLink>
    </div>
    return (
        <div className="navbar bg-black bg-opacity-30 text-white  fixed z-10 max-w-screen-xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <nav tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        {navOptions}
                    </nav>
                </div>
                <a className="btn btn-ghost text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <nav className="menu menu-horizontal px-1">
                    {navOptions}
                </nav>
            </div>
            <div className="navbar-end gap-5">
                <div>
                    {
                        user &&
                        <img src={user.photoURL} className="w-10 rounded-full" title={user.displayName} />
                    }
                </div>
                {
                    user ?
                        <button onClick={handleLogOut} className="btn">Log Out</button>
                        :
                        <Link to={`/login`} className="btn">Login</Link>
                }
            </div>
        </div>
    );
};

export default NavBar;