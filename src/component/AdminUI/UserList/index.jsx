import React from 'react';
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import DeleteIcon from "@icon/deleteIcon.svg"
import EditIcon from "@icon/edit.svg"
import { data } from '@pages/admin/user/mock';
import { StopOutlined, StopTwoTone, TransactionOutlined, UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import ModalUserInfor from '@component/AdminUI/ModalUserInfor';
import ModalTransaction from '../ModalTransaction';
import Loading from '@component/Loading/Loading';


const UserList = (props) => {
    const { isOpenModalUser, isOpenModalTransaction, userData, isGetUsers } = props;
    const { handleOpenModalUserInfor, handleOpenModalTransaction, handleUserDetail } = props;

    // [
    //     {
    //         "_id": "6663a25a208960e6b253f1e0",
    //         "ho": "Dinh",
    //         "ten": "Quan",
    //         "email": "dinhquanfananime3@gmail.com"
    //     },
    //     {
    //         "_id": "6663a2bc208960e6b253f1e5",
    //         "ho": "Dinh",
    //         "ten": "Quan",
    //         "email": "dinhquanfananime4@gmail.com"
    //     },
    //     {
    //         "_id": "6663cb79e12e5a5b69c7fb01",
    //         "ho": "Dinh",
    //         "ten": "Quan",
    //         "email": "dinhquanfananime@gmail.com"
    //     },
    //     {
    //         "_id": "66db2f7fb8963205c67c6400",
    //         "ho": "Dinh",
    //         "ten": "Quan",
    //         "email": "tab39105@dcobe.com"
    //     },
    //     {
    //         "_id": "66dd5e594ab3bd087f98f4b6",
    //         "ho": "Đỗ",
    //         "ten": "Hưng",
    //         "email": "badao867@gmail.com"
    //     },
    //     {
    //         "_id": "66dd62f84ab3bd087f991250",
    //         "ho": "yuhnnart",
    //         "ten": " ",
    //         "email": "yuhnnart84@gmail.com"
    //     },
    //     {
    //         "_id": "66ec3c4f199158fa2de65a43",
    //         "ho": "test",
    //         "ten": "test",
    //         "email": "vuhung14022002@gmail.com"
    //     },
    //     {
    //         "_id": "66ec3d60199158fa2de65c65",
    //         "ho": "Test1",
    //         "ten": "test1",
    //         "email": "badao867+1@gmail.com"
    //     }
    // ]

    if(isGetUsers) return <Loading/>

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