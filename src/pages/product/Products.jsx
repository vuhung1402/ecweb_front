import React, { useEffect, useState } from "react"

import { useLocation, useNavigate, useParams } from "react-router-dom"
import Filter from "../../component/Filter/Filter"
import ProductList from "../../component/ProductList/ProductList"
import { getCategories, getProducts } from "./function"

const Products = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    const [state, setState] = useState({
        data: [],
        isLoadingPage: true,
        category: [],
    });

    const handleGetProduct = async () => {
        const regex = /[?&]sort_by=([^&]*)/;
        const match = regex.exec(location?.search);
        const key = location?.state?.key ? location?.state?.key : 'all';
        const modeFilter = match?.[1].length > 0 ? `${location?.state?.value}` : `1`;

        const res = await getProducts(key, modeFilter);
        if (res?.success) {
            setState(prev => ({...prev, data: res?.productListAll_DataFormat, isLoadingPage: false}));
        };
    };

    // get categories
    useEffect(() => {
        async function handleGetCategories() {
            const res = await getCategories();
            if (res?.success) {
                setState(prev => ({...prev, category: res?.formattedData}));
            };
        };

        handleGetCategories();
    },[]);

    // get products
    useEffect(() => {
        handleGetProduct();
    }, [location.search, location?.state?.key, location?.state?.value])

    //khi moi load trang lan dau thi phai check url co danh muc hay param dang sau khong neu co lay de filter

    //khi nhan vao danh muc
    const onClick = (item) => {
        if (params?.category !== item?.item?.props?.route) {
            // setData(undefined); 
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
    };

    return (
        <div className="flex flex-col lg:flex-row h-full">
            <div className="w-full lg:w-1/4">
                <Filter
                    category={state.category}
                    onClick={onClick}
                />
            </div>
            <div className="flex flex-grow w-full overflow-y-auto">
                <ProductList
                    handleSelect={handleSelect}
                    data={state.data}
                    isLoadingPage={state.isLoadingPage}
                />
            </div>
        </div>
    )
}

export default Products