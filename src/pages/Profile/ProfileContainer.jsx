import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { LOGIN_AGAIN } from "@utils/message";
import Loading from "@widgets/Loading/Loading";
import { message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileContainer = (props) => {

    const navigate = useNavigate();

    if(props?.isGetInfor) return <Loading/>

    if (props?.isError) {
        const response = props?.error?.response?.data
        if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
            message.info(LOGIN_AGAIN);
            logAgain();
            navigate('/login');
        }
    }

    return(
        <div 
            className="w-full h-full flex flex-col bg-gray-50"
            {...props}
        >

        </div>
    )
}

export default ProfileContainer
