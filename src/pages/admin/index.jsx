import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { message } from 'antd';

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
import { getOrderList, useGetOrderList } from './orders/function';
import { NOT_AUTHENTICATION, TOKEN_INVALID } from '@utils/error';
import { logAgain } from '@utils/function';
import { FAIL } from '@utils/message';

import './style.scss';

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUserPackageHook();
    const iw = useWindowSize().width;

    const [state, setState] = useState({
        tab: 0,
        query: '?status=0&type_sort=1',
        email: '',
        orderId: '',
        userId: '',
        productId: '',
        productType: '',
        isModifiedProduct: false,
        dataOrder: [],
    });

    useEffect(() => {
        if(!user?.isAdmin){
            navigate('/404')
        }
    }, []);

    // get tab from local storage
    useEffect(() => {
        const activeTab = localStorage.getItem('activeTab');
        activeTab?.length > 0 ? navigate({ search: activeTab }) : navigate({ search: `?url=${state.tab}` });
        setState((prev) => ({ ...prev, tab: localStorage.getItem('currentTab') }));
    }, [])

    // get data order
    const getDataOrder = async (query) => {
        const response = await getOrderList(query);
        if (response?.success) {
            setState((prev) => ({ ...prev, dataOrder: response?.formatted_Order_table }));
        } else {
            if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
            }
        }
    }

    //get orderlist
    const { isLoading: isGetOrderList, data: orders, refetch: refetchOrderList } = useGetOrderList(state.query);

    // const { setRoles, roles } = useUserDetailStore();

    const handleChangeInfor = (value, key) => {
        setState(prev => (
            {
                ...prev,
                [key] : value
            }
        ))
    }

    // go to order detail in mobile
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

    // go to product detail
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

    // back from detail in mobile
    const handleBack = () => {
        const left = document.getElementById('admin-order-left');
        const right = document.getElementById('admin-order-right');

        if (left && right) {
            left.classList.remove('hidden');
            right.classList.add('hidden');
        };
    };

    // change tab
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

    // change product
    const handleModifiedProduct = () => {
        setState(prev => ({...prev, isModifiedProduct: !prev.isModifiedProduct}));
    };

    // back to home
    const handleGoBack = () => {
        navigate('/');
    }

    // render tab
    const renderTab = {
        0: (
            <Orders
                isGetOrderList={isGetOrderList}
                orders={orders?.formatted_Order_table}
                handleOrderDetail={handleOrderDetail}
                handleChangeInfor={handleChangeInfor}
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
                getDataOrder={getDataOrder}
                refetchOrderList={refetchOrderList}
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
        <div className='w-screen h-screen p-4 flex flex-col gap-2'>
            <div
                className='w-fit flex items-center gap-3 text-sm font-bold opacity-80 p-1 hover:bg-[#f1f5f9] transition-colors duration-200 cursor-pointer'
                onClick={handleGoBack}
            >
                <ArrowLeftOutlined />
                <div>Quay lại</div>
            </div>
            <div
                className='w-full flex flex-col sm:flex-row'
                style={{
                    height: 'calc(100vh - 68px)'
                }}
            >
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
        </div>
    );
};

export default Admin;


