import React from "react";
import { useNavigate } from "react-router-dom";

import HomeContainer from "./HomeContainer";
import { HomeHeader, HomeBackground, HomePart } from "./Home";
import HomeBG from "./HomeBG";
import Header from "@core/Header";
import HomeProduct from "./HomeProduct";
import ShopCategory from "./ShopCategory";
import Sponsor from "./Sponsor";
import Footer from "@core/Footer";

import useVisibleHeader from "@hooks/useVisibleHeader";
import { useGetProducts } from "@api/Home";
import { navigatePath } from "@constants/index";

const HEADER_ID = 'app-header'
const HOME_PRODUCT_ID = 'home-product'

const Home = () => {
    const navigate = useNavigate();

    const { isLoading, data } = useGetProducts();
    const { visible } = useVisibleHeader();

    const handleScrollToProduct = () => {
        const homeProductElement = document.getElementById(HOME_PRODUCT_ID);
        if (homeProductElement) {
            homeProductElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCLick = () => {
        navigate(navigatePath.PRODUCT_ALL)
    }

    return (
        <HomeContainer isLoading={isLoading}>
            <>
                <HomeHeader id={HEADER_ID}>
                    <Header
                        visible={visible}
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
                        products={data?.productListAll_DataFormat?.slice(0,8)}
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