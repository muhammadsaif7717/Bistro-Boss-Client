import useAxiosSecret from "../../../Hooks/useAxiosSecret";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useMenu from "../../../Hooks/useMenu";
import { Link } from "react-router-dom";

const ManageItem = () => {
    const axiosSecure = useAxiosSecret()
    const [items, loading, refetch] = useMenu();
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-bars loading-lg scale-110"></span>
            </div>
        );
    }


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
                axiosSecure.delete(`/menu/${id}`)
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
                <h1 className="text-4xl font-semibold">Total Menu Items: {items.length}</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items?.map((menuItem, index) =>
                                <tr key={menuItem._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={menuItem.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span>{menuItem.name}</span>
                                    </td>

                                    <td>
                                        <span>{menuItem.price}</span>
                                    </td>

                                    <td>
                                        <Link to={`/dashboard/update-item/${menuItem._id}`} className="btn btn-ghost text-red-500"><FaEdit></FaEdit></Link>
                                    </td>

                                    <td>
                                        <button onClick={() => handleDelete(menuItem._id)} className="btn btn-ghost text-red-500"><FaTrashAlt></FaTrashAlt></button>
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

export default ManageItem;