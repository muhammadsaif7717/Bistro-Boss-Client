import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecret from "../../../Hooks/useAxiosSecret";


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecret();
    const { user } = useAuth();
    const { data: payments } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })
    console.log(payments)
    return (
        <div>
            <h2>Total Payments: {payments?.length}</h2>

            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                        <th>Transaction Id</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments?.map((item, index) =>
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <span>{item?.email}</span>
                                </td>

                                <td>
                                    <span>{item?.transactionId}</span>
                                </td>

                                <td>
                                    <span>${item?.price}</span>
                                </td>

                                <td>
                                    <span>{item?.status}</span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
        </div>
    );
};

export default PaymentHistory;