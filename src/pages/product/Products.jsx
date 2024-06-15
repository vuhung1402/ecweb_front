import { useLocation, useNavigate, useParams } from "react-router-dom"
import Filter from "../../component/Filter/Filter"
import ProductList from "../../component/ProductList/ProductList"
import React, { useEffect, useState } from "react"
import { endpoint } from "../../api/api"
import { Skeleton } from "antd"

const Products = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const [data, setData] = useState();

    // console.log("location key: ", location?.state?.key)
    // console.log("location value: ", location?.state?.value)
    // console.log("location search: ", location.search)

    useEffect(() => {
        const regex = /[?&]sort_by=([^&]*)/;
        const match = regex.exec(location?.search);
        setData(undefined);
        // console.log("match: ", match)

        fetch(`${endpoint}/product/getAllProductList/${location?.state?.key ? location?.state?.key : 'all'}/${match?.[1].length > 0 ? `${location?.state?.value}` : `1`}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if(json?.success){
                setData(json?.productListAll_DataFormat)
                // console.log("JSON: ", json)
            }

        }).catch((error) => {
            console.error("Error: ", error)
        })
    }, [location.search, location?.state?.key, location?.state?.value])

    //khi moi load trang lan dau thi phai check url co danh muc hay param dang sau khong neu co lay de filter

    //khi nhan vao danh muc
    const onClick = (item) => {
        if(params?.category !== item?.item?.props?.route){
            setData(undefined); 
        }
        //call api
        //api tra du lieu thanh cong set vao state data
        // console.log("item: ", item)
        // console.log("Item key from filter:", item?.item?.props?.route);
        navigate(
            {
                pathname: `/products/${item?.item?.props?.route}`,
            },
            {
                state: {
                    key: item?.key
                }
            }
        )
    }

    //khi chon dieu kien filter
    const handleSelect = (value, option) => {
        //call api filter truyen id danh muc voi option.label
        //api tra thanh cong set lai vao state data
        //navigate(`/products/${location?.state?.key}?sort=${option.label}`)
        //call api lai va set lai data
        // console.log("Option: ", option)
        navigate(
            {
                pathname: `${location?.pathname}`,
                search: `?sort_by=${option?.name}`,
            },
            {
                state: {
                    key: location?.state?.key,
                    value: option?.value
                }
            }
        )
    }

    return (
        <div className=" flex">
            <div className=" w-1/4">
                <Filter onClick={onClick} />
            </div>
            <div className=" flex flex-grow w-full">
                <ProductList handleSelect={handleSelect} data = {data} />
            </div>
        </div>
    )
}

export default Products