import React, { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { endpoint } from "../../../api/api"
import { Button, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { resetPassword } from "../function";
import { FAIL, SUCCESS } from "@utils/message";

const ResetPass = (props) => {
    const { handleChangeInfo, handleChangeTab } = props;
    const { user_id } = props;

    const [notify, setNotify] = useState()
    const [state, setState] = useState(
        {
            password: "",
            confrimPass: "",
            isLoading: false
        }
    )

    const handleChangePass = async () => {
        setState((prev) => ({ ...prev, isLoading: true }));
        const body = {
            password: state.password,
            ConfirmPassword: state.confrimPass,
        }

        // {
        //     "success": true,
        //     "message": "Cập nhật mật khẩu thành công",
        //     "color": "text-green-500"
        // }

        const res = await resetPassword(body, user_id);
        if (res?.success) {
            message.success(SUCCESS);
            handleChangeTab(0);
        }else{
            message.error(FAIL);
            handleChangeTab(0);
        }
    }


    return (
        <div className=" w-full h-full">
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

            {
                notify &&
                (
                    <p className={`${notify?.color}`}>{notify?.message}</p>
                )
            }

            <div className=" mt-2 flex items-center gap-2">
                <Button
                    onClick={handleChangePass}
                    type="primary"
                    loading={state.isLoading}
                >
                    Lưu
                </Button>
                <div
                    onClick={() => handleChangeTab(0)}
                    className=" hover:text-blue-500 cursor-pointer"
                >
                    Huỷ
                </div>
            </div>
        </div>

    )
}

export default ResetPass