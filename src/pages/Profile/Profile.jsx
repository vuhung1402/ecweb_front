import React from "react";

export const ContentWrapper = (props) => {
    return(
        <div className="flex-grow" {...props} >

        </div>
    )
}
export const InforWrapper = (props) => {
    return(
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" {...props} />
    )
}

export const ContentInforWrapper = (props) => {
    return(
        <div className="flex flex-col md:flex-row gap-8" {...props}/>
    )
}

export const SildeBarWrapper = (props) => {
    return(
        <div className="w-full md:w-1/4" {...props} />
    )
}

export const AccountInforWrapper = (props) => {
    return(
        <div className="w-full md:w-3/4 bg-white rounded-lg shadow p-6" {...props} />
    )
}