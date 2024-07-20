import React, { useEffect, useState } from "react";
import { Button } from "antd";
import MotionBox from "@component/MotionBox";
import { fadeIn } from "@utils/animation";

import HomeProduct from "./HomeProduct";
import ShopCategory from "./ShopCategory";
import Sponsor from "./Sponsor";

import { getProducts } from "./function";

import HomePageImage from '@images/homepage.png';
import IconArrowDown from '@icon/iconArrowDown.svg';

const Home = () => {

    const [state, setState] = useState({
        products: [],
    });

    const handleGetProducts = async () => {
        const products = await getProducts();
        setState(prev => ({...prev, products: products.productListAll_DataFormat?.slice(0,8)}));
    };

    useEffect(() => {
        const header = document.getElementById('app-header');
        handleGetProducts();

        if (header) header.style.display = 'none';

        const handleScroll = () => {
            if (window.scrollY >= window.innerHeight - 300) {
                if (header) header.style.display = 'block';
            } else {
                if (header) header.style.display = 'none';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="w-full">
            <div
                className="w-full h-screen relative"
                style={{
                    backgroundImage: `url(${HomePageImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    className="uppercase text-[42px] font-bold absolute top-0 left-0 w-full h-full p-8 flex flex-col items-center justify-end"
                >
                    <MotionBox animation={fadeIn(0.5)}>
                        <p className="text-white text-center">new collection out now!</p>
                    </MotionBox>
                    <MotionBox animation={fadeIn(1)}>
                        <Button className="uppercase font-bold mt-8 !px-[30px] !py-[20px] flex items-center text-[15px]">
                            shop now
                        </Button>
                    </MotionBox>
                    <MotionBox animation={fadeIn(1.5)}>
                        <IconArrowDown className="mt-[60px] text-white"/>
                    </MotionBox>
                </div>
            </div>
            <div className="w-full">
                <HomeProduct
                    products={state.products}
                />
            </div>
            <div className="w-full">
                <ShopCategory />
            </div>
            <div className="w-full">
                <Sponsor />
            </div>
        </div>
    )
}

export default Home