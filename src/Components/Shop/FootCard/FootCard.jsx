import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const FootCard = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
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
                                                <button className="btn btn-outline border-t-0 bg-slate-100 border-orange-500 text-orange-500 border-x-0 border-b-4">Add to Cart</button>
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