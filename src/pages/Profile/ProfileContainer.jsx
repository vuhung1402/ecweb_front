import Loading from "@component/Loading/Loading";
import React from "react";

const ProfileContainer = (props) => {

    if(props?.isGetInfor) return <Loading/>

    return(
        <div 
            className="w-full h-full flex flex-col bg-gray-50"
            {...props}
        >

        </div>
    )
}

export default ProfileContainer
