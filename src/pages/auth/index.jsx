import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import OTPCode from "./OTPCode";
import ForgotPass from "./ForgotPass";
import { useVerifyOtp, useVerifyOtpForgotPass } from "./function";
import { message } from "antd";
import { FAIL, SUCCESS } from "@utils/message";
import ResetPass from "./ResetPass";
import AuthContainer from "./AuthContainer";
import { PageTitleWrapper, PageWrapper } from "./Auth";

const Auth = () => {
    const [state, setState] = useState(
        {
            tab: 0,
            typeOtp: "",
            otp: "",
            ho: "",
            ten: "",
            gender: "",
            birthday: "",
            email: "",
            password: "",
            user_id: "",
            loading: {
                status: false,
                type: "",
            },
        }
    );
    const { mutateAsync: verifyOtp, isPending: isPendingVerifyOtp } = useVerifyOtp();
    const { mutateAsync: verifyOtpForgotPass, isPending: isPendingVerifyOtpForgotPass } = useVerifyOtpForgotPass();


    const handleChangeTab = (tab) => {
        if (tab === 1) {
            setState((prev) => (
                {
                    ...prev,
                    tab: tab,
                    ho: "",
                    ten: "",
                    gender: "",
                    birthday: "",
                }
            ))
        }else{
            setState((prev) => ({ ...prev, tab: tab }))
        }
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

    const handleSentOtp = async () => {
        if (state.typeOtp === "register") {
            const body = {
                token: state.otp,
                user_id: state.user_id,
            }
            verifyOtp(body, {
                onSuccess: () => {
                    message.success(SUCCESS);
                    setState((prev) => ({ ...prev, tab: 0 }));
                },
                onError: () => {
                    message.error(FAIL);
                }
            })
        } else {
            const body = {
                otp: state.otp,
                user_id: state.user_id,
            }
            verifyOtpForgotPass(body, {
                onSuccess: () => {
                    message.success(SUCCESS);
                    setState((prev) => ({ ...prev, tab: 4 }));
                },
                onError: () => {
                    message.error(FAIL);
                }
            })
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
                    ho={state.ho}
                    ten={state.ten}
                    email={state.email}
                    birthday={state.birthday}
                    gender={state.gender}
                    password={state.password}
                    handleChangeTab={handleChangeTab}
                    handleChangeInfo={handleChangeInfo}
                    handleChangeTypeOtp={handleChangeTypeOtp}
                />
            ),
            2: (
                <OTPCode
                    typeOtp={state.typeOtp}
                    email={state.email}
                    handleChangeTab={handleChangeTab}
                    handleSentOtp={handleSentOtp}
                    handleChangeInfo={handleChangeInfo}
                    isPendingVerifyOtp={isPendingVerifyOtp}
                    isPendingVerifyOtpForgotPass={isPendingVerifyOtpForgotPass}
                />
            ),
            3: (
                <ForgotPass
                    email={state.email}
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
        <AuthContainer>
            <PageTitleWrapper>
                {renderPageTitle()}
            </PageTitleWrapper>

            <PageWrapper>
                {renderPage()}
            </PageWrapper>
        </AuthContainer>
    )
}

export default Auth