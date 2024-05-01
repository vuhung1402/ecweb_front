import { useParams } from "react-router-dom"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api"
import React, { useEffect, useState } from "react"

const CheckOut = () => {

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })

    const {code} = useParams()

    const user = useUserPackageHook()

    const [data, setData] = useState()

    useEffect(() => {
        fetch(`${endpoint}/orders/checkout?code=${code}`, {
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
                setData(json?.data)
                console.log("json: ", json?.data)
            }
            // console.log("json: ", json)
        }).catch((error) => {
            console.error("Error: ", error)
        })
    },[])

    return(
        <div className=" flex">
            {/* <Order data = {data} /> */}
            <div className=" w-3/4 p-5 border-r-[1px]">
                <div className=" mb-5">
                    <h1 className=" text-lg py-4">Phương thức vận chuyển</h1>
                    <div className="">
                        <div class="flex items-center justify-between p-4 border rounded-sm">
                            <div className=" flex items-center gap-2">
                                <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Giao hàng tận nơi</label>
                            </div>
                            <div>17,000đ</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className=" text-lg py-4">Phương thức thanh toán</h1>
                    <div>
                        <div class="flex items-center p-4 border rounded-sm">
                            <input id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Thanh toán khi giao hàng</label>
                        </div>
                        <div class="flex items-center p-4 border rounded-sm">
                            <input id="default-radio-3" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="default-radio-3" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Chuyển khoản qua ngân hàng</label>
                        </div>
                    </div>
                </div>

                <div className=" flex items-center justify-between py-6">
                    <a className=" text-blue-600">Giỏ hàng</a>
                    <button className=" uppercase bg-blue-600 p-3 text-white">Hoàn tất đơn hàng</button>
                </div>
            </div>
            
            <div className=" w-2/4 bg-[#fafafa] p-3">
                <div className="p-1 border-b-[1px] flex justify-between">
                    <div className=" flex items-center">
                        <img className="h-[64px] w-[64px] border" src="https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/Shirt%2Faothun_coton_olive.jpg?alt=media&token=0c83e73d-eff4-4b66-a4a3-272ad1d05c66"/>
                        <div className=" ml-3">
                            <a className=" mb-1 hover:text-blue-500" href="#">FEARLESS corduroy daily cap</a>
                            <div className=" mb-1 text-sm font-light">Đen/XL</div>
                            <span className=" border px-1 bg-[#f5f5f5]">1</span>
                        </div>
                    </div>
                    <div className=" flex flex-col justify-center items-center">
                        <div>{VND.format(295000)}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 border-b-[1px] p-2">
                    <input placeholder="Mã giảm giá" className="  outline-none border px-3 py-2 rounded-sm w-2/3"/>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 w-1/3 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sử dụng</button>
                </div>

                <div className=" py-3 border-b-[1px] flex flex-col gap-3">
                    <div className=" flex items-center justify-between">
                        <p>Tạm tính</p>
                        <p className=" font-bold">{VND.format(295000)}</p>
                    </div>

                    <div className=" flex items-center justify-between">
                        <p>Phí vận chuyển</p>
                        <p className=" font-bold">{VND.format(295000)}</p>
                    </div>
                </div>

                <div className=" flex items-center justify-between py-3">
                    <p className=" text-lg">Tổng cộng</p>
                    <p className=" text-2xl font-bold">{VND.format(295000)}</p>
                </div>
            </div>
        </div>
    )
}

export default CheckOut