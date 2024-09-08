import { Button, DatePicker, Input, message, Radio } from "antd";
import { dateFormat, endpoint } from "../../../api/api";
import React, { useRef, useState } from "react";

function SignUp(props) {
    const { handleChangeTab, handleChangeInfo, handleChangeTypeOtp } = props;

    const [state, setState] = useState({
        ho: "",
        ten: "",
        gender: "",
        birthday: "",
        email: "",
        password: "",
        isLoading: false,
    });

    const handleSignIn = () => {
        setState((prev) => ({ ...prev, isLoading: true }));
        const body = {
            ho: state.ho,
            ten: state.ten,
            gender: state.gender,
            birthday: state.birthday,
            email: state.email,
            password: state.password,
        }

        fetch(`${endpoint}/users/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                setState((prev) => ({ ...prev, isLoading: false }));
                throw new Error(`Netword response not ok ${response.status}`)
            }
            return response.json()
        }).then((json) => {
            setState((prev) => ({ ...prev, isLoading: false }));
            message.info("OTP đã được gửi qua email của bạn");
            handleChangeInfo("user_id", json?.user_id);
            handleChangeTypeOtp("register");
            handleChangeTab(2);
            // setNotifi(json);
        }).catch((e) => {
            setState((prev) => ({ ...prev, isLoading: false }));
            message.error("Trang web đang được bảo trì, vui lòng quay lại sau!")
            console.log("e: ", e);
        })

    }

    return (
        <div className="w-full h-full">
            <Input
                placeholder="Họ"
                type=""
                className=" w-full outline-none border p-3 mb-4"
                value={state.ho}
                onChange={e => setState((prev) => ({ ...prev, ho: e.target.value }))}
            />

            <Input
                placeholder="Tên"
                type=""
                className="w-full outline-none border p-3 mb-4"
                value={state.ten}
                onChange={e => setState((prev) => ({ ...prev, ten: e.target.value }))}
            />

            <div className="flex gap-5 mb-4">
                <div className="flex items-center gap-2">
                    <Radio.Group
                        onChange={(e) => setState(prev => ({ ...prev, gender: e.target.value }))}
                        value={state.gender}
                    >
                        <Radio value={"Nam"}>Nam</Radio>
                        <Radio value={"Nữ"}>Nữ</Radio>
                    </Radio.Group>
                </div>


            </div>

            <DatePicker
                format={dateFormat}
                onChange={(date, dateString) => setState((prev) => ({ ...prev, birthday: dateString }))}
                className=" w-full outline-none border p-3 mb-4"
            />


            <Input
                placeholder="Email"
                type=""
                className=" w-full outline-none border p-3 mb-4"
                value={state.email}
                onChange={e => setState((prev) => ({ ...prev, email: e.target.value }))}
            />

            <Input.Password
                placeholder="password"
                className=" w-full outline-none border p-3 mb-4"
                value={state.password}
                onChange={e => setState((prev) => ({ ...prev, password: e.target.value }))}
            />

            <Button
                onClick={handleSignIn}
                loading={state.isLoading}
                type="primary"
                className="w-full h-auto text-2xl p-2 font-medium"
            >
                Đăng ký
            </Button>
            <div className=" mt-5 flex items-center">
            </div>
            <div 
                onClick={() => handleChangeTab(0)}
                className=" flex gap-2 items-center mt-2 hover:text-blue-500 cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
                Quay lại trang chủ
            </div>
        </div>
    )
}

export default SignUp