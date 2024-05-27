import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecret from "./useAxiosSecret";


const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecret();

    const { data: isAdmin,isPending:isAdminLoading } = useQuery({
        queryKey: [user?.email,'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`users/admin/${user.email}`);
            console.log(res.data)
            return res.data.admin;
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useAdmin;