import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ProductDetailContainer from "./ProductDetailContainer";
import { ImagePreviewWrapper, InfoProductWrapper, ProductDetailWrapper } from "./ProductDetail";
import ImagePreview from "../../_components/ProductDetail/ImagePreview";
import InfoProductDetail from "../../_components/ProductDetail/InfoProductDetail";
import Footer from "../../core/Footer";

import { useGetDetailProduct } from "./function"

const ProductDetail = () => {
    const [state, setState] = useState({
        data: undefined,
        isLoadingPage: true,
        currentImg: '',
    });

    const location = useLocation();

    const { isLoading, data } = useGetDetailProduct(location?.state?.key);

    const handleGotoImage = (uid) => {
        setState(prev => ({...prev, currentImg: uid}));
    };

    return (
        <ProductDetailContainer isLoading={isLoading}>
            <ProductDetailWrapper>
                <ImagePreviewWrapper>
                    <ImagePreview
                        imageArray={data?.product?.array_image}
                        currentImg={state.currentImg}
                    />
                </ImagePreviewWrapper>
                <InfoProductWrapper>
                    <InfoProductDetail
                        data={data?.product}
                        isLoading={isLoading}
                        handleGotoImage={handleGotoImage}
                    />
                </InfoProductWrapper>
            </ProductDetailWrapper>
            <Footer />
        </ProductDetailContainer>
    )
}

export default ProductDetail