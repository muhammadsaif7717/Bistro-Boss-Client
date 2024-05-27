
import useAxiosSecret from "./useAxiosSecret";
import { useQuery } from "@tanstack/react-query";


const useMenu = () => {
    // const [loading, setLoading] = useState(true)
    // const [items, setItems] = useState([])
    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setItems(data)
    //             setLoading(false)
    //         });
    // }, [])

    const axiosSecure = useAxiosSecret()
    const { refetch, data: items = [], isPending: loading } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosSecure.get('/menu');
            return res.data;
        }
    });

    return [items, loading, refetch];
};

export default useMenu;