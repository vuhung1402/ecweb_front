import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SildeBar from '@component/AdminUI/Sidebar';
import Orders from './orders';
import User from './user';
import Products from './products';
import Transaction from './transaction';
import ChatBox from './chatbox';
import OrderDetail from './OrderDetail';
import NewProduct from '@component/AdminUI/NewProduct';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@component/Resizable';
import { useUserPackageHook } from '@redux/hooks/userHook';
import useWindowSize from '../../hooks/useWindowSize';

import './style.scss';

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUserPackageHook();
    const iw = useWindowSize().width;

    const [state, setState] = useState({
        tab: 0,
        orderId: '',
        userId: '',
        productId: '',
        productType: '',
        isModifiedProduct: false,
    });

    useEffect(() => {
        if(!user?.isAdmin){
            navigate('/404')
        }
    },[]);

    const handleOrderDetail = (orderId, userId) => {
        if (iw < 960) {
            const left = document.getElementById('admin-order-left');
            const right = document.getElementById('admin-order-right');

            if (left && right) {
                left.classList.add('hidden');
                right.classList.remove('hidden');
            }
        };
        setState(prev => ({...prev, userId: userId, orderId: orderId}));
    };

    const handleBack = () => {
        const left = document.getElementById('admin-order-left');
        const right = document.getElementById('admin-order-right');

        if (left && right) {
            left.classList.remove('hidden');
            right.classList.add('hidden');
        };
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

    const handleDetail = (productId, type) => {
        if (iw < 960) {
            const left = document.getElementById('admin-order-left');
            const right = document.getElementById('admin-order-right');

            if (left && right) {
                left.classList.add('hidden');
                right.classList.remove('hidden');
            }
        };
        setState(prev => ({...prev, productId: productId, productType: type}));
    };

    const handleModifiedProduct = () => {
        setState(prev => ({...prev, isModifiedProduct: !prev.isModifiedProduct}));
    };

    const renderTab = {
        0: (
            <Orders
                handleOrderDetail={handleOrderDetail}
            />
        ),
        1: <User url={location.search} />,
        2: (
            <Products
                isModifiedProduct={state.isModifiedProduct}
                handleDetail={handleDetail}
            />
        ),
        3: <Transaction url={location.search} />,
        4: <ChatBox url={location.search} />
    }[state.tab || 0];

    const renderDetailTab = {
        0: (
            <OrderDetail
                userId={state.userId}
                orderId={state.orderId}
                handleBack={handleBack}
            />
        ),
        2: (
            <NewProduct
                productId={state.productId}
                type={state.productType}
                handleModifiedProduct={handleModifiedProduct}
                handleBack={handleBack}
            />
        ),
    }[state.tab || 0];

    return (
        <div className='w-screen h-screen p-4 flex flex-col sm:flex-row'>
            <div className='h-[66px] sm:h-full w-full sm:w-[64px] md:w-[150px]'>
                <SildeBar
                    tab={state.tab}
                    handleChangeTab={handleChangeTab}
                />
            </div>
            <div
                className='flex gap-[3px]'
                style={{
                    width: iw > 768 ? 'calc(100vw - 182px)' : iw > 640 ? 'calc(100vw - 96px)' : '100%',
                    height: iw > 640 ? '100%' : 'calc(100% - 66px)'
                }}
            >
                <ResizablePanelGroup autoSaveId="window-layout" direction="horizontal">
                    <ResizablePanel defaultValue={60} minSize={40} id='admin-order-left'>
                        <div className="h-full flex items-center border border-[rgb(229,230,230)] rounded-tr-md rounded-br-md">
                            {renderTab}
                        </div>
                    </ResizablePanel>
                    <div className='group hidden me:flex w-2 cursor-col-resize items-center justify-center rounded-md bg-gray-50'>
                        <ResizableHandle className='h-1 w-24 rounded-full bg-neutral-400 duration-300 group-hover:bg-primaryb group-active:duration-75 lg:h-24 lg:w-1' />
                    </div>
                    <ResizablePanel defaultValue={40} minSize={40} className='hidden me:block' id='admin-order-right'>
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


