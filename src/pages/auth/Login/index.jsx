import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userPackage } from "../../../redux/actions"
import { Button, Input, message } from "antd"
import LoginContainer from "./LoginContainer"
import { ActionWrapper } from "./Login"
import { useLogin } from "./function"

const Login = (props) => {
    const { handleChangeTab } = props

    const [state, setState] = useState({
        email: '',
        password: '',

    })

    const { mutateAsync, isPending, } = useLogin();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        const body = {
            email: state.email,
            password: state.password,
        }
        mutateAsync(body, {
            onSuccess: (data) => {
                if (data?.success) {
                    localStorage.setItem("token", data?.accessToken);
                    dispatch(userPackage(data));
                    message.success("Đăng nhập thành công");
                    navigate('/');
                } 
            },
            onError: (error) => {
                const response = error?.response?.data;
                message.error(response?.message);
            }
        })
    }

    return (
        <LoginContainer>
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
                loading={isPending}
            >
                Đăng nhập
            </Button>

            <ActionWrapper>
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
            </ActionWrapper>
        </LoginContainer>
    )
}

export default Login