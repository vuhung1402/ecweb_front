import React, { useState } from "react"

import { useLocation } from "react-router-dom"
import MyBreadCrumb from "../../component/BreadCrumb"
import ImagePreview from "../../component/ImagePreview"
import InfoProductDetail from "../../component/InfoProductDetail"
import Footer from "../../core/Footer"
import { getDetailProduct } from "./function"
import Loading from "@component/Loading/Loading"


const ProductDetail = () => {
    const [state, setState] = useState({
        data: undefined,
        isLoadingPage: false,

    })
    const location = useLocation()

    const getData = async () => {
        setState((prev) => ({
            ...prev,
            isLoadingPage: true,
        }))
        const data = await getDetailProduct(location?.state?.key);
        if (data?.success) {
            setState((prev) => ({
                ...prev,
                isLoadingPage: false,
                data: data?.product
            }))
        }
    }

    const breadCrumb = [
        {
            label: "Trang chủ",
            route: "/",
            key:"",

        },
        {
            label: "Áo sơ mi",
            route: "xem-tat-ca-ao-so-mi",
            key: "idcategory",
        },
        {
            label: "FEARLESS F Logo shirt",
            route: "",
            key: "",
        },
    ]

    useState(() => {
        getData();
    }, [])

    return (
        <div className="w-full h-full">
            <div className="w-full mb-5">
                {/* <div className="px-[85px] w-full h-[40px] flex items-center bg-[rgb(245,245,245)]">
                    <MyBreadCrumb />
                </div> */}
                {
                    state.isLoadingPage ?
                        (
                            <div className="w-full h-full pt-6">
                                <Loading />
                            </div>
                        ) :
                        (
                            <div className="px-[85px] flex pt-7 w-full">
                                <div className="w-2/3 min-w-[67%] h-fit">
                                    <ImagePreview imageArray={state.data?.array_image} />
                                </div>
                                <div className="flex flex-grow">
                                    <InfoProductDetail data={state.data} />
                                </div>
                            </div>
                        )
                }
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetail