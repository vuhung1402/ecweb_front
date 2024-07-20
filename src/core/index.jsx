import React from "react";
import Header from "./Header";

const DefaulLayout = ({ children }) => {
    return (
        <div className="w-screen h-screen relative">
            <div
                className="h-fit sticky top-0 z-[999]"
                id="app-header"
                style={{
                    boxShadow: '0 0 1px rgba(0,0,0,0.2)'
                }}
            >
                <Header />
            </div>
            <div style={{height: 'calc(100vh - 80px)'}} className='w-full'>
                {children}
            </div>
        </div>
    )
}

export default DefaulLayout;