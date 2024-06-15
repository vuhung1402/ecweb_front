import React, { useState } from "react"

import { useLocation } from "react-router-dom"
import MyBreadCrumb from "../../component/BreadCrumb"
import ImagePreview from "../../component/ImagePreview"
import InfoProductDetail from "../../component/InfoProductDetail"
import Footer from "../../core/Footer"
import { getDetailProduct } from "./function"


const ProductDetail = () => {
    const [state, setState] = useState({
        data: undefined,

    })
    const location = useLocation()

    const getData = async () => {
        const data = await getDetailProduct(location?.state?.key);
        state.data = data?.product;
        setState((prev) => ({...prev}));
    }

    useState(() => {
        getData();
    }, [])

    return (
        <div className="w-screen h-screen">
            <div className="w-full mb-5">
                <div className="px-[85px] w-full h-[40px] flex items-center bg-[rgb(245,245,245)]">
                    <MyBreadCrumb />
                </div>
                <div className="px-[85px] flex pt-7 w-full">
                    <div className="w-2/3 h-fit">
                        <ImagePreview imageArray={state.data?.array_image} />
                    </div>
                    <div className="flex flex-grow">
                        <InfoProductDetail data={state.data} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetail