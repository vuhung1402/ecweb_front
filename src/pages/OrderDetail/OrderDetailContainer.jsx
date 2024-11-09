import Loading from "@component/Loading/Loading";
import React from "react";

const OderDetailContainer = (props) => {
    if(props?.isGetOrderDetail) return <Loading/>

    return (
        <div
            className="w-full"
            style={{
                height: 'calc(100% - 80px)',
            }}
            {...props}
        />
    )
}

export default OderDetailContainer