import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { message } from 'antd';

import Sidebar from '@widgets/AdminUI/Sidebar';
import Orders from './orders';
import User from './user';
import Products from './products';
import OrderDetail from './OrderDetail';
import NewProduct from '@pages/admin/NewProduct';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@widgets/Resizable';
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
import UserDetail from './UserDetail';
import { useGetUsers } from './user/function';
import { ADMIN, QL_ORDER, QL_PRODUCT, QL_TRANSACTION, QL_USER, voucherStatus } from '@constants/index';
import Voucher from './voucher';
import VoucherDetail from './VoucherDetail';
import { useGetVoucherList } from './voucher/function';
import HomeAdmin from './Home';
import { useGetReveneuStatistical, useGetStatistical } from './Home/function';

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUserPackageHook();
    const iw = useWindowSize().width;

    const [state, setState] = useState({
        tab: 0,
        query: '?status=1&type_sort=1',
        year: new Date().getFullYear(),
        email: '',
        orderId: '',
        voucherId: '',
        userId: '',
        productId: '',
        productType: '',
        voucherMode: '',
        isModifiedProduct: false,
        dataOrder: [],
    });

    useEffect(() => {
        if (!user?.role?.includes(ADMIN) && !user?.role?.includes(QL_ORDER) && !user?.role?.includes(QL_PRODUCT)
            && !user?.role?.includes(QL_TRANSACTION) && !user?.role?.includes(QL_USER)) {
            navigate('/404')
        }
    }, []);

    // get tab from local storage
    // useEffect(() => {
    //     const activeTab = localStorage.getItem('activeTab');
    //     activeTab?.length > 0 ? navigate({ search: activeTab }) : navigate({ search: `?url=${state.tab}` });
    //     setState((prev) => ({ ...prev, tab: localStorage.getItem('currentTab') }));
    // }, [])

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

    const { categoryId, statusVoucher, typeVoucher, setStatusVoucher } = useAdminProductStore();

    //get orderlist
    const { isLoading: isGetOrderList, data: orders, refetch: refetchOrderList } = useGetOrderList(state.query, user?.role);

    const { isLoading: isGetCategories, isSuccess: isGetCategoriesSuccess, data: categories, refetch: refetchCategories } = useGetCategories(user?.role);

    const { isLoading: isGetProducts, data: products, refetch: refetchProducts } = useGetProducts(categoryId, user?.role);

    const { isLoading: isGetUsers, data: userData, refetch: refetchUsers, isRefetching: isRefetchingUsers } = useGetUsers(state.email, user?.role);

    const { isLoading: isGetVouchers, data: vouchers, refetch: refetchVoucher } = useGetVoucherList(typeVoucher, statusVoucher, user?.role);

    const { isLoading: isGetStatistical, data: statistical } = useGetStatistical(user?.role);

    const { isLoading: isGetReveneuStatiscal, data: reveneuStatistical } = useGetReveneuStatistical(state.year, user?.role);

    console.log('userData', userData);

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

    const handleUserDetail = (user_id) => {
        if (iw < 960) {
            const left = document.getElementById('admin-order-left');
            const right = document.getElementById('admin-order-right');

            if (left && right) {
                left.classList.add('hidden');
                right.classList.remove('hidden');
            }
        };
        setState(prev => ({ ...prev, userId: user_id }))
    }

    const handleVoucherDetail = (voucherId, mode) => {
        if (iw < 960) {
            const left = document.getElementById('admin-order-left');
            const right = document.getElementById('admin-order-right');

            if (left && right) {
                left.classList.add('hidden');
                right.classList.remove('hidden');
            }
        };
        setState(prev => ({ ...prev, voucherId: voucherId, voucherMode: mode }))
    }

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
        setStatusVoucher(voucherStatus.UNRELEASED);
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
            <HomeAdmin
                isGetStatistical={isGetStatistical}
                isGetReveneuStatiscal={isGetReveneuStatiscal}
                statistical={statistical?.data}
                reveneuStatistical={reveneuStatistical}
                handleChangeInfor={handleChangeInfor}
            />
        ),
        1: (
            <Orders
                isGetOrderList={isGetOrderList}
                orders={orders?.formatted_Order_table}
                handleOrderDetail={handleOrderDetail}
                handleChangeInfor={handleChangeInfor}
            />
        ),
        2: (
            <User
                url={location.search}
                handleUserDetail={handleUserDetail}
                userId={state.userId}
                isGetUsers={isGetUsers}
                userData={userData}
                isRefetchingUsers={isRefetchingUsers}
                handleChangeInfor={handleChangeInfor}
            />
        ),
        3: (
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
        4: <Voucher
            url={location.search}
            handleVoucherDetail={handleVoucherDetail}
            isGetVouchers={isGetVouchers}
            vouchers={vouchers}
            refetchVoucher={refetchVoucher}
        />,
    }[state.tab || 0];

    const renderDetailTab = {
        0: (
            <></>
        ),
        1: (
            <OrderDetail
                userId={state.userId}
                orderId={state.orderId}
                handleBack={handleBack}
                getDataOrder={getDataOrder}
                refetchOrderList={refetchOrderList}
            />
        ),
        2: (
            <UserDetail
                userId={state.userId}
                refetchUsers={refetchUsers}
            />
        ),
        3: (
            <NewProduct
                productId={state.productId}
                refetchProducts={refetchProducts}
                type={state.productType}
                handleModifiedProduct={handleModifiedProduct}
                handleBack={handleBack}
            />
        ),
        4: (
            <VoucherDetail
                voucherId={state.voucherId}
                mode={state.voucherMode}
                refetchVoucher={refetchVoucher}
                handleBack={handleBack}
            />
        )
    }[state.tab || 0];

    return (
        <AdminContainer>
            <BackWrapper handleGoBack={handleGoBack}>
                <ArrowLeftOutlined />
                <div>Quay lại</div>
            </BackWrapper>
            <ContentWrapper>
                <SildeBarWrapper>
                    <Sidebar
                        tab={state.tab}
                        handleChangeTab={handleChangeTab}
                        roles={user?.role}
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


