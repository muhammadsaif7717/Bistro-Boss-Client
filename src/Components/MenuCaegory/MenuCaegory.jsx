
import { Link } from "react-router-dom";
import MenuItem from "../MenuItem/MenuItem";


const MenuCaegory = ({ items,category }) => {



    return (
        <div>
            <div className="gap-8 grid md:grid-cols-2">
                {
                    items?.map(item =>
                        <MenuItem
                            key={item._id}
                            item={item}
                        ></MenuItem>
                    )
                }
            </div>
            <div className="flex justify-center">
                <Link to={`/shop/${category}`} className="btn btn-outline mt-5  border-t-0 border-x-0 border-b-4 border-black">Order Your Favourite Food</Link>
            </div>
        </div>
    );
};

export default MenuCaegory;