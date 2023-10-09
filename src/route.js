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
    }
]

export default AppRoutes