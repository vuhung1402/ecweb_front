import { Button, Input } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const OTPCode = () => {
    const onChange = (text) => {
        console.log('onChange:', text);
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
                    >
                        Xác nhận
                    </Button>
                    <Button
                        type="primary"
                        className=" w-full"
                    >
                        Gửi lại
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OTPCode