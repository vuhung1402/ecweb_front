import { useEffect, useState } from "react"
import { useUserPackageHook } from "../redux/hooks/userHook"
import { endpoint } from "../api"
import SelectAddress from "./SelectAddress"
import SuccessAlert from "./SuccesAlert"
import UnsuccessAlert from "./UnsuccessAlert"

const Order = ({data}) => {

    const user = useUserPackageHook()

    const [selectAddress, setSelectAddress] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [unsuccessAlert, setUnsuccessAlert] = useState(false)

    const [addressShipping, setAddressShipping] = useState({
        city: "TP Hồ Chí Minh",
        detail: "228 Đường số 6",
        district: "TP Thủ Đức",
        name: "Đỗ Vũ Hưng",
        phone: "0353592822",
        ward: "Phường Linh Chiểu",
        _id: "653f37df67b68d676ec50a66",
    })

    const handleOrder = () =>{
        const body = {
            addressId: addressShipping?._id,
            orders: data?.orders
        }

        fetch(`${endpoint}/orders/me`, {
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
                console.log("json: ", json)
                setSuccessAlert(true)
                setTimeout(() => {
                    setSuccessAlert(false)
                },3000)
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
        <div class="h-auto bg-gray-100 pt-2">
            { successAlert && <SuccessAlert/>}
            { unsuccessAlert && <UnsuccessAlert/>}
            { selectAddress && <SelectAddress addressShipping = {addressShipping} setAddressShipping = {setAddressShipping} setSelectAddress = {setSelectAddress} />}
            <div class="mx-auto max-w-5xl h-auto justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div class="h-auto rounded-lg md:w-full">
                    {
                        data?.orders?.map((order) => {
                            return(
                                <>
                                    <div className=" bg-white rounded-lg p-4 shadow-md sm:flex sm:justify-start border-b-2">
                                        {order?.shop?.name}
                                    </div>
                                    {
                                        order?.products?.map((product) => {
                                        return(
                                            <div class="justify-between mb-5 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                                <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" class="w-full rounded-lg sm:w-40" />
                                                <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                    <div class="mt-5 sm:mt-0">
                                                        <h2 class="text-lg font-bold text-gray-900">{product?.name}</h2>
                                                        <p class="mt-1 text-xs text-gray-700">{product?.variation?.name}</p>
                                                    </div>
                                                    <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                        <div class="flex items-center">
                                                            <span class="cursor-pointer rounded-l py-1 px-3.5 duration-100"> SL: {product?.quantity} </span>
                                                        </div>
                                                        <div class="flex items-center space-x-4">
                                                            <p class="text-sm"> Gia: {product?.variation?.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            )
                        })
                    }
                </div>
                {/* <!-- Sub total --> */}
                
            </div>
            <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-full">
                <div class="mb-2 flex justify-between">
                    <p class="text-gray-700">Address</p>
                    <div className="flex">
                        <div>{addressShipping?.detail}, {addressShipping?.ward}, {addressShipping?.district}, {addressShipping?.city}</div>
                        <div onClick={() => setSelectAddress(!selectAddress)} className=" text-blue-500 cursor-pointer ml-2">Thay đổi</div>
                    </div>
                </div>
                <div class="mb-2 flex justify-between">
                    <p class="text-gray-700">Subtotal</p>
                    <p class="text-gray-700">{data?.total}</p>
                </div>
                <div class="flex justify-between">
                    <p class="text-gray-700">Shipping</p>
                    <p class="text-gray-700">$4.99</p>
                </div>
                <hr class="my-4" />
                <div class="flex justify-between">
                    <p class="text-lg font-bold">Total</p>
                    <div class="">
                        <p class="mb-1 text-lg font-bold">{data?.total}</p>
                    </div>
                </div>
                <button onClick={handleOrder} class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Order</button>
            </div>
        </div>
    )
}

export default Order