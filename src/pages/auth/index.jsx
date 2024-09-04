import React, { useState } from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import OTPCode from "./OTPCode";
import ForgotPass from "./ForgotPass/ForgotPass";

const Auth = () => {
    const [state, setState] = useState(
        {
            tab: 0,
        }
    );

    const handleChangeTab = (tab) => {
        setState((prev) => ({...prev, tab: tab}))
    }

    const renderPageTitle = () => {
        const title = {
            0: "Đăng nhập",
            1: "Đăng ký",
            2: "Nhập OTP",
            3: "Quên mật khẩu"
        }[state.tab] || 0
        return title;
    }

    const renderPage = () => {
        const page = {
            0: (
                <Login 
                    handleChangeTab = {handleChangeTab}
                />
            ),
            1: (
                <SignUp 
                    handleChangeTab = {handleChangeTab}
                />
            ),
            2: (
                <OTPCode

                />
            ),
            3: (
                <ForgotPass
                    handleChangeTab = {handleChangeTab}
                />
            ),
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