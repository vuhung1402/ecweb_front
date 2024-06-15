import React from 'react';
import { Space, Table, Tag } from 'antd';
import DeleteIcon from "@icon/deleteIcon.svg"
import EditIcon from "@icon/edit.svg"
import { data } from '@pages/admin/user/mock';
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
                    className='cursor-pointer'
                >
                    <EditIcon />
                </div>
                <div className='cursor-pointer'>
                    <DeleteIcon />
                </div>
            </div>
        ),
    },
];
const UserList = () => {
    return (
        <Table columns={columns} dataSource={data} />
    )
};
export default UserList;