import React, { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { endpoint } from "../../../api"

const ResetPass = () => {
    const [notify, setNotify] = useState()

    const navigate = useNavigate()

    const newPassRef = useRef()
    const confirmPassRef = useRef()

    const params = useParams()

    const handleChangePass = () => {
        console.log("new pass: ", newPassRef.current.value)
        console.log("confirm pass: ", confirmPassRef.current.value)

        const body = {
            password: newPassRef.current.value,
            ConfirmPassword: confirmPassRef.current.value,
        }

        fetch(`${endpoint}/users/${params.id}/resetPass/${params.token}/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            setNotify(json)
            console.log("Response: ", json)
            if(json?.success){
                navigate('/login')
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }


    return(
        <div className="flex">
            <div className=" w-1/2 border-r-[1px] flex justify-center items-center font-semibold text-5xl">
                Phục hồi mật khẩu
            </div>

            <div className=" w-1/2 p-[100px]">
                <input ref={newPassRef} placeholder="Mật khẩu" type="password" className=" w-full outline-none border p-3 mb-4"/>

                <input ref={confirmPassRef} placeholder="Xác nhận mật khẩu" type="password" className=" w-full outline-none border p-3 mb-4"/>

                {
                    notify && 
                    (
                        <p className={`${notify?.color}`}>{notify?.message}</p>
                    )
                }

                <div className=" mt-5 flex items-center"> 
                    <button onClick={handleChangePass} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Lưu</button>
                </div>
            </div>
        </div>

    )
}

export default ResetPass