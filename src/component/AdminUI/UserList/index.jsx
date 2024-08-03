import React from 'react';
import { Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import DeleteIcon from "@icon/deleteIcon.svg"
import EditIcon from "@icon/edit.svg"
import { data } from '@pages/admin/user/mock';
import { StopOutlined, StopTwoTone, TransactionOutlined, UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import ModalUserInfor from '@component/AdminUI/ModalUserInfor';
import ModalTransaction from '../ModalTransaction';


const UserList = (props) => {
    const { isOpenModalUser, isOpenModalTransaction } = props;
    const { handleOpenModalUserInfor, handleOpenModalTransaction } = props;

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
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
                    <div
                        className=' cursor-pointer'
                        onClick={handleOpenModalUserInfor}
                    >
                        <Tooltip title='Thông tin người dùng'>
                            <UserOutlined
                                className=' text-xl'
                                twoToneColor={"#0000FF"} />
                        </Tooltip>
                    </div>
                    <div
                        className=' cursor-pointer'
                        onClick={handleOpenModalTransaction}
                    >
                        <Tooltip title='Lịch sử giao dịch'>
                            <TransactionOutlined
                                className=' text-xl'
                                twoToneColor="#FF0000"
                            />
                        </Tooltip>
                    </div>
                    <Popconfirm
                        title="Chặn email người dùng"
                        description="Bạn muốn chặn email của người dùng này?"
                        // onConfirm={confirm}
                        // onCancel={cancel}
                        okText="Xác nhận"
                        cancelText="Huỷ"
                    >
                        <div
                            className=' cursor-pointer'
                        >
                            <StopTwoTone
                                className=' text-xl'
                                twoToneColor="#FF0000"
                            />
                        </div>
                    </Popconfirm>
                    <Popconfirm
                        title="Xoá người dùng"
                        description="Bạn muốn xoá người dùng này?"
                        // onConfirm={confirm}
                        // onCancel={cancel}
                        okText="Xác nhận"
                        cancelText="Huỷ"
                    >
                        <div className='cursor-pointer'>
                            <UserDeleteOutlined
                                className=' text-xl'
                            />
                        </div>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
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