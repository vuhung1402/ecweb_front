import React, { useEffect, useState } from "react";
import { Button } from "antd";
import MotionBox from "@component/MotionBox";
import { fadeIn } from "@utils/animation";

import Header from "@core/Header";
import HomeProduct from "./HomeProduct";
import ShopCategory from "./ShopCategory";
import Sponsor from "./Sponsor";
import Footer from "@core/Footer";
import Loading from "@component/Loading/Loading";

import { getProducts } from "./function";

import HomePageImage from '@images/homepage.png';
import IconArrowDown from '@icon/iconArrowDown.svg';

const Home = () => {

    const [state, setState] = useState({
        products: [],
        position: window.scrollY,
        visible: false,
    });

    const handleGetProducts = async () => {
        const products = await getProducts();
        setState(prev => ({...prev, products: products.productListAll_DataFormat?.slice(0,8)}));
    };

    useEffect(() => {
        handleGetProducts();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            let moving = window.scrollY;
            setState(prev => ({...prev, position: moving, visible: moving < 60 ? false : state.position > moving}));
        };

        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    });

    const handleMobileNavOpenChange = (event) => {
        document.body.style.overflow = event ? 'hidden' : 'auto';
    };

    return (
        <div className="w-screen h-screen">
            {!state.products && (
                <Loading />
            )}
            {state.products && (
                <>
                    <div className="flex top-0 fixed w-full justify-center z-[999]" id="app-header">
                        <Header
                            visible={state.visible}
                            handleMobileNavOpenChange={handleMobileNavOpenChange}
                        />
                    </div>
                    <div
                        className="w-full h-full relative"
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
                    <div className="w-full">
                        <Footer />
                    </div>
                </>
            )}
        </div>
    )
}

export default Home