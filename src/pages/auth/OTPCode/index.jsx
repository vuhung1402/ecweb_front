import { Button, Input } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";

const OTPCode = (props) => {
    const { handleChangeTab, handleSentOtp, handleChangeInfo } = props
    const { loading } = props;

    const onChange = (text) => {
        handleChangeInfo("otp", text);
    };
    const sharedProps = {
        onChange,
    };

    return (
        <div className=" w-full h-full">
            <div className="flex flex-col items-center gap-3 w">
                <div className=" w-full flex flex-col items-center">
                    <Title level={5}>
                        Nhập mã OTP của bạn vào đây
                    </Title>
                    <Input.OTP
                        mask="🔒" {...sharedProps}
                    />
                </div>
                <div className=" w-[252px] flex flex-col gap-3">
                    <Button
                        type="primary"
                        className=" w-full"
                        loading={loading?.status && "sent" === loading?.type}
                        onClick={() => handleSentOtp("sent")}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        type="primary"
                        className=" w-full"
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
                </div>
            </div>
        </div>
    )
}

export default OTPCode