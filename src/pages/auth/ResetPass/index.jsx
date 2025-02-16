import React, { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { endpoint } from "../../../api/api"
import { Button, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { resetPassword } from "../function";
import { FAIL, SUCCESS } from "@utils/message";
import ResetPassContainer from "./ResetPassContainer";
import { ActionWrapper } from "./ResetPass";
import { useResetPassword } from "./function";

const ResetPass = (props) => {
    const { handleChangeTab } = props;
    const { user_id } = props;

    const [state, setState] = useState(
        {
            password: "",
            confrimPass: "",
        }
    )

    const { mutateAsync, isPending } = useResetPassword()

    const handleChangePass = async () => {
        const body = {
            password: state.password,
            ConfirmPassword: state.confrimPass,
            user_id
        }

        mutateAsync(body, {
            onSuccess: () => {
                message.success(SUCCESS);
                handleChangeTab(0);
            },
            onError: () => {
                message.error(FAIL);
                handleChangeTab(0);
            }
        })
    }


    return (
        <ResetPassContainer>
            <Input.Password
                placeholder="password"
                className=" w-full outline-none border p-3 mb-4"
                value={state.password}
                onChange={e => setState((prev) => ({ ...prev, password: e.target.value }))}
            />

            <Input.Password
                placeholder="password"
                className=" w-full outline-none border p-3 mb-4"
                value={state.confrimPass}
                onChange={e => setState((prev) => ({ ...prev, confrimPass: e.target.value }))}
            />
            <ActionWrapper>
                <Button
                    onClick={handleChangePass}
                    type="primary"
                    loading={isPending}
                >
                    Lưu
                </Button>
                <div
                    onClick={() => handleChangeTab(0)}
                    className=" hover:text-blue-500 cursor-pointer"
                >
                    Huỷ
                </div>
            </ActionWrapper>
        </ResetPassContainer>

    )
}

export default ResetPass