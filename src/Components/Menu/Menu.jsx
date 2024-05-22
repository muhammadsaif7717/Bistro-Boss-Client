import { Helmet } from "react-helmet-async";
import Cover from "../Cover/Cover";
import MenuCaegory from "../MenuCaegory/MenuCaegory";
import useMenu from "../../Hooks/useMenu";
import MenuItemsCover from "../MenuItemsCover/MenuItemsCover";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
// images
import MenuImg from "../../assets/menu/banner3.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";




const Menu = () => {
    const [items] = useMenu();
    const offered = items.filter(item => item.category === 'offered')
    const dessert = items.filter(item => item.category === 'dessert')
    const soup = items.filter(item => item.category === 'soup')
    const salad = items.filter(item => item.category === 'salad')
    const pizza = items.filter(item => item.category === 'pizza')

    return (
        <div className="">
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover
                img={MenuImg}
                title={`Our Menue`}
                desc={' Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, dolor doloribus! Tempore ea vel id? A nostrum delectus magni'}
            ></Cover>

            {/* todays offer */}
            <SectionTitle
                subHeading={`--- Dont't miss ---`}
                heading={`today's offer`}
            ></SectionTitle>
            <MenuCaegory items={offered}></MenuCaegory>



            <div className="my-16 space-y-16">
                {/* Desserts */}
                <MenuItemsCover img={dessertImg}  desc={`try our desserts`}></MenuItemsCover>
                <MenuCaegory items={dessert} category={'dessert'}></MenuCaegory>

                {/* soup */}
                <MenuItemsCover img={soupImg} title={`soups`} desc={`try our soups`}></MenuItemsCover>
                <MenuCaegory items={soup} category={'soup'}></MenuCaegory>

                {/* salad */}
                <MenuItemsCover img={saladImg} title={`salads`} desc={`try our salads`}></MenuItemsCover>
                <MenuCaegory items={salad} category={'salad'}></MenuCaegory>

                {/* pizza */}
                <MenuItemsCover img={pizzaImg} title={`pizzas`} desc={`try our pizzas`}></MenuItemsCover>
                <MenuCaegory items={pizza} category={'pizza'}></MenuCaegory>
            </div>



        </div>
    );
};

export default Menu;