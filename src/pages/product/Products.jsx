import { useLocation, useNavigate, useParams } from "react-router-dom"
import Filter from "../../component/Filter/Filter"
import ProductList from "../../component/ProductList/ProductList"
import { useEffect } from "react"
import { endpoint } from "../../api"

const Products = () => {
    const navigate = useNavigate()
    const location = useLocation()
    
    console.log(location?.state?.key)
    console.log(location.search)

    useEffect(() => {
        const regex = /[?&]sort_by=([^&]*)/;
        const match = regex.exec(location?.search);
        console.log("match: ",match)
        if(location?.state){
            console.log(`${endpoint}/products/get/${location?.state?.key ? location?.state?.key : 'all'}${match?.[1].length > 0 ? `${location?.search}`:``}`)
            //call api va set data
            // fetch(`${endpoint}/users/update_address/${user?.data}/${address?._id}/`, {
            //     method: "POST",
            //     body:JSON.stringify(state?.inforAdress),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // }).then((response) => {
            //     if(!response.ok){
            //         throw new Error("Netword response not ok")
            //     }
            //     return response.json()
            // }).then((json) => {
            //     if(json?.success){
    
            //         window.location.reload()
            //     }
                
            // }).catch((error) => {
            //     console.error("Error: ", error)
            // })
            console.log(location?.state?.key)
        }else{
            //call thang api all va set data
            console.log("all")
        }
    },[location.search, location?.state?.key])

    //khi moi load trang lan dau thi phai check url co danh muc hay param dang sau khong neu co lay de filter

    const dataApiSample = {
        id: "id cua ao so mi",
        category: "ao so mi",
        product: [
            {
                _id: '3812983iuasgdjahgsd',
                name: 'san pham 1',
                price: '200000',
                image: 'https://product.hstatic.net/200000691337/product/thun_olive_61a7b6153efb4aacac99ec880faaa8a2_master.jpg',
                imageHover: 'https://product.hstatic.net/200000691337/product/6_e467b9ee24fe422a8bfa39216b230113_master.jpg',
                color: {
                    '#00ff00': 
                        "https://product.hstatic.net/200000691337/product/32_b09f46222b0e4a8786fea0a937f1447f_master.jpg",
                    
                    '#0000ff': 
                        "https://product.hstatic.net/200000691337/product/1_e643055c59d1406797be0c1de5704121_master.jpg",
                    
                    '#ff0000': 
                        "https://product.hstatic.net/200000691337/product/3_95ca284ab5f24f599b1415b1c28562a8_master.jpg",
                    
                }
            }
        ],
    }

    //khi nhan vao danh muc
    const onClick = (item) => {
        //call api
        //api tra du lieu thanh cong set vao state data
        console.log("Item key from filter:", item?.item?.props?.route);
        //navigate(`/products/${item?.item?.props?.route}`)
    }

    //khi chon dieu kien filter
    const handleSelect = (value, option) => {
        //call api filter truyen id danh muc voi option.label
        //api tra thanh cong set lai vao state data
        //navigate(`/products/${location?.state?.key}?sort=${option.label}`)
        //call api lai va set lai data
        navigate(
            {
                pathname: `${location?.pathname}`,
                search: `?sort_by=${option?.label}`,
            },
            {
                state: {
                    key: location?.state?.key
                }
            }
        )
    }

    return(
        <div className=" flex">
            <div className=" w-1/4">
                <Filter onClick = {onClick} />
            </div>
            <div className=" flex flex-grow w-full">
                <ProductList handleSelect={handleSelect}/>
            </div>
        </div>
    )
}

export default Products