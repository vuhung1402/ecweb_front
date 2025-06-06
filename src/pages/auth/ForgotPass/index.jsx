import React, { useRef, useState } from "react"
import { Button, Input, message } from "antd"
import ForgotPassContainer from "./ForgotPassContainer"
import { ActionWrapper } from "./ForgotPass"
import { useForgotPass } from "./function"

const ForgotPass = (props) => {
    const { handleChangeTab, handleChangeInfo, handleChangeTypeOtp } = props;
    const { email } = props;
    const { mutateAsync, isPending } = useForgotPass();

    const handleResetPass = async () => {
        const body = {
            email
        }

        mutateAsync(body, {
            onSuccess: (data) => {
                message.info("OTP đã được gửi tới email của bạn");
                handleChangeInfo("user_id", data?.user_id);
                handleChangeTypeOtp("forgotPass");
                handleChangeTab(2);
            },
            onError: (error) => {
                const response = error?.response?.data;
                message.error(response?.message);
            }
        })
    }

    return (
        <ForgotPassContainer>
            <Input
                placeholder="Email"
                type=""
                className="w-full outline-none border p-3 mb-4"
                value={email}
                onChange={(e) => handleChangeInfo("email", e.target.value) }
            />
            <ActionWrapper>
                <Button
                    onClick={handleResetPass}
                    loading={isPending}
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
            </ActionWrapper>
        </ForgotPassContainer>
    )
}

export default ForgotPass