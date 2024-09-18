import React from "react";

export const statusOrder = [
    {
        status: 0,
        name: <div className="font-bold">Chờ thanh toán</div>,
        nextStatus: [
        ],
    },
    {
        status: 1,
        name: <div className="font-bold">Chờ xác nhận</div>,
        nextStatus: [
            {
                status: 2,
                label: 'Xác nhận đơn hàng',
            },
        ],
    },
    {
        status: 2,
        name: <div className="font-bold">Đã xác nhận</div>,
        nextStatus: [
            {
                status: 3,
                label:'Giao hàng',
            }
        ],
    },
    {
        status: 3,
        name: <div className="font-bold">Đang giao hàng</div>,
        nextStatus: [
            {
                status: 4,
                label: 'Thành công',
            },
            {
                status: 7,
                label: 'Không thành công',
            },
        ],
    },
    {
        status: 4,
        name: <div className="font-bold">Đã giao hàng</div>,
    },
    {
        status: 5,
        name: <div className="font-bold">Đã huỷ</div>,
    },
    {
        status: 6,
        name: <div className="font-bold">Trả hàng/Hoàn tiền</div>,
    },
    {
        status: 7,
        name: <div className="font-bold">Giao hàng không thành công</div>,
        nextStatus: [
            {
                status: 3,
                label:'Giao hàng',
            },
        ],
    },
];

export const optionSearchOrder = [
    {
        value: '1',
        label: 'Mã đơn hàng',
    },
    {
        value: '2',
        label: 'Tên sản phẩm',
    },
    {
        value: '3',
        label: 'Mã sản phẩm',
    },
    {
        value: '4',
        label: 'Tên người dùng',
    },
]