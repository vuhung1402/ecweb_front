import React from "react";
import Loading from "@widgets/Loading/Loading";
import { message } from "antd";
import { LOGIN_AGAIN } from "@utils/message";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { useNavigate } from "react-router-dom";

const CartContainer = (props) => {
    const navigate = useNavigate();

    if (props.isLoading) return <div className="w-full h-full"><Loading /></div>

    if (props.isError) {
        const response = props?.error?.response?.data
        if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
            message.info(LOGIN_AGAIN);
            logAgain();
            navigate('/login');
        }
    }

    return (
        <div className="w-full h-full xl:max-w-[1600px] px-[15px] xl:px-[85px] mx-auto">
            {props.children}
        </div>
    );
};

export default CartContainer;