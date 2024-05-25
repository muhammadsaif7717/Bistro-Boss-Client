import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecret from "../../../Hooks/useAxiosSecret";

const MyCart = () => {
    const axiosSecure = useAxiosSecret()
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // delete from firebase
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            //refetch to refresh
                            refetch();
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex justify-evenly">
                <h2 className='text-3xl'>Items: {cart.length}</h2>
                <h2 className='text-3xl'>Total Price: {totalPrice}</h2>
                <button className="btn btn-primary">Pay</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart?.map((item, index) =>
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span>${item.name}</span>
                                    </td>

                                    <td>
                                        <span>${item.price}</span>
                                    </td>

                                    <td>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost text-red-500"><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyCart;