import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const DefaulLayout = ({ children }) => {
    return (
        <>
            <header className="">
                <section className='w-full'>
                    <Header />
                </section>
            </header>
            <div style={{height: 'calc(100vh - 80px)'}} className=''>
                <section className=''>
                    {children}
                </section>
            </div>
        </>
    )
}

export default DefaulLayout;