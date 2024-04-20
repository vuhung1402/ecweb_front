import { useState } from "react"
import { useUserPackageHook } from "../redux/hooks/userHook"
import { endpoint } from "../api"

const UpdateAddress = ({inforAdress, handleUpdateInfor, handleSaveAddress}) => {
    

    return(
         <div className="p-3 flex flex-col gap-3 bg-[#fafafa]">
            <input 
                onChange={(e) => handleUpdateInfor(e, "name")}
                value={inforAdress?.name} 
                className="p-3 text-sm outline-none" 
                placeholder="Họ và tên"
            />

            <input 
                onChange={(e) => handleUpdateInfor(e, "street")}
                value={inforAdress?.street} 
                className="p-3 text-sm outline-none" 
                placeholder="tên đường, số nhà, phường/xã, quận/huyện, thành phố/tỉnh"
            />

            <input 
                onChange={(e) => handleUpdateInfor(e, "number")}
                value={inforAdress?.number} 
                className="p-3 text-sm outline-none" 
                placeholder="Số điện thoại"
            />

            <div class="flex items-center mb-4">
                <input 
                    onChange={(e) => handleUpdateInfor(e, "isDefault")}
                    checked= {inforAdress?.isDefault} id="default-checkbox" 
                    type="checkbox" value="" 
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đặt làm địa chỉ mặc định</label>
            </div>

            <div className=" mt-5 flex items-center"> 
                <button onClick={handleSaveAddress} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Cập nhật
                </button>
                <div className=" ml-2">
                    <div className=" cursor-pointer mr-2">hoặc  <a className="hover:text-blue-500" href="/forgotPass">Huỷ</a></div>
                </div>
            </div>
        </div>
    )
}

export default UpdateAddress