import React from "react";
import Header from "./Header";

const DefaulLayout = ({ children }) => {
    return (
        <div className="w-screen h-screen">
            <header className="h-fit">
                <section className='w-full h-full'>
                    <Header />
                </section>
            </header>
            <div style={{height: 'calc(100vh - 80px)'}} className=''>
                <section className=''>
                    {children}
                </section>
            </div>
        </div>
    )
}

export default DefaulLayout;