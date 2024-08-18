import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SildeBar from '@component/AdminUI/Sidebar';
import Orders from './orders';
import User from './user';
import Products from './products';
import Transaction from './transaction';
import ChatBox from './chatbox';
import OrderDetail from './OrderDetail';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@component/Resizable';
import { useUserPackageHook } from '@redux/hooks/userHook';

import './style.scss';

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUserPackageHook();

    const [state, setState] = useState({
        tab: 0,
        orderId: '',
        userId: '',
    });

    useEffect(() => {
        if(!user?.isAdmin){
            navigate('/404')
        }
    },[]);

    const handleOrderDetail = (orderId, userId) => {
        setState(prev => ({...prev, userId: userId, orderId: orderId}));
    };

    useEffect(() => {
        const activeTab = localStorage.getItem('activeTab');
        activeTab?.length > 0 ? navigate({search: activeTab}) : navigate({search: `?url=${state.tab}`});
        setState((prev) => ({ ...prev, tab: localStorage.getItem('currentTab') }));
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
        0: (
            <Orders
                handleOrderDetail={handleOrderDetail}
            />
        ),
        1: <User url={location.search} />,
        2: <Products url={location.search} />,
        3: <Transaction url={location.search} />,
        4: <ChatBox url={location.search} />
    }[state.tab || 0];

    const renderDetailTab = {
        0: (
            <OrderDetail
                userId={state.userId}
                orderId={state.orderId}
            />
        ),
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
        <div className='w-screen h-screen p-4 flex'>
            <div className='h-full'>
                <SildeBar
                    tab={state.tab}
                    handleChangeTab={handleChangeTab}
                />
            </div>
            <div className='h-full flex flex-grow gap-[3px]'>
                <ResizablePanelGroup autoSaveId="window-layout" direction="horizontal">
                    <ResizablePanel className="hidden me:block" defaultSize={60} minSize={60}>
                        <div id="monaco-editor" className="h-full flex items-center justify-center border border-[rgb(229,230,230)] rounded-tr-md rounded-br-md">
                            {renderTab}
                        </div>
                    </ResizablePanel>
                    <div className='group hidden me:flex w-2 cursor-col-resize items-center justify-center rounded-md bg-gray-50'>
                        <ResizableHandle className='h-1 w-24 rounded-full bg-neutral-400 duration-300 group-hover:bg-primaryb group-active:duration-75 lg:h-24 lg:w-1' />
                    </div>
                    <ResizablePanel defaultSize={40} maxSize={40} minSize={25}>
                        <div className="flex h-full justify-center items-center border rounded-md border-[rgb(229,230,230)]">
                            {renderDetailTab}
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default Admin;


