import React, { useRef, useState } from "react"
import { useUserPackageHook } from "../../../redux/hooks/userHook"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userPackage } from "../../../redux/actions"
import { endpoint } from "../../../api/api"
import { Button, Input, message } from "antd"

const Login = (props) => {
    const { handleChangeTab } = props

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
        <div className=" w-full h-full">
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

                <Button
                    onClick={handleLogin}
                    type="primary"
                    className="w-full h-auto text-2xl p-2"
                    loading={state.isLoading}
                >
                    Đăng nhập
                </Button>

                <div className="mt-5 flex items-center w-full justify-between text-sm font-bold opacity-60">
                    <div
                        onClick={() => handleChangeTab(1)}
                        className="hover:text-blue-500 cursor-pointer"
                    >
                        Đăng ký
                    </div>
                    <div 
                        onClick={() => handleChangeTab(3)}
                        className=" hover:text-blue-500 cursor-pointer"
                    >
                        Quên mật khẩu?
                    </div>
                </div>
            </div>
    )
}

export default Login