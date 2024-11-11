import { Button, DatePicker, Input, message, Radio } from "antd";
import { dateFormat, endpoint } from "../../../api/api";
import React, { useRef, useState } from "react";
import SignUpContainer from "./SignUpContainer";
import { RadioWrapper } from "./SignUp";
import { useRegister } from "./function";

function SignUp(props) {
    const { handleChangeTab, handleChangeInfo, handleChangeTypeOtp } = props;
    const { ho, ten, gender, birthday, email, password } = props;

    const [state, setState] = useState({
        ho: "",
        ten: "",
        gender: "",
        birthday: "",
        email: "",
        password: "",
    });

    const { mutateAsync, isPending } = useRegister();

    const handleSignIn = () => {
        const body = {
            ho: ho,
            ten: ten,
            gender: gender,
            birthday: birthday,
            email: email,
            password: password,
        }

        mutateAsync(body, {
            onSuccess: (data) => {
                message.info("OTP đã được gửi qua email của bạn");
                handleChangeInfo("user_id", data?.user_id);
                handleChangeTypeOtp("register");
                handleChangeTab(2);
                // setNotifi(json);
            }, 
            onError: (error) => {
                const response = error?.response?.data;
                message.error(response?.message);
            }
        })
    }

    return (
        <SignUpContainer>
            <Input
                placeholder="Họ"
                type=""
                className=" w-full outline-none border p-3 mb-4"
                value={ho}
                onChange={(e) => handleChangeInfo("ho", e.target.value) }
            />

            <Input
                placeholder="Tên"
                type=""
                className="w-full outline-none border p-3 mb-4"
                value={ten}
                onChange={(e) => handleChangeInfo("ten", e.target.value) }
            />

            <RadioWrapper>
                <Radio.Group
                    onChange={(e) => handleChangeInfo("gender", e.target.value) }
                    value={gender}
                >
                    <Radio value={"Nam"}>Nam</Radio>
                    <Radio value={"Nữ"}>Nữ</Radio>
                </Radio.Group>
            </RadioWrapper>

            <DatePicker
                format={dateFormat}
                onChange={(date, dateString) => handleChangeInfo("birthday", dateString) }
                className=" w-full outline-none border p-3 mb-4"
            />


            <Input
                placeholder="Email"
                type=""
                className=" w-full outline-none border p-3 mb-4"
                value={email}
                onChange={(e) => handleChangeInfo("email", e.target.value) }
            />

            <Input.Password
                placeholder="password"
                className=" w-full outline-none border p-3 mb-4"
                value={password}
                onChange={(e) => handleChangeInfo("password", e.target.value) }
            />

            <Button
                onClick={handleSignIn}
                loading={isPending}
                type="primary"
                className="w-full h-auto text-2xl p-2 font-medium"
            >
                Đăng ký
            </Button>
            <div
                onClick={() => handleChangeTab(0)}
                className=" flex gap-2 items-center mt-2 hover:text-blue-500 cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
                Quay lại trang chủ
            </div>
        </SignUpContainer>
    )
}

export default SignUp