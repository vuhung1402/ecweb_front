import { Button, Input, message, Radio } from "antd";
import { endpoint } from "../../../api/api";
import React, { useRef, useState } from "react";

function SignUp() {
    const [state, setState] = useState({
        ho: "",
        ten: "",
        gender: "",
        birthday: "",
        email: "",
        password: "",
        isLoading: false,
    });

    const [notifi, setNotifi] = useState()
    const handleSignIn = () => {
        setState((prev) => ({...prev, isLoading: true}));
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
                setState((prev) => ({...prev, isLoading: false}));
                throw new Error(`Netword response not ok ${response.status}`)
            }
            return response.json()
        }).then((json) => {
            setState((prev) => ({...prev, isLoading: false}));
            message.info(json?.message);
            // setNotifi(json);
        }).catch((e) => {
            setState((prev) => ({...prev, isLoading: false}));
            message.error("Trang web đang được bảo trì, vui lòng quay lại sau!")
            console.log("e: ", e);
        })

    }

    return (
        <div className="flex flex-col me:flex-row w-full h-full">
            <div
                className="w-full me:w-1/2 h-auto text-center px-[15px] py-[30px] md:px-0 md:py-0 md:h-full flex justify-center items-center font-semibold text-5xl"
                style={{
                    borderRight: '1px solid rgba(5, 5, 5, 0.06)'
                }}
            >
                Tạo tài khoản
            </div>

            <div className="w-full py-[60px] px-[15px] me:w-1/2 md:py-[100px] md:px-[80px] me:py-[100px] me:px-[60px] xl:p-[100px]">
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
                            onChange={(e) => setState(prev => ({...prev, gender: e.target.value}))}
                            value={state.gender}
                        >
                            <Radio value={"Nam"}>Nam</Radio>
                            <Radio value={"Nữ"}>Nữ</Radio>
                        </Radio.Group>
                    </div>


                </div>

                <Input
                    placeholder="dd/mm/yyyy"
                    type=""
                    className=" w-full outline-none border p-3 mb-4"
                    value={state.birthday}
                    onChange={e => setState((prev) => ({ ...prev, birthday: e.target.value }))}
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
                <div className=" flex gap-2 items-center mt-2 hover:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                    <a href="/" className=" cursor-pointer">Quay lại trang chủ </a>
                </div>
            </div>
        </div>

    )
}

export default SignUp