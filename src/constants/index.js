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