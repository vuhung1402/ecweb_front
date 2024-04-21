import { useEffect, useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint, status } from "../../api"
import SuccessAlert from "../../component/SuccesAlert"
import UnsuccessAlert from "../../component/UnsuccessAlert"

const OrderListAdmin = ({api}) => {
    const user = useUserPackageHook()

    const [orders, setOrders] = useState()
    const [successAlert, setSuccessAlert] = useState(false)
    const [unsuccessAlert, setUnsuccessAlert] = useState(false)

    useEffect(() => {
        fetch(`${endpoint}${api}`, {
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
                setOrders(json?.data?.orders)
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }, [])

    const handleConfirm = (orderId) => {

        const body = {
            status: "to-receive"
        }

        fetch(`${endpoint}/orders/${orderId}/status`, {
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
                setSuccessAlert(true)
                setTimeout(() => {
                    setSuccessAlert(false)
                },3000)
                console.log("json: ", json)
            }
        }).catch((error) => {
            setUnsuccessAlert(true)
            setTimeout(() => {
                setUnsuccessAlert(false)
            },3000)
            console.error("Error: ", error)
        })
    }

    const handleCompleted = (orderId) => {
        const body = {
            status: "completed"
        }

        fetch(`${endpoint}/orders/${orderId}/status`, {
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
                setSuccessAlert(true)
                setTimeout(() => {
                    setSuccessAlert(false)
                },3000)
                console.log("json: ", json)
            }
        }).catch((error) => {
            setUnsuccessAlert(true)
            setTimeout(() => {
                setUnsuccessAlert(false)
            },3000)
            console.error("Error: ", error)
        })
    }

    return(
        <div>
            { successAlert && <SuccessAlert/>}
            { unsuccessAlert && <UnsuccessAlert/>}
            <div className="h-auto bg-[#e5e7eb]">
                {   orders?.length === 0 ? <div className=" bg-white text-center mt-3 font-bold">Hiện tại không có đơn hàng nào</div> :
                    orders?.map((order) => {
                        return(
                            <div className="h-auto border p-2 bg-white mb-5">
                                <div className="flex justify-between border-b-2 pb-1">
                                    <div> {order?.address?.name} | {order?.orderNumber}</div>
                                    <div>{status[order?.status]}</div>
                                </div>
                                {   
                                    order?.products?.map((product) => {
                                        return(
                                            <>
                                                <div className="justify-between p-3 sm:flex sm:justify-start border-b-2">
                                                    <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" class="w-full rounded-lg sm:w-40" />
                                                    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                        <div className="mt-5 sm:mt-0">
                                                            <h2 className="text-lg font-bold text-gray-900">{product?.name}</h2>
                                                            <p className="mt-1 text-xs text-gray-700">{product?.variation?.name}</p>
                                                        </div>
                                                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                            <div className="flex items-center">
                                                                <span className="rounded-l py-1 px-3.5 duration-100"> SL: {product?.quantity} </span>
                                                            </div>
                                                            <div className="flex items-center space-x-4">
                                                                <p className="text-sm"> Gia: {product?.variation?.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    (order?.status === "to-ship") &&
                                                    (
                                                        <div className="mt-2 flex flex-row-reverse">
                                                            <button onClick={() => handleConfirm(order?._id)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
                                                        </div>
                                                    )
                                                }

                                                {
                                                    (order?.status === "to-receive") &&
                                                    (
                                                        <div className="mt-2 flex flex-row-reverse">
                                                            <button onClick={() => handleCompleted(order?._id)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đã giao hàng</button>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        )
                                    })
                                }
                                <div className="flex flex-row-reverse p-5 font-semibold text-xl">
                                    Total price: {order?.totalPrice}
                                </div>
                            </div>
                        )
                        
                    })
                }
            </div>
        </div>
    )
}

export default OrderListAdmin