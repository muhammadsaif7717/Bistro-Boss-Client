import { useEffect, useState } from "react";


const useMenu = () => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                setItems(data)
                setLoading(false)
            });
    }, [])
    return [items, loading];
};

export default useMenu;