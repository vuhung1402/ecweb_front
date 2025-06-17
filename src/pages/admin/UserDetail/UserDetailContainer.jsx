import Loading from "@widgets/Loading/Loading";
import React from "react";
import useWindowSize from "@hooks/useWindowSize";


const UserDetailContainer = (props) => {

    const iw = useWindowSize().width;

    if (props?.isGetDetail || props?.isRefetchingDetail) return <Loading />

    return (
        <div
            className=" w-full h-full overflow-y-auto"
            style={{ height: iw < 960 ? 'calc(100% - 44px)' : '100%' }}
            {...props}
        >

        </div>
    )
}

export default UserDetailContainer
