import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { endpoint } from "../../../api/api"
import { Button } from "antd"

const ForgotPass = (props) => {
    const { handleChangeTab } = props

    const [notify, setNotify] = useState()
    const emailRef = useRef()

    const handleResetPass = () => {
        // console.log("email: ", emailRef.current.value)
        const body = {
            email: emailRef.current.value
        }

        fetch(`${endpoint}/users/forgot-password/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            setNotify(json)

        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    return (
        <div className=" w-full h-full">
            <input ref={emailRef} placeholder="Email" className=" w-full outline-none border p-3 mb-4" />
            {
                notify &&
                (
                    <p className={`${notify?.color}`}>{notify?.message}</p>
                )
            }
            <div className=" flex gap-2 items-center">
                <Button
                    onClick={handleResetPass}
                    type="primary"
                >
                    Gửi
                </Button>
                <div
                    onClick={() => handleChangeTab(0)}
                    className=" flex gap-2 items-center hover:text-blue-500 cursor-pointer"
                >
                    Huỷ
                </div>
            </div>
        </div>
    )
}

export default ForgotPass