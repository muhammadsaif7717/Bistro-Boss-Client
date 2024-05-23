import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecret from '../../../Hooks/useAxiosSecret';
import useCart from '../../../Hooks/useCart';



const FootCard = ({ items }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecret();
    const [,refetch] = useCart();

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    const handleAddToCart = (item) => {
        // if user exist
        if (user && user.email) {
            const cartItem = {
                menuId: item._id,
                email: user.email,
                name: item.name,
                image: item.image,
                price: item.price,
            }
            //post to database
            axiosSecure.post(`/carts`, cartItem)
                .then((res) => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: ` ${item.name} Added to Your Cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        // refetch to update the cart items count
                        refetch();
                    }
                })
                .catch(err => console.log(err.message))
        }
        else {
            Swal.fire({
                title: "You are not Logged In!",
                text: "Please login to add to the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Log In!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send the user to login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }

    }

    return (
        <div className="my-20">

            <>
                <Swiper
                    pagination={pagination}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
                            {
                                items?.map(item =>
                                    <div className="card rounded-none card-compact w-full bg-base-100 shadow-xl" key={item._id}>
                                        <div className="relative">
                                            <img src={item.image} className="w-full" />
                                            <h2 className="card-title absolute top-5 right-[10%] bg-black text-white px-2 py-1">${item.price}</h2>
                                        </div>
                                        <div className="card-body">
                                            <h2 className="card-title justify-center">{item.name}</h2>
                                            <p>{item.recipe}</p>
                                            <div className="card-actions justify-center">
                                                <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-t-0 bg-slate-100 border-orange-500 text-orange-500 border-x-0 border-b-4">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </SwiperSlide>
                </Swiper>
            </>
        </div>

    );
};

export default FootCard;