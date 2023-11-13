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
        path: '/products/:search',
        Component: Page?.ProductsPage,
        defaultLayout: true,
    },
    {
        path: '/productDetail/:slug',
        Component: Page?.ProductDetailPage,
        defaultLayout: true,
    },
    {
        path: '/resetPass/:resetCode',
        Component: Page?.ResetPass,
        defaultLayout: false,
    },
    {
        path: '/forgotPass',
        Component: Page?.ForgotPass,
        defaultLayout: false,
    },
    {
        path: '/verifyEmail/:code',
        Component: Page?.VerifyEmailPage,
        defaultLayout: false,
    },
    {
        path: '/profile',
        Component: Page?.ProfilePage,
        defaultLayout: true,
    },
    {
        path: '/cart',
        Component: Page?.Cartpage,
        defaultLayout: true,
    }
]

export default AppRoutes