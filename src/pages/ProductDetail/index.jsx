import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import ProductDetailContainer from "./ProductDetailContainer";
import { ImagePreviewWrapper, InfoProductWrapper, ProductDetailWrapper } from "./ProductDetail";
import InfoProductDetail from "../../_components/ProductDetail/InfoProductDetail";
import Footer from "../../core/Footer";

import { useGetDetailProduct } from "./function"
import ProductDetailContextProvider from "@_components/ProductDetail_v2/context";
import Breadcrumb from "@_components/ProductDetail_v2/_components/Breadcrumb";
import ImagePreviewHandler from "@_components/ProductDetail_v2/_widgets/ImagePreviewHandler";
import SpecialOffer from "@_components/ProductDetail_v2/_components/SpecialOffer";
import ProductDetailTab from "@_components/ProductDetail_v2/_components/ProductDetailTab";
import RelatedProducts from "@_components/ProductDetail_v2/_components/RelatedProducts";

const ProductDetail = () => {
    const [state, setState] = useState({
        data: undefined,
        isLoadingPage: true,
        currentImg: '',
    });

    const location = useLocation();
    const params = useParams();

    const { isLoading, data } = useGetDetailProduct(location?.state?.key ? location?.state?.key : params?.name);

    const handleGotoImage = (uid) => {
        setState(prev => ({...prev, currentImg: uid}));
    };

    console.log({ product: data?.product });

    return (
        <ProductDetailContextProvider product={data?.product}>
            <ProductDetailContainer isLoading={isLoading}>
                <ProductDetailWrapper>
                    <Breadcrumb />
                </ProductDetailWrapper>

                <ProductDetailWrapper>
                    <ImagePreviewWrapper>
                        <ImagePreviewHandler />
                    </ImagePreviewWrapper>
                    <InfoProductWrapper>
                        <InfoProductDetail
                            data={data?.product}
                            handleGotoImage={handleGotoImage}
                        />

                        <SpecialOffer />
                    </InfoProductWrapper>
                </ProductDetailWrapper>

                <ProductDetailWrapper>
                    <ProductDetailTab />
                </ProductDetailWrapper>

                <ProductDetailWrapper>
                    <RelatedProducts />
                </ProductDetailWrapper>

                <Footer />
            </ProductDetailContainer>
        </ProductDetailContextProvider>
    )
}

export default ProductDetail