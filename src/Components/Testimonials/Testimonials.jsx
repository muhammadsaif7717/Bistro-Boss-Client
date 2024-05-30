import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft } from "react-icons/fa";



const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://bistro-boss-delta.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <section className="my-20">
            <div>
                <SectionTitle
                    subHeading={'--- What Our Clients Say'}
                    heading={'testimonials'}
                ></SectionTitle>
            </div>
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    <div>
                        {
                            reviews.map(review =>
                                <SwiperSlide key={review._id}>
                                    <div className="mx-24 space-y-3 flex items-center justify-center flex-col">
                                        <FaQuoteLeft className="text-5xl" />
                                        <Rating
                                            style={{ maxWidth: 180 }}
                                            value={review.rating}
                                            readOnly
                                            className=""
                                        />
                                        <p>{review.details}</p>
                                        <p className="text-2xl text-orange-500">{review.name}</p>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    </div>
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;