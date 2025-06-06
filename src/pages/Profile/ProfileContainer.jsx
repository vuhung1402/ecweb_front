import { logAgain } from "@utils/function";
import Loading from "@widgets/Loading/Loading";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileContainer = (props) => {

    const navigate = useNavigate();

    if(props?.isGetInfor) return <Loading/>

    if(props?.isError) {
        logAgain();
        navigate('/login');
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
