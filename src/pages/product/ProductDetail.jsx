import { useLocation } from "react-router-dom"
import MyBreadCrumb from "../../component/BreadCrumb"
import ImagePreview from "../../component/ImagePreview"
import InfoProductDetail from "../../component/InfoProductDetail"
import Footer from "../../core/Footer"
import React, { useEffect, useState } from "react"
import { endpoint } from "../../api"


const ProductDetail = () => {

    const location = useLocation()
    // const [data, setData] = useState({})

    // useEffect(() => {
    //     fetch(`${endpoint}/product/getProductDetail/${location?.state?.key}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Netword response not ok")
    //         }
    //         return response.json()
    //     }).then((json) => {
    //         if (json?.success) {
    //             setData(json?.product)
    //         }

    //     }).catch((error) => {
    //         console.error("Error: ", error)
    //     })
    // }, [])

    const data = {
        "_id": {
            "$oid": "662cad202d46e6ea1c9c5ba7"
        },
        "name": "FEARLESS Apple baby tee",
        "price": 330000,
        "total_number": 5,
        "array_color": [
            {
                "name_color": "red",
                "code_color": "#FF0000",
                "total_number_with_color": 4,
                "image": "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faopolo%2FFEARLESS%20ringer%20polo%2Fz5366319186598_87e9f35b0c0e65b2ef354031594b8f57.jpg?alt=media&token=4fbf276e-e902-4cd6-802d-7f97ea96135c",
                "array_sizes": [
                    {
                        "name_size": "XL",
                        "total_number_with_size": 0
                    },
                    {
                        "name_size": "L",
                        "total_number_with_size": 1
                    },
                    {
                        "name_size": "M",
                        "total_number_with_size": 1
                    },
                    {
                        "name_size": "S",
                        "total_number_with_size": 1
                    }
                ]
            },
            {
                "name_color": "Black",
                "code_color": "#000000",
                "total_number_with_color": 4,
                "image": "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faopolo%2FFEARLESS%20ringer%20polo%2Fz5366321941639_904df69be0c4e2270f0e44cc618a6d00.jpg?alt=media&token=cb2e5425-c4fb-4479-8c91-fae8026efc9e",
                "array_sizes": [
                    {
                        "name_size": "XL",
                        "total_number_with_size": 1
                    },
                    {
                        "name_size": "L",
                        "total_number_with_size": 1
                    },
                    {
                        "name_size": "M",
                        "total_number_with_size": 1
                    },
                    // {
                    //     "name_size": "S",
                    //     "total_number_with_size": 1
                    // }
                ]
            }
        ],
        "array_image": [
            "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faopolo%2FFEARLESS%20ringer%20polo%2Fz5366321941639_904df69be0c4e2270f0e44cc618a6d00.jpg?alt=media&token=cb2e5425-c4fb-4479-8c91-fae8026efc9e",
            "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faopolo%2FFEARLESS%20ringer%20polo%2Fz5366319186598_87e9f35b0c0e65b2ef354031594b8f57.jpg?alt=media&token=4fbf276e-e902-4cd6-802d-7f97ea96135c",
            "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faopolo%2FFEARLESS%20ringer%20polo%2Fz5366322731711_3bed94045f4d704b6f894e7a4449ebf3.jpg?alt=media&token=9ec8cbb6-0cf0-403d-a811-de8c1d5be814"
        ],
        "primary_image": "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faothun%2FFEARLESS%20Apple%20baby%20tee%2Fz5366256165971_4721defa138815d96779a43acc9378d8.jpg?alt=media&token=65e03673-bf59-4968-8105-2f4754f3bf42",
        "image_hover": "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faothun%2FFEARLESS%20Apple%20baby%20tee%2Fz5366287362190_86bafcf2c843af471732c2e8e9677bde.jpg?alt=media&token=a0a5e473-7058-4011-90c3-93a2aa9a4948",
        "category_id": "a",
        "sub_category_id": "1",
        "product_id": "10"
    }

    return (
        <div className="">
            <div className="">
                <div className=" px-[85px] w-full h-[40px] flex items-center bg-[rgb(245,245,245)]">
                    <MyBreadCrumb />
                </div>
                <div className=" px-[85px] flex pt-7">
                    <div className=" w-2/3 h-fit">
                        <ImagePreview imageArray={data?.array_image} />
                    </div>
                    <div className=" flex flex-grow">
                        <InfoProductDetail data={data} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetail