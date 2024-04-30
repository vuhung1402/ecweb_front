import * as Page from "./page"

const AppRoutes = [
    {
        path: '/',
        Component: Page?.HomePage,
        defaultLayout: true,
    },
    {
        path: '/login',
        Component: Page?.LoginPage,
        defaultLayout: true,
    },
    {
        path: '/register',
        Component: Page?.SignUpPage,
        defaultLayout: true,
    },
    {
        path: '/products/:category',
        Component: Page?.ProductsPage,
        defaultLayout: true,
    },
    {
        path: '/product-detail/:slug',
        Component: Page?.ProductDetailPage,
        defaultLayout: true,
    },
    {
        path: '/resetPass/:id/resetPass/:token',
        Component: Page?.ResetPass,
        defaultLayout: true,
    },
    {
        path: '/forgotPass',
        Component: Page?.ForgotPass,
        defaultLayout: true,
    },
    {
        path: '/verify/:id/verify/:token',
        Component: Page?.VerifyEmailPage,
        defaultLayout: false,
    },
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
        path: '/checkout/:code',
        Component: Page?.CheckOutPage,
        defaultLayout: true,
    },
    {
        path: '/address',
        Component: Page?.AddressPage,
        defaultLayout: true,
    },

]

export default AppRoutes