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

import './style.scss';

const Admin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useUserPackageHook()
    const [state, setState] = useState({
        tab: 0,
    })

    useEffect(() => {
        if(!user?.isAdmin){
            navigate('/404')
        }
    },[])

    useEffect(() => {
        state.tab = localStorage.getItem('currentTab');
        const activeTab = localStorage.getItem('activeTab');
        activeTab?.length > 0 ? navigate({search: activeTab}) : navigate({search: `?url=${state.tab}`});
        setState((prev) => ({ ...prev }));
    },[])

    const handleChangeTab = (tab) => {
        localStorage.removeItem('category_id');
        localStorage.setItem('activeTab', `?url=${tab}`);
        localStorage.setItem('currentTab', tab);
        state.tab = tab;
        setState((prev) => ({ ...prev }));

        navigate({
            search: `?url=${tab}`
        });
    };

    const renderTab = {
        0: <DashBoard url={location.search} />,
        1: <Orders url={location.search} />,
        2: <User url={location.search} />,
        3: <Products url={location.search} />,
        4: <Transaction url={location.search} />,
        5: <ChatBox url={location.search} />
    }[state.tab || 0];

    useEffect(() => {
        const resizer = document.getElementById('resizeHandler');
        const element = document.getElementById('sidebar');
        if (!resizer || !element) {
            return;
        }

        const resize = (e) => {
            const newWidth = e.pageX - element.getBoundingClientRect().left;
            if (newWidth > 50) {
                element.style.width = `${newWidth}px`;
            };

            setState(prev => ({...prev, isResize: true}));
        };
        const stopResize = () => {
            setState(prev => ({...prev, isResize: false}));
            window.removeEventListener('mousemove', resize);
        };

        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });
    }, []);

    return (
        <div className='w-screen h-screen flex'>
            <div
                id='sidebar'
                className='h-full w-[13%] min-w-[200px] max-w-[460px] bg-[#F5F5F5]'
            >
                <SildeBar
                    tab={state.tab}
                    handleChangeTab={handleChangeTab}
                />
            </div>
            <div id="resizeHandler" className='resize-handler z-20' />
            <div className='flex flex-grow flex-col'>
                {renderTab}
            </div>
        </div>
    );
};

export default Admin;


