import SectionTitle from "../SectionTitle/SectionTitle";
import FeaturedImg from '../../assets/home/featured.jpg'
import './FeaturedItem.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white  p-5 md:p-14">
            <SectionTitle
                subHeading={'--- Check it Out ---'}
                heading={'Featured Items'}
            ></SectionTitle>
            <div className="flex flex-col md:flex-row justify-center items-center  md:mt-14 gap-6 bg-slate-500 bg-opacity-75 p-2">
                <div>
                    <img src={FeaturedImg} />
                </div>
                <div>
                    <p>30 May, 2024</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, consequuntur veniam iure fuga itaque possimus nesciunt pariatur totam ea quo rerum. Maiores alias tempore non officiis rem impedit ut! Natus ex deleniti porro eius officia ipsum quos. Culpa ex, quibusdam a assumenda debitis error, dolores ut iste quaerat laboriosam atque?</p>
                    <button className="btn btn-outline border-0 border-b-4 text-white">Order Now </button>
                </div>
            </div>
        </div>
    );
};

export default Featured;