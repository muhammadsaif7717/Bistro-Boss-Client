import { Helmet } from "react-helmet-async";
import Featured from "../Featured/Featured";
import PopularMenue from "../PopularMenue/PopularMenue";
import Testimonials from "../Testimonials/Testimonials";
import Banner from "./Banner";
import Slider from "./Slider";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Slider></Slider>
            <PopularMenue></PopularMenue>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;