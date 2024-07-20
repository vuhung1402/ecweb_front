import { Button, Input, message } from "antd";
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
        <div className="flex">
            <div className=" w-1/2 border-r-[1px] flex justify-center items-center font-semibold text-5xl">
                Tạo tài khoản
            </div>

            <div className=" w-1/2 p-[100px]">
                <input placeholder="Họ" className=" w-full outline-none border p-3 mb-4" value={state.ho} onChange={e => setState((prev) => ({ ...prev, ho: e.target.value }))} />

                <input placeholder="Tên" className=" w-full outline-none border p-3 mb-4" value={state.ten} onChange={e => setState((prev) => ({ ...prev, ten: e.target.value }))} />

                <div className=" flex gap-5 mb-4">
                    <div className="flex items-center gap-2">
                        <input className=" outline-none" type="radio" name="gender" value={"Nam"} onChange={e => setState((prev) => ({ ...prev, gender: e.target.value }))} />
                        <label>Nam</label>
                        <input className=" outline-none" type="radio" name="gender" value={"Nữ"} onChange={e => setState((prev) => ({ ...prev, gender: e.target.value }))} />
                        <label>Nữ</label>
                    </div>


                </div>

                <input placeholder="dd/mm/yyyy" className=" w-full outline-none border p-3 mb-4" value={state.birthday} onChange={e => setState((prev) => ({ ...prev, birthday: e.target.value }))} />

                <input placeholder="Email" className=" w-full outline-none border p-3 mb-4" value={state.email} onChange={e => setState((prev) => ({ ...prev, email: e.target.value }))} />

                <Input.Password
                    placeholder="password"
                    className=" w-full outline-none border p-3 mb-4"
                    value={state.password}
                    onChange={e => setState((prev) => ({ ...prev, password: e.target.value }))}
                />

                {/* <input placeholder="Mật khẩu" type="password" className=" w-full outline-none border p-3 mb-4" value={inforUser.password} onChange={e => setInforUser({...inforUser, password: e.target.value})}/> */}

                {/* {
                    notifi && 
                    (
                        <p className={`${notifi?.color}`}>{notifi?.message}</p>
                    )
                } */}

                <div className=" mt-5 flex items-center">
                    <Button
                        onClick={handleSignIn}
                        loading={state.isLoading}
                        type="primary"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Đăng ký
                    </Button>
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