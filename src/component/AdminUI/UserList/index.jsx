import React from 'react';
import { Button,Table} from 'antd';
import ModalUserInfor from '@component/AdminUI/ModalUserInfor';
import ModalTransaction from '../ModalTransaction';
import Loading from '@component/Loading/Loading';


const UserList = (props) => {
    const { isOpenModalUser, isOpenModalTransaction, userData, isGetUsers, isRefetchingUsers } = props;
    const { handleOpenModalUserInfor, handleOpenModalTransaction, handleUserDetail,  } = props;

    if(isGetUsers || isRefetchingUsers) return <Loading/>

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <div className=' flex gap-3'>
                    {record?.ho} {record?.ten}
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
            render: (_, record) => (
                <div className=' flex gap-3'>
                    <Button
                        type='primary'
                        onClick={() => handleUserDetail(record?._id)}
                    >
                        Chi tiết
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={userData}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 15,
                }}
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