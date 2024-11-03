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
import NewProduct from '@pages/admin/NewProduct';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@component/Resizable';
import { useUserPackageHook } from '@redux/hooks/userHook';
import useWindowSize from '../../hooks/useWindowSize';
import { getOrderList, useGetOrderList } from './orders/function';
import { NOT_AUTHENTICATION, TOKEN_INVALID } from '@utils/error';
import { logAgain } from '@utils/function';
import { FAIL } from '@utils/message';

import './style.scss';
import { useGetCategories, useGetProducts } from './products/function';
import useAdminProductStore from '@store/admin-product';
import AdminContainer from './AdminContainer';
import { BackWrapper, ContentWrapper, SildeBarContentWrapper, SildeBarWrapper } from './Admin';

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUserPackageHook();
    const iw = useWindowSize().width;

    const [state, setState] = useState({
        tab: 0,
        query: '?status=1&type_sort=1',
        email: '',
        orderId: '',
        userId: '',
        productId: '',
        productType: '',
        isModifiedProduct: false,
        dataOrder: [],
    });

    useEffect(() => {
        if (!user?.isAdmin) {
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

    const { categoryId } = useAdminProductStore();

    //get orderlist
    const { isLoading: isGetOrderList, data: orders, refetch: refetchOrderList } = useGetOrderList(state.query);

    const { isLoading: isGetCategories, isSuccess: isGetCategoriesSuccess, data: categories, refetch: refetchCategories } = useGetCategories();

    const { isLoading: isGetProducts, data: products, refetch: refetchProducts } = useGetProducts(categoryId);

    // const { setRoles, roles } = useUserDetailStore();

    const handleChangeInfor = (value, key) => {
        setState(prev => (
            {
                ...prev,
                [key]: value
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
        setState(prev => ({ ...prev, userId: userId, orderId: orderId }));
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
        setState(prev => ({ ...prev, productId: productId, productType: type }));
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
        setState((prev) => ({ 
            ...prev, 
            tab: tab, 
            query: '?status=1&type_sort=1',
        }));

        navigate({
            search: `?url=${tab}`
        });
    };

    // change product
    const handleModifiedProduct = () => {
        setState(prev => ({ ...prev, isModifiedProduct: !prev.isModifiedProduct }));
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
                isGetCategories={isGetCategories}
                isGetCategoriesSuccess={isGetCategoriesSuccess}
                categories={categories}
                refetchCategories={refetchCategories}
                isGetProducts={isGetProducts}
                products={products}
                refetchProducts={refetchProducts}
                isModifiedProduct={state.isModifiedProduct}
                handleDetail={handleDetail}
            />
        ),
        3: <Transaction url={location.search} />,
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
                refetchProducts={refetchProducts}
                type={state.productType}
                handleModifiedProduct={handleModifiedProduct}
                handleBack={handleBack}
            />
        ),
    }[state.tab || 0];

    return (
        <AdminContainer>
            <BackWrapper handleGoBack={handleGoBack}>
                <ArrowLeftOutlined />
                <div>Quay lại</div>
            </BackWrapper>
            <ContentWrapper>
                <SildeBarWrapper>
                    <SildeBar
                        tab={state.tab}
                        handleChangeTab={handleChangeTab}
                    />
                </SildeBarWrapper>
                <SildeBarContentWrapper>
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
                </SildeBarContentWrapper>
            </ContentWrapper>
        </AdminContainer>
    );
};

export default Admin;


