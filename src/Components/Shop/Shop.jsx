import { Helmet } from "react-helmet-async";
import Cover from "../Cover/Cover";
import OrderImg from "../../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../Hooks/useMenu";
import FootCard from "./FootCard/FootCard";
import { useParams } from "react-router-dom";

const Shop = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex=categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);

    const [items] = useMenu();
    const drink = items.filter(item => item.category === 'drinks')
    const dessert = items.filter(item => item.category === 'dessert')
    const soup = items.filter(item => item.category === 'soup')
    const salad = items.filter(item => item.category === 'salad')
    const pizza = items.filter(item => item.category === 'pizza')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Shop</title>
            </Helmet>
            <Cover
                img={OrderImg}
                title={`Our Shop`}
                desc={' Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, dolor doloribus! Tempore ea vel id? A nostrum delectus magni'}
            ></Cover>


            <Tabs className={`mt-5`} defaultIndex={tabIndex} onSelect={(index)=>setTabIndex(index)}>
                <TabList style={{display:'flex',justifyContent:'center'}}>
                    <Tab>SALAD</Tab>
                    <Tab>PIZZA</Tab>
                    <Tab>SOUPS</Tab>
                    <Tab>DESSERTS</Tab>
                    <Tab>DRINKS</Tab>
                </TabList>

                <TabPanel>
                            <FootCard items={salad}></FootCard>
                </TabPanel>
                <TabPanel>
                            <FootCard items={pizza}></FootCard>
                </TabPanel>
                <TabPanel>
                            <FootCard items={soup}></FootCard>
                </TabPanel>
                <TabPanel>
                            <FootCard items={dessert}></FootCard>
                </TabPanel>
                <TabPanel>
                            <FootCard items={drink}></FootCard>
                </TabPanel>
            
            </Tabs>

        </div>
    );
};

export default Shop;