import React from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { useEffect, useState } from "react"
import { endpoint } from "../../api/api"
import { useNavigate } from "react-router-dom"

const Cart = () => {

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })


    const user = useUserPackageHook()
    const [cart, setCart] = useState()
    const [totalPrice, setTotalPrice] = useState(0)
    const [productCheckout, setProductCheckOut] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        // fetch(`${endpoint}/carts`, {
        //     method: "GET",
        //     headers: {
        //         'Authorization': `Bearer ${user?.accessToken}`,
        //         'Content-Type': 'application/json',
        //     },
        // }).then((response) => {
        //     if(!response.ok){
        //         throw new Error("Netword response not ok")
        //     }
        //     return response.json()
        // }).then((json) => {
        //     if(json?.success){
        //         setCart(json?.data?.carts)
        //         console.log("json: ", json)
        //     }
        // }).catch((error) => {
        //     console.error("Error: ", error)
        // })
        fetchData()
    },[])

    const minusItem = (cartId, quantity) => {
        const body = {
            quantity: quantity - 1 
        }

        fetch(`${endpoint}/carts/${cartId}/quantity`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if(json?.success){
                fetchData()
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    const plusItem = (cartId, quantity) => {
        const body = {
            quantity: quantity + 1
        }

        fetch(`${endpoint}/carts/${cartId}/quantity`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if(json?.success){
                fetchData()
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    const handleDelete = (cartId) => {
        fetch(`${endpoint}/carts/${cartId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if(json?.success){
                fetchData()
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    const handleChange = (price, product, variation, quantity, event) => {
        if(event.target.checked){
            setTotalPrice(totalPrice + price)
            setProductCheckOut(prev => ([
                ...prev,
                {
                    _id: product?._id,
                    variationId: variation?._id,
                    quantity: quantity
                }
            ]))
        }else{
            setTotalPrice(totalPrice - price)
            setProductCheckOut(prev => (
                prev.filter((item) => item?._id !== product?._id)
            ))
        }
    }

    const handleCheckout = () => {

        const body = {
            products: productCheckout
        }

        fetch(`${endpoint}/orders/checkout`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if(json?.success){
                navigate(`/checkout/${json?.code}`)
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    console.log("Product for check out", productCheckout)

    const fetchData = () => {
        fetch(`${endpoint}/carts`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if(json?.success){
                setCart(json?.data?.carts)
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    return(
        <div className=" px-8 mb-1">
            <div className=" flex flex-col items-center justify-center font-semibold text-5xl gap-2 p-5 border-b-[1px]">
                <div className=" font-semibold text-3xl">Giỏ hàng của bạn</div>
                <div className=" font-normal text-sm">Có 1 sản phẩm trong giỏ hàng của bạn</div>
                <span className="bg-black p-[1.5px] w-14"></span>
            </div>
            <div className=" flex p-4">
                <div className=" w-1/2">
                    <div className="p-1 border-b-[1px] flex justify-between">
                        <div className=" flex items-center">
                            <img className="h-[100px] w-[100px]" src="https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/Shirt%2Faothun_coton_olive.jpg?alt=media&token=0c83e73d-eff4-4b66-a4a3-272ad1d05c66"/>
                            <div className=" ml-3">
                                <a className=" mb-1 hover:text-blue-500" href="#">FEARLESS corduroy daily cap</a>
                                <div className=" mb-1 text-sm font-light">Đen/XL</div>
                                <div className=" flex items-center">
                                    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 font-bold">
                                        +
                                    </button>
                                    <span className=" px-4 bg-[#f5f5f5]">1</span>
                                    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 font-bold">
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col justify-between items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            <div className=" font-semibold">{VND.format(295000)}</div>
                        </div>
                    </div>
                </div>
                <div className=" w-1/2 px-4">
                    <div className=" w-3/4 p-5 border">
                        <h1 className=" border-b-[1px] text-lg font-semibold py-3">Thông tin đơn hàng</h1>
                        <div className=" flex items-center justify-between border-b-[1px] py-3">
                            <p className=" font-bold">Tổng tiền:</p>
                            <p className=" text-red-600 font-semibold">{VND.format(295000)}</p>
                        </div>
                        <div className=" text-sm py-3">
                            Phí vận chuyển sẽ được tính ở trang thanh toán.
                            Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                        </div>
                        <button className=" uppercase bg-red-600 w-full p-3 text-white">Thanh toán</button>
                        <div className=" flex text-sm items-center justify-center gap-1 text-blue-600 py-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                            <a>Tiếp tục mua hàng</a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart