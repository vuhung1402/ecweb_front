import { PlusOutlined } from "@ant-design/icons";
import { ActionWrraper, VoucherListWrapper } from "@pages/admin/voucher/Voucher";
import { Button, message, Popconfirm, Select, Space, Table } from "antd";
import EditIcon from "@icon/edit.svg";
import DeleteIcon from "@icon/deleteIcon.svg";
import './style.scss';
import React, { useState } from "react";
import { selectType } from "@constants/index";
import useAdminProductStore from "@store/admin-product";
import { formatDate } from "date-fns";
import { useDeleteVoucher } from "@pages/admin/voucher/function";
import { SUCCESS } from "@utils/message";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";

const VoucherList = (props) => {
    const { vouchers } = props;
    const { handleVoucherDetail, refetchVoucher } = props;

    const [selectedRowKey, setSelectedRowKey] = useState(null); // Track selected row

    const { setTypeVoucher } = useAdminProductStore();

    const mutateDeleteVoucher = useDeleteVoucher();

    const columns = [
        {
            title: 'Mã giảm giá',
            dataIndex: 'code',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (_, { createdAt }) => {
                return (
                    <div>
                        {formatDate(new Date(createdAt), 'dd/MM/yyyy')}
                    </div>
                )
            }
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expiredAt',
            render: (_, { expiredAt }) => {
                return (
                    <div>
                        {formatDate(new Date(expiredAt), 'dd/MM/yyyy')}
                    </div>
                )
            }
        },
        {
            title: 'Loại mã',
            dataIndex: 'type',
            render: (_, { type }) => {
                const type1 = {
                    'discount': 'Giảm giá',
                    'shipping': 'Miễn phí vận chuyển',
                }[type];
                return (
                    <div>
                        {type1}
                    </div>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <div
                            className='cursor-pointer'
                            onClick={() => handleVoucherDetail(record?._id, 'edit')}
                        >
                            <EditIcon />
                        </div>
                        <Popconfirm
                            title="Xóa voucher"
                            description="Bạn có chắc chắn muốn xóa?"
                            okText="Xóa"
                            cancelText="Hủy"
                            onConfirm={() => onDeleteVoucher(record?._id)}
                            okButtonProps={{
                                loading: mutateDeleteVoucher.isPending,
                            }}
                        >
                            <div className='cursor-pointer'>
                                <DeleteIcon />
                            </div>
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ];

    const onRowClick = (voucher) => {
        setSelectedRowKey(voucher?._id); // Set selected row key
    };

    const rowClassName = (voucher) => {
        return voucher?._id === selectedRowKey ? 'selected-row' : ''; // Highlight selected row
    };

    const onChange = (value) => {
        setTypeVoucher(value);
    }

    const onDeleteVoucher = (id) => {
        const body = { id };
        mutateDeleteVoucher.mutateAsync(body, {
            onSuccess: () => {
                message.success(SUCCESS);
                refetchVoucher();
            },
            onError: (error) => {
                const response = error?.response?.data;
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login');
                } else {
                    message.error(FAIL);
                }
            }
        });
    }

    return (
        <VoucherListWrapper>
            <ActionWrraper>
                <Button
                    className='font-bold'
                    onClick={() => handleVoucherDetail('', 'new')}
                    icon={<PlusOutlined />}
                    type='primary'
                >
                    Thêm mã giảm giá
                </Button>
                <Select
                    showSearch
                    placeholder="Select a person"
                    className='w-full sm:w-[300px]'
                    // optionFilterProp="label"
                    onChange={onChange}
                    // onSearch={onSearch}
                    options={selectType.map((item) => {
                        return {
                            value: item?.value,
                            label: item?.label,
                        }
                    })}
                />
            </ActionWrraper>

            <Table
                rootClassName={`${vouchers?.vouchers?.length > 10 ? 'tableOrderWithPagination' : 'tableOrder'}`}
                bordered
                className='font-bold'
                columns={columns}
                dataSource={vouchers?.vouchers}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 15
                }}
                rowClassName={rowClassName} // Add rowClassName prop
                onRow={(voucher) => ({
                    onClick: () => onRowClick(voucher), // Handle row click
                })}
            />

        </VoucherListWrapper>
    )
}

export default VoucherList;