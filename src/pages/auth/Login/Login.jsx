import React, { useRef, useState } from "react"
import { useUserPackageHook } from "../../../redux/hooks/userHook"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userPackage } from "../../../redux/actions"
import { endpoint } from "../../../api/api"
import { Button, Input, message } from "antd"
import { quantityCart } from "@pages/product/function"

const Login = () => {
    const user = useUserPackageHook()
    // console.log(user)

    const [loginInfor, setLoginInfor] = useState(
        {
            email: "",
            password: ""
        }
    )

    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',

    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        setState((prev) => ({ ...prev, isLoading: true }));
        const body = {
            email: state.email,
            password: state.password,
        }
        await fetch(`${endpoint}/auth/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            // setResponse(json)
            if (json?.success) {
                localStorage.setItem("token", json?.accessToken);
                dispatch(userPackage(json));
                setState((prev) => ({ ...prev, isLoading: false }));
                message.success("Đăng nhập thành công");
                navigate('/');
            } else {
                setState((prev) => ({ ...prev, isLoading: false }));
                message.error(json?.message);
                // setNotify(json)
            }
        }).catch((error) => {
            message.error("Trang web đang được bảo trì, vui lòng quay lại sau");
            console.error("Error: ", error)
        })

    }

    return (
        <div className="flex">
            <div className=" w-1/2 border-r-[1px] flex justify-center items-center font-semibold text-5xl">
                Đăng nhập
            </div>

            <div className=" w-1/2 p-[100px]">
                <Input
                    placeholder="Email"
                    className=" w-full p-3 mb-4"
                    value={state.email}
                    type=""
                    onChange={e => setState((prev) => 
                        ({
                            ...prev, 
                            email: e.target.value,
                        })
                    )}
                />
                <Input.Password
                    placeholder="Mật khẩu"
                    className=" w-full p-3 mb-4"
                    value={state.password}
                    type=""
                    onChange={e => setState((prev) => (
                        {
                            ...prev,
                            password: e.target.value
                        }
                    ))}
                />
                {/* <input placeholder="Email" className=" w-full outline-none border p-3 mb-4" value={loginInfor.email} onChange={e => setLoginInfor({ ...loginInfor, email: e.target.value })} />

                <input placeholder="Mật khẩu" type="password" className=" w-full outline-none border p-3" value={loginInfor.password} onChange={e => setLoginInfor({ ...loginInfor, password: e.target.value })} /> */}

                <div className=" mt-5 flex items-center">
                    <Button
                        onClick={handleLogin}
                        type="primary"
                        className=" h-auto text-2xl p-2"
                        loading={state.isLoading}
                    >
                        Đăng nhập
                    </Button>
                    <div className=" ml-2">
                        <div className=" hover:text-blue-500 cursor-pointer"><a href="/forgotPass">Quên mật khẩu?</a></div>
                        <div className=" hover:text-blue-500 cursor-pointer"><a href="/register" >Đăng ký</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login