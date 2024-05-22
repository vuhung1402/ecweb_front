import React, { useEffect, useState } from 'react';
import SildeBar from '@component/AdminUI/Sidebar';
import Header from '@component/AdminUI/Header';
import DashBoard from './dashboard';
import Orders from './orders';
import User from './user';
import Products from './products';
import Transaction from './transaction';
import ChatBox from './chatbox';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserPackageHook } from '@redux/hooks/userHook';

const Admin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useUserPackageHook()
    const [state, setState] = useState({
        tab: 3,
    })

    // useEffect(() => {
    //     if(!user?.isAdmin){
    //         navigate('/notFound')
    //     }
    // })

    useEffect(() => {
        const activeTab = localStorage.getItem('activeTab');
        if(activeTab?.length > 0){
            navigate({
                search: activeTab
            })
        }else{
            navigate(
                {
                    search: `?url=${state.tab}`
                }
            )
        }
    },[])

    const handleChangeTab = (tab) => {
        localStorage.setItem('activeTab', `?url=${tab}`);
        state.tab = tab;
        setState((prev) => ({ ...prev }))
        navigate({
            search: `?url=${tab}`
        })
    };

    const renderTab = {
        0: <DashBoard url = {location.search} />,
        1: <Orders url = {location.search} />,
        2: <User url = {location.search} />,
        3: <Products url = {location.search} />,
        4: <Transaction url = {location.search} />,
        5: <ChatBox url = {location.search} />
    }[state.tab || 3]

    return (
        <div className=' w-screen h-screen flex'>
            <div className=' h-full w-1/6 bg-[#F5F5F5]'>
                <SildeBar tab = {state.tab} handleChangeTab = {handleChangeTab} />
            </div>
            <div className=' flex w-5/6 flex-col'>
                <div className=' w-full h-[90%]'>
                    {renderTab}
                </div>
            </div>
        </div>
    );
};

export default Admin;


