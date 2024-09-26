export const GET_PRODUCTS = 'get_products'
export const GET_CATEGORIES = 'get_categories'
export const GET_PRODUCTS_PAGE = 'get_products_page'
export const GET_DETAIL_PRODUCT = 'get_detail_product'
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