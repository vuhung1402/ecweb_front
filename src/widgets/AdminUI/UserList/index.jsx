import React, { useState } from 'react';
import { Button, Table } from 'antd';
import './style.scss'
import ModalUserInfor from '../ModalUserInfor';
import ModalTransaction from '../ModalTransaction';
import Loading from '@widgets/Loading/Loading';


const UserList = (props) => {
    const { isOpenModalUser, isOpenModalTransaction, userData, isGetUsers, isRefetchingUsers } = props;
    const { handleOpenModalUserInfor, handleOpenModalTransaction, handleUserDetail, } = props;

    if (isGetUsers || isRefetchingUsers) return <Loading />

    const [selectedRowKey, setSelectedRowKey] = useState(null); // Track selected row


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, userData) => (
                <div className=' flex gap-3'>
                    {userData?.ho} {userData?.ten}
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, userData) => (
                <div className=' flex gap-3'>
                    <Button
                        type='primary'
                        onClick={() => handleUserDetail(userData?._id)}
                    >
                        Chi tiết
                    </Button>
                </div>
            ),
        },
    ];

    const onRowClick = (userData) => {
        setSelectedRowKey(userData?._id); // Set selected row key
    };

    const rowClassName = (userData) => {
        return userData?._id === selectedRowKey ? 'selected-row' : ''; // Highlight selected row
    };

    return (
        <>
            <Table
                columns={columns}
                className='font-bold'
                dataSource={userData?.map(user => ({ ...user, key: user._id }))}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 15,
                }}
                bordered
                rowClassName={rowClassName} // Add rowClassName prop
                onRow={(userData) => ({
                    onClick: () => onRowClick(userData), // Handle row click
                })}
            />

            <ModalUserInfor
                handleOpenModalUserInfor={handleOpenModalUserInfor}
                isOpenModalUser={isOpenModalUser}
            />

            <ModalTransaction
                isOpenModalTransaction={isOpenModalTransaction}
                handleOpenModalTransaction={handleOpenModalTransaction}
            />
        </>
    )
};
export default UserList;