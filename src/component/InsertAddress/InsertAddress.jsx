import React, { useRef, useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api/api"
import { Button, message } from "antd"
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error"
import { logAgain } from "@utils/function"
import { useNavigate } from "react-router-dom"
import { SUCCESS } from "@utils/message"


const InsertAddress = ({ setAddAddress, getDataAddress }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [isDefault, setIsDefault] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const nameRef = useRef()
    const streetRef = useRef()
    const phoneRef = useRef()

    const user = useUserPackageHook();

    const addAddress = async () => {
        setIsLoading(true);
        const body = {
            name: nameRef.current.value,
            street: streetRef.current.value,
            number: phoneRef.current.value,
            isDefault: isDefault
        }

        await fetch(`${endpoint}/users/insert_address/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if (json?.success) {
                getDataAddress();
                setIsLoading(false);
                message.success(SUCCESS)
            } else {
                if (json?.message === TOKEN_INVALID || json?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate("/login");
                } else {
                    setIsLoading(false);
                    message.error(FAIL);
                }
            }

        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    const handleChange = (e) => {
        setIsDefault(e.target.checked)
    }

    return (
        <>
            <input ref={nameRef} className="p-3 text-sm outline-none border" placeholder="Họ và tên" />

            <input ref={streetRef} className="p-3 text-sm outline-none border" placeholder="tên đường, số nhà, phường/xã, quận/huyện, thành phố/tỉnh" />

            <input ref={phoneRef} className="p-3 text-sm outline-none border" placeholder="Số điện thoại" />

            <div class="flex items-center mb-2">
                <input value={true} onChange={handleChange} id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-none" />
                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đặt làm địa chỉ mặc định</label>
            </div>

            <div className=" flex items-center">
                <Button
                    loading={isLoading}
                    onClick={addAddress} type="primary"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Thêm mới
                </Button>
                <div className=" ml-2 flex gap-2">
                    <div className="">hoặc</div>
                    <p
                        onClick={() => setAddAddress(false)} className="hover:text-blue-500 cursor-pointer"
                    >
                        Huỷ
                    </p>
                </div>
            </div>
        </>
    )
}

export default InsertAddress