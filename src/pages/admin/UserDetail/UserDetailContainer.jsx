import Loading from "@widgets/Loading/Loading";
import React from "react";

const UserDetailContainer = (props) => {

    if(props?.isGetDetail || props?.isRefetchingDetail) return <Loading/>
    return(
        <div className=" w-full h-full" {...props}>

        </div>
    )
}

export default UserDetailContainer
