import * as Page from "./page"

const AppRoutes = [
    {
        path: '/',
        Component: Page?.HomePage,
        defaultLayout: false,
    },
    {
        path: '/login',
        Component: Page?.AuthPage,
        defaultLayout: true,
    },
    // {
    //     path: '/register',
    //     Component: Page?.SignUpPage,
    //     defaultLayout: true,
    // },
    {
        path: '/store',
        Component: Page?.StorePage,
        defaultLayout: true,
    },
    {
        path: '/products/:category',
        Component: Page?.ProductsPage,
        defaultLayout: true,
    },
    {
        path: '/product-detail/:name',
        Component: Page?.ProductDetailPage,
        defaultLayout: true,
    },
    {
        path: 'admin/product/:type',
        Component: Page?.NewProduct,
        defaultLayout: false,
    },
    // {
    //     path: '/resetPass/:id/resetPass/:token',
    //     Component: Page?.ResetPass,
    //     defaultLayout: true,
    // },
    // {
    //     path: '/forgotPass',
    //     Component: Page?.ForgotPass,
    //     defaultLayout: true,
    // },
    // {
    //     path: '/verify',
    //     Component: Page?.VerifyEmailPage,
    //     defaultLayout: false,
    // },
    {
        path: '/account',
        Component: Page?.ProfilePage,
        defaultLayout: true,
    },
    {
        path: '/cart',
        Component: Page?.Cartpage,
        defaultLayout: true,
    },
    {
        path: '/order',
        Component: Page?.OrderPage,
        defaultLayout: true,
    },
    {
        path: '/orderDetail/:id',
        Component: Page?.OrderDetailUserPage,
        defaultLayout: true,
    },
    {
        path: '/checkout/:code',
        Component: Page?.CheckOutPage,
        defaultLayout: true,
    },
    {
        path: '/address',
        Component: Page?.AddressPage,
        defaultLayout: true,
    },
    {
        path: '/admin',
        Component: Page?.AdminPage,
        defaultLayout: false,
    },
    {
        path: '/404',
        Component: Page?.NotFoundPage,
        defaultLayout: false,
    },
    {
        path: '/successpayment',
        Component: Page?.SuccessPayment,
        defaultLayout: false,
    },
    {
        path: '/admin/orderDetail/:id',
        Component: Page?.AdminOrderDetailPage,
        defaultLayout: true,
    },

]

export default AppRoutes