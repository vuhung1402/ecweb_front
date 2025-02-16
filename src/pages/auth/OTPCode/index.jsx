import { Button, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import OTPContainer from "./OTPContainer";
import { ActionWrapper, ContentWrapper, OTPInputWrapper } from "./OTP";
import { useResendPass } from "./function";
import { useForgotPass } from "../ForgotPass/function";
import { FAIL } from "@utils/message";

const OTPCode = (props) => {
    const { handleChangeTab, handleSentOtp, handleChangeInfo } = props
    const { typeOtp, isPendingVerifyOtp, isPendingVerifyOtpForgotPass, email } = props;

    const { mutateAsync: resendOtpRegister, isPending: isResendOtpRegister } = useResendPass();
    const { mutateAsync: resnedOtpForgotPass, isPending: isResnedOtpForgotPass } = useForgotPass();

    const onChange = (text) => {
        handleChangeInfo("otp", text);
    };
    const sharedProps = {
        onChange,
    };

    const resentOtp = () => {
        const body = {
            email
        }
        if(typeOtp === "register"){
            resendOtpRegister(body, {
                onSuccess: () => {
                    message.info("Đã gửi lại otp!!");
                },
                onError: () => {
                    message.error(FAIL);
                }
            });
        }else{
            resnedOtpForgotPass(body, {
                onSuccess: () => {
                    message.info("Đã gửi lại otp!!");
                },
                onError: () => {
                    message.error(FAIL);
                }
            });
        }
    }

    return (
        <OTPContainer>
            <ContentWrapper>
                <OTPInputWrapper>
                    <Title level={5}>
                        Nhập mã OTP của bạn vào đây
                    </Title>
                    <Input.OTP
                        mask="🔒" {...sharedProps}
                    />
                </OTPInputWrapper>
                <ActionWrapper>
                    <Button
                        type="primary"
                        className=" w-full"
                        loading={isPendingVerifyOtp || isPendingVerifyOtpForgotPass}
                        onClick={() => handleSentOtp()}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        type="primary"
                        className=" w-full"
                        loading={isResendOtpRegister || isResnedOtpForgotPass}
                        onClick={() => resentOtp()}
                    >
                        Gửi lại
                    </Button>
                    <Button
                        type="primary"
                        className=" w-full"
                        onClick={() => handleChangeTab(0)}
                    >
                        Quay lại
                    </Button>
                </ActionWrapper>
            </ContentWrapper>
        </OTPContainer>
    )
}

export default OTPCode