import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { endpoint } from "../../../api/api"
import { Button, message } from "antd"
import { forgotPass } from "../function"
import { FAIL } from "@utils/message"

const ForgotPass = (props) => {
    const { handleChangeTab, handleChangeInfo, handleChangeTypeOtp } = props

    const [state, setState] = useState({
        isLoading: false,
    })
    const [notify, setNotify] = useState()
    const emailRef = useRef()

    const handleResetPass = async () => {
        setState((prev) => ({ ...prev, isLoading: true }));
        const body = {
            email: emailRef.current.value
        }

        // {
        //     "success": true,
        //     "user_id": "66dc6309a508b334a25201c8",
        //     "message": "Đã gữi Email Xác thực",
        //     "color": "text-green-500"
        // }

        const res = await forgotPass(body);
        if(res?.success){
            message.info("OTP đã được gửi tới email của bạn");
            handleChangeInfo("user_id", res?.user_id);
            handleChangeTypeOtp("forgotPass");
            handleChangeTab(2);
        }else{
            message.error(FAIL);
            setState((prev) => ({ ...prev, isLoading: false }));
        }
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
                    loading={state.isLoading}
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