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
import { useUserPackageHook } from "@redux/hooks/userHook";
import { useGetRecommendProducts } from "@utils/function";

const HEADER_ID = 'app-header'
const HOME_PRODUCT_ID = 'home-product'

const Home = () => {
    const navigate = useNavigate();
    const user = useUserPackageHook();
    const { isLoading, data } = useGetProducts();
    const { isLoading: isGetRecommend, data: dataRecommend  } = useGetRecommendProducts(user?.id);
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
        <HomeContainer isLoading={isLoading} isGetRecommend={isGetRecommend}>
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
                        products={dataRecommend?.productListAll_DataFormat}
                        handleCLick={handleCLick}
                    />
                </HomePart>
                {/* <HomePart>
                    <ShopCategory />
                </HomePart> */}
                {/* <HomePart>
                    <Sponsor />
                </HomePart> */}
                <HomePart>
                    <Footer />
                </HomePart>
                <df-messenger intent="WELCOME" chat-title="EcwebBot" agent-id="915d1e00-467b-4b47-891b-014f7044893f"
                    language-code="vi"></df-messenger>
            </>
        </HomeContainer>
    )
}

export default Home