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
        defaultLayout: false,
    },
    {
        path: '/sign-up',
        Component: Page?.SignUpPage,
        defaultLayout: false,
    },
    {
        path: '/products',
        Component: Page?.ProductsPage,
        defaultLayout: true,
    },
    {
        path: '/productDetail',
        Component: Page?.ProductDetailPage,
        defaultLayout: true,
    },
    {
        path: '/resetPass',
        Component: Page?.ResetPass,
        defaultLayout: false,
    },
    {
        path: '/forgotPass',
        Component: Page?.ForgotPass,
        defaultLayout: false,
    }
]

export default AppRoutes