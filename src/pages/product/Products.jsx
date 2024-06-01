import { useLocation, useNavigate, useParams } from "react-router-dom"
import Filter from "../../component/Filter/Filter"
import ProductList from "../../component/ProductList/ProductList"
import React, { useEffect, useState } from "react"
import { endpoint } from "../../api/api"

const Products = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState([])

    console.log("location key: ", location?.state?.key)
    console.log("location value: ", location?.state?.value)
    console.log("location search: ", location.search)

    useEffect(() => {
        const regex = /[?&]sort_by=([^&]*)/;
        const match = regex.exec(location?.search);
        console.log("match: ", match)

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
                console.log("JSON: ", json)
            }

        }).catch((error) => {
            console.error("Error: ", error)
        })
    }, [location.search, location?.state?.key, location?.state?.value])

    //khi moi load trang lan dau thi phai check url co danh muc hay param dang sau khong neu co lay de filter

    const dataApiSample = {
        product: [
            {
                _id: '3812983iuasgdjahgsd',
                name: 'san pham 1',
                price: '200000',
                image: 'https://product.hstatic.net/200000691337/product/thun_olive_61a7b6153efb4aacac99ec880faaa8a2_master.jpg',
                imageHover: 'https://product.hstatic.net/200000691337/product/6_e467b9ee24fe422a8bfa39216b230113_master.jpg',
                color: [
                    {
                        "name_color": "red",
                        "code_color": "#00ff00",
                        "image": "https://product.hstatic.net/200000691337/product/32_b09f46222b0e4a8786fea0a937f1447f_master.jpg",
                    },
                    {
                        "name_color": "red",
                        "code_color": "#0000ff",
                        "image": "https://product.hstatic.net/200000691337/product/1_e643055c59d1406797be0c1de5704121_master.jpg",
                    },
                    {
                        "name_color": "red",
                        "code_color": "#ff0000",
                        "image": "https://product.hstatic.net/200000691337/product/3_95ca284ab5f24f599b1415b1c28562a8_master.jpg",
                    }
                ]
            }
        ],
    }

    //khi nhan vao danh muc
    const onClick = (item) => {
        //call api
        //api tra du lieu thanh cong set vao state data
        console.log("item: ", item)
        console.log("Item key from filter:", item?.item?.props?.route);
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
        console.log("Option: ", option)
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