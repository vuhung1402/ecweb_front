export const statusOrder = [
    {
        status: 0,
        name: 'Chờ thanh toán',
        nextStatus: [
            {
                status: 5,
                label: 'Huỷ đơn hàng',
            },
        ],
    },
    {
        status: 1,
        name: 'Chờ xác nhận',
        nextStatus: [
            {
                status: 2,
                label: 'Xác nhận đơn hàng',
            },
            {
                status: 5,
                label: 'Huỷ đơn hàng',
            },
        ],
    },
    {
        status: 2,
        name: 'Đã xác nhận',
        nextStatus: [
            {
                status: 3,
                label:'Giao hàng',
            }
        ],
    },
    {
        status: 3,
        name: 'Đang giao hàng',
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
        name: 'Đã giao hàng',
    },
    {
        status: 5,
        name: 'Đã huỷ',
    },
    {
        status: 6,
        name: 'Trả hàng/Hoàn tiền',
    },
    {
        status: 7,
        name: 'Giao hàng không thành công',
        nextStatus: [
            {
                status: 3,
                label:'Giao hàng',
            },
            {
                status: 5,
                label: 'Huỷ đơn hàng',
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