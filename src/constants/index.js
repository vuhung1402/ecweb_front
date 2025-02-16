import React from "react";

export const GET_PRODUCTS = 'get_products'
export const GET_CATEGORIES = 'get_categories'
export const GET_PRODUCTS_PAGE = 'get_products_page'
export const GET_DETAIL_PRODUCT = 'get_detail_product'
export const GET_CARD = 'get_card'
export const GET_QUANTITY_CARD = 'get_quantity_card'
export const GET_ADDRESS_INFO = 'get_address_info'
export const GET_ORDER_LIST_ADMIN = 'get_order_list_admin'
export const GET_ORDER_DETAIL_ADMIN = 'get_order_detail_admin'
export const GET_PRODUCTS_ADMIN = "get_products_admin";
export const GET_CATEGORIES_ADMIN = "GET_CATEGORIES_ADMIN";
export const GET_PRODUCT_DETAIL_ADMIN = "GET_PRODUCT_DETAIL_ADMIN";

export const GET_USERS_ADMIN = 'get_users_admin'
export const GET_USERS_DETAIL_ADMIN = 'get_users_detail_admin'
export const GET_USER_PROFILE = "get_user_profile";
export const GET_ORDER_LIST = "get_order_list";
export const GET_ORDER_DETAIL = "get_order_detail";
export const GET_ORDER_HISTORY = "get_order_history";

export const GET_VOUCHER_LIST_ADMIN = "get_voucher_list_admin";
export const GET_DETAIL_VOUCHER_ADMIN = "get_detail_voucher_admin";
export const GET_RELEASED_VOUCHER = "get_released_voucher";


export const navigatePath = {
    PRODUCT_ALL: '/products/all'
};
export const userProductsFilter = [
    {
        value: 1,
        label: 'Giá: Tăng dần',
        name: "tang-dan"
    },
    {
        value: 2,
        label: 'Giá: Giảm dần',
        name:'giam-dan'
    },
    {
        value: 3,
        label: 'Tên: A - Z',
        name:'A-Z'
    },
    {
        value:4,
        label:'Tên: Z - A',
        name:'Z-A'
    },
    {
        value: 5,
        label:'Mới nhất',
        name:'moi-nhat'
    }
];

export const changeSizeRule = [
    'Sản phẩm được hỗ trợ đổi size trong vòng 3 ngày kể từ ngày nhận được hàng',
    'Sản phẩm còn đủ tem mác, phụ kiện đi kèm và chưa qua sử dụng, giặt ủi.',
    'Chỉ hỗ trợ đổi size 01 lần/đơn hàng',
    'Phí ship đổi size khách hàng sẽ thanh toán'
];

export const ADMIN = "admin";
export const QL_ORDER = "ql_order";
export const QL_USER = "ql_user";
export const QL_PRODUCT = "ql_product";
export const QL_TRANSACTION = "ql_transaction";
export const QL_VOUCHER = "ql_voucher";

export const statusOrder = [
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
    {
        status: 8,
        name: <div className="font-bold">Yêu cầu Trả hàng/Hoàn tiền</div>,
        nextStatus: [
            {
                status: 9,
                label:'Không chấp nhận Trả hàng/Hoàn tiền',
            },
        ],
    },
    {
        status: 9,
        name: <div className="font-bold">Không chấp nhận Trả hàng/Hoàn tiền</div>,
    }
];

export const voucherStatus = {
    RELEASED: 'released',
    UNRELEASED: 'unreleased',
    EXPIRED: 'expired',
};

export const voucherTabs = [
    {
      key: voucherStatus.UNRELEASED,
      label: <div className="font-bold">Chưa phát hành</div>,
    },
    {
      key: voucherStatus.RELEASED,
      label: <div className="font-bold">Đang phát hành</div>,
    },
    {
      key: voucherStatus.EXPIRED,
      label: <div className="font-bold">Hết hạn</div>,
    },
];

export const voucherType = {
    DISCOUNT: 'discount',
    SHIPPING: 'shipping',
};

export const selectType = [
    {
        value: voucherType.DISCOUNT,
        label: <div className="font-bold">Giảm giá</div>,
    },
    {
        value: voucherType.SHIPPING,
        label: <div className="font-bold">Miễn phí vận chuyển</div>,
    },
    {
        value: '',
        label: <div className="font-bold">Tất cả</div>,
    },
]