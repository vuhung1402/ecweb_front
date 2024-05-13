import React, { useState } from 'react';
import SildeBar from '@component/AdminUI/Sidebar';
import Header from '@component/AdminUI/Header';
import DashBoard from './dashboard';
import Orders from './orders';
import User from './user';
import Products from './products';
import Transaction from './transaction';
import ChatBox from './chatbox';

const Admin = () => {
    const [state, setState] = useState({
        tab: 0,
    })

    const handleChangeTab = (tab) => {
        state.tab = tab;
        setState((prev) => ({ ...prev }))
    };


    return (
        <div className=' w-screen h-screen flex'>
            <div className=' h-full w-1/6 bg-[#F5F5F5]'>
                <SildeBar tab = {state.tab} handleChangeTab = {handleChangeTab} />
            </div>
            <div className=' flex flex-1 flex-col'>
                <div className=' w-full h-[10%] bg-[#F5F5F5]'>
                    <Header/>
                </div>
                <div className=' w-full h-[90%]'>
                    {state.tab === 0 && <DashBoard/>}
                    {state.tab === 1 && <Orders/>}
                    {state.tab === 2 && <User/>}
                    {state.tab === 3 && <Products/>}
                    {state.tab === 4 && <Transaction/>}
                    {state.tab === 5 && <ChatBox/>}
                </div>
            </div>
        </div>
    );
};

export default Admin;


