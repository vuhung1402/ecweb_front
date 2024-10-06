import React from "react";

export const UserInforWrapper = (props) => {
    return(
        <div className=" w-full" {...props}>
        </div>
    );
};

export const UserRolesWrapper = (props) => {

    if(props?.isGetDetailSuccess){
        
    }

    return(
        <div className=" w-full" {...props} />
    );
};

export const UserAddressWrapper = (props) => {
    return(
        <div className=" w-full" {...props} />
    );
};

export const UserActionWrapper = (props) => {
    return(
        <div className=" w-full" {...props} />
    );
};