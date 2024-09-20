import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HomeContainer from "./HomeContainer";
import { HomeHeader, HomeBackground, HomePart } from "./Home";
import HomeBG from "./HomeBG";
import Header from "@core/Header";
import HomeProduct from "./HomeProduct";
import ShopCategory from "./ShopCategory";
import Sponsor from "./Sponsor";
import Footer from "@core/Footer";

import { getProducts } from "./function";

const HEADER_ID = 'app-header'
const HOME_PRODUCT_ID = 'home-product'

const Home = () => {
    const navigate = useNavigate();
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

    const handleScrollToProduct = () => {
        const homeProductElement = document.getElementById('home-product');
        if (homeProductElement) {
            homeProductElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCLick = () => {
        navigate("/products/all")
    }

    return (
        <HomeContainer isLoading={state.products?.length === 0}>
            <>
                <HomeHeader id={HEADER_ID}>
                    <Header
                        visible={state.visible}
                        handleMobileNavOpenChange={handleMobileNavOpenChange}
                    />
                </HomeHeader>
                <HomeBackground>
                    <HomeBG
                        handleCLick={handleCLick}
                        handleScrollToProduct={handleScrollToProduct}
                    />
                </HomeBackground>
                <HomePart id={HOME_PRODUCT_ID}>
                    <HomeProduct
                        products={state.products}
                        handleCLick={handleCLick}
                    />
                </HomePart>
                <HomePart>
                    <ShopCategory />
                </HomePart>
                <HomePart>
                    <Sponsor />
                </HomePart>
                <HomePart>
                    <Footer />
                </HomePart>
            </>
        </HomeContainer>
    )
}

export default Home