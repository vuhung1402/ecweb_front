import { useUserPackageHook } from "../redux/hooks/userHook"
import { useEffect, useState } from "react"
import { endpoint } from "../api"
import { useNavigate } from "react-router-dom"

const Cart = () => {

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
        <div class="h-auto bg-gray-100 pt-2">
            <h1 class="mb-4 text-center text-2xl font-bold">Cart Items</h1>
            <div class="mx-auto max-w-6xl h-auto justify-center px-6 md:flex md:space-x-6 md:relative xl:px-0">
                <div class="h-auto rounded-lg md:w-full">
                    {cart?.map((item) => {
                        return(
                            <>
                                <div className=" bg-white rounded-lg p-4 shadow-md sm:flex sm:justify-start border-b-2">
                                    {item?.shopName}
                                </div>
                                {
                                    item?.products?.map((item) => {
                                        return(
                                            <div class="justify-between mb-5 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                                <input type="checkbox" className="mr-4" onChange={(e) => handleChange(item?.totalPrice, item?.product, item?.variation, item?.quantity, e)}/>
                                                <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" class="w-full rounded-lg sm:w-40" />
                                                <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                    <div class="mt-5 sm:mt-0">
                                                        <h2 class="text-lg font-bold text-gray-900">{item?.product?.name}</h2>
                                                        <p class="mt-1 text-xs text-gray-700">{item?.variation?.name}</p>
                                                    </div>
                                                    <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                        <div class="flex justify-center items-center border-gray-100">
                                                            <button onClick={() => {minusItem(item?.cartId, item?.quantity)}} class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                                                            <input class="h-8 w-8 border bg-white text-center text-xs outline-none"  value={item?.quantity}/>
                                                            <button onClick={() => {plusItem(item?.cartId, item?.quantity)}} class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
                                                        </div>
                                                        <div class="flex items-center space-x-4">
                                                            <p class="text-sm">{item?.totalPrice}</p>
                                                            <button onClick={() => handleDelete(item?.cartId)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        )
                    })}
                </div>
                {/* <!-- Sub total --> */}
                
            </div>  
            <div class="mt-6 h-[150px] rounded-lg border bg-white p-6 shadow-md md:mt-0 md:fixed md:bottom-0 md:w-full">
                    {/* <div class="mb-2 flex justify-between">
                    <p class="text-gray-700">Subtotal</p>
                    <p class="text-gray-700">$129.99</p>
                    </div>
                    <div class="flex justify-between">
                    <p class="text-gray-700">Shipping</p>
                    <p class="text-gray-700">$4.99</p>
                    </div> */}
                    <div class="flex justify-between">
                        <p class="text-lg font-bold">Total</p>
                        <div class="">
                            <p class="mb-1 text-lg font-bold">{totalPrice}</p>
                        </div>
                    </div>
                    <button onClick={handleCheckout} class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
            </div>
        </div>
    )
}

export default Cart