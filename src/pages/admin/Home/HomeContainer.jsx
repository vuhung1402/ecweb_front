import Loading from "@widgets/Loading/Loading";
import React from "react";

const HomeAdminContainer = (props) => {
    const { isGetStatistical, isGetReveneuStatiscal } = props;

    if(isGetStatistical || isGetReveneuStatiscal) return <Loading/>;

    return (
        <div className=" w-full h-full p-4 flex flex-col gap-2 overflow-y-auto" {...props}>
            
        </div>
    )
}

export default HomeAdminContainer