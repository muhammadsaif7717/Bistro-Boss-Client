import { useQuery } from "@tanstack/react-query";
import useAxiosSecret from "../../../Hooks/useAxiosSecret";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUsers } from "react-icons/fa";



const AllUsers = () => {
    const axiosSecure = useAxiosSecret()
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });


    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                // delete from firebase
                axiosSecure.patch(`/users/admin/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Successfull!",
                                text: "User is promoted to Admin.",
                                icon: "success"
                            });
                            //refetch to refresh
                            refetch();
                        }
                    })
            }
        });
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
                axiosSecure.delete(`/users/${id}`)
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
                <h1 className="text-4xl font-semibold">All Users</h1>
                <h1 className="text-4xl font-semibold">Total Users: {users.length}</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) =>
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.photo} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span>{user.name}</span>
                                    </td>

                                    <td>
                                        <span>{user.email}</span>
                                    </td>
                                    <td>
                                        {
                                            user.role==='admin'? 'Admin':
                                            <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-ghost text-red-500"><FaUsers></FaUsers></button>
                                        }
                                    </td>

                                    <td>
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-ghost text-red-500"><FaTrashAlt></FaTrashAlt></button>
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

export default AllUsers;