import SectionTitle from "../SectionTitle/SectionTitle";
import MenuItem from "../../Components/MenuItem/MenuItem";
import useMenu from "../../Hooks/useMenu";


const PopularMenue = () => {
    const [items] = useMenu();
    const popularItems = items.filter(item => item?.category === 'popular')

    return (
        <section className="mb-20">
            <SectionTitle
                subHeading={'--- Check it Out ---'}
                heading={'From Our Menue'}
            ></SectionTitle>

            <div className="gap-8 grid md:grid-cols-2">
                {
                    popularItems?.map(item =>
                        <MenuItem
                            key={item._id}
                            item={item}
                        ></MenuItem>
                    )
                }
            </div>
            <div className="flex justify-center">
                <button className="btn mt-5">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenue;