import React, { useState } from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import OTPCode from "./OTPCode";
import ForgotPass from "./ForgotPass/ForgotPass";
import { login, verifyOtp, verifyOtpForgotPass } from "./function";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { FAIL, SUCCESS } from "@utils/message";
import ResetPass from "./ResetPass/ResetPass";

const Auth = () => {
    const [state, setState] = useState(
        {
            tab: 0,
            typeOtp: "",
            otp: "",
            email: "",
            password: "",
            user_id: "",
            loading: {
                status: false,
                type: "",
            },
        }
    );

    const handleChangeTab = (tab) => {
        setState((prev) => ({ ...prev, tab: tab }))
    }

    const handleChangeTypeOtp = (type) => {
        setState((prev) => ({ ...prev, typeOtp: type }));
    }

    const handleChangeInfo = (key, value) => {
        setState((prev) => ({
            ...prev,
            [key]: value
        }));
    }

    const handleSentOtp = async (type) => {
        setState((prev) => ({
            ...prev,
            loading:{
                status: true,
                type,
            }
        }));
        // {
        //     "success": true,
        //     "message": "Email verified successfully",
        //     "color": "text-green-500"
        //   }


        if (state.typeOtp === "register") {
            const body = {
                token: state.otp,
            }
            const res = await verifyOtp(body, state.user_id);
            if (res?.success) {
                message.success(SUCCESS);
                setState((prev) => ({ ...prev, tab: 0 }));
            }else{
                setState((prev) => ({
                    ...prev,
                    loading:{
                        status: false,
                        type: "",
                    }
                }));
                message.error(FAIL);
            }
        } else {
            const body = {
                otp: state.otp,
            }
            const res = await verifyOtpForgotPass(body, state.user_id);
            if (res?.success) {
                message.success(SUCCESS);
                setState((prev) => ({ ...prev, tab: 4 }));
            }else{
                setState((prev) => ({
                    ...prev,
                    loading:{
                        status: false,
                        type: "",
                    }
                }));
                message.error(FAIL);
            }
        }

    }

    const renderPageTitle = () => {
        const title = {
            0: "Đăng nhập",
            1: "Đăng ký",
            2: "Nhập OTP",
            3: "Quên mật khẩu",
            4: "Khôi phục mật khẩu",
        }[state.tab] || 0
        return title;
    }

    const renderPage = () => {
        const page = {
            0: (
                <Login
                    handleChangeTab={handleChangeTab}
                    handleChangeInfo={handleChangeInfo}
                    email={state.email}
                    password={state.password}
                />
            ),
            1: (
                <SignUp
                    handleChangeTab={handleChangeTab}
                    handleChangeInfo={handleChangeInfo}
                    handleChangeTypeOtp={handleChangeTypeOtp}
                />
            ),
            2: (
                <OTPCode
                    handleChangeTab={handleChangeTab}
                    handleSentOtp={handleSentOtp}
                    handleChangeInfo={handleChangeInfo}
                    loading={state.loading}
                />
            ),
            3: (
                <ForgotPass
                    handleChangeTab={handleChangeTab}
                    handleChangeInfo={handleChangeInfo}
                    handleChangeTypeOtp={handleChangeTypeOtp}
                />
            ),
            4: (
                <ResetPass
                    handleChangeInfo={handleChangeInfo}
                    handleChangeTab={handleChangeTab}
                    user_id={state.user_id}
                />
            )
        }[state.tab] || 0
        return page;
    }

    return (
        <div className="flex flex-col me:flex-row w-full h-full">
            <div
                className="w-full me:w-1/2 h-auto px-[15px] py-[30px] md:px-0 md:py-0 md:h-full flex justify-center items-center font-semibold text-5xl"
                style={{
                    borderRight: '1px solid rgba(5, 5, 5, 0.06)'
                }}
            >
                {renderPageTitle()}
            </div>

            <div className="w-full py-[60px] px-[15px] me:w-1/2 md:py-[100px] md:px-[80px] me:py-[100px] me:px-[60px] xl:p-[100px]">
                {renderPage()}
            </div>
        </div>
    )
}

export default Auth