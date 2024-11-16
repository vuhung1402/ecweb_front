import React from "react";

import Loading from "@widgets/Loading/Loading";

const HomeContainer = (props) => {

    const { isLoading, children } = props;

    if (isLoading) return <div className="w-screen h-screen"><Loading /></div>

    return (
        <div className="w-screen h-screen">
            {children}
        </div>
    );
};

export default HomeContainer;