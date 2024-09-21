import React, { useEffect, useState } from "react";
import { Drawer } from 'antd';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Badge, Popover, message, Menu } from "antd"
import { MenuOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

import { useUserPackageHook } from "@redux/hooks/userHook";
import { useNumOfCartPackageHook } from "@redux/hooks/numOfCart"
import { clear, numOfCartPackage } from "@redux/actions";
import { getCategories, quantityCart } from "@pages/Product/function";
import { TOKEN_INVALID } from "@utils/error";
import { getLevelKeys } from "@utils/function";

import './style.scss';

const policyTitle = [
    {key: 'policy-title-1' , label: 'CHÍNH SÁCH ĐỔI TRẢ'},
    {key: 'policy-title-2' , label: 'CHÍNH SÁCH BẢO MẬT'},
    {key: 'policy-title-3' , label: 'CHÍNH SÁCH GIAO HÀNG'},
    {key: 'policy-title-4' , label: 'PHƯƠNG THỨC THANH TOÁN'},
    {key: 'policy-title-5' , label: 'HƯỚNG DẪN MUA HÀNG'},
];

const accountMenuClassName = 'cursor-pointer hover:bg-[rgb(239,239,239)] rounded-md px-3 py-[5px] transition-colors duration-200';

const Header = (props) => {

    const { visible = true } = props;

    const user = useUserPackageHook();
    const numOfCart = useNumOfCartPackageHook();

    const [account, setAccount] = useState(false)
    const [category, setCategory] = useState([])
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

    const [state, setState] = useState({
        popOverAcc: false,
        searchBox: false,
        account: false,
        category: [],
        navbarMobileOpenkey: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGetCategories = async () => {
        const res = await getCategories();
        if(res.success){
            setState((prev) => ({...prev, category: res?.formattedData}))
        }
    }

    useEffect(() => {
        // fetch(`${endpoint}/category/getAllCategories`, {
        //     method: "GET",
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // }).then((response) => {
        //     if (!response.ok) {
        //         throw new Error("Netword response not ok")
        //     }
        //     return response.json()
        // }).then((json) => {
        //     if (json?.success) {
        //         setCategory(json?.formattedData)
        //     }
        // }).catch((error) => {
        //     console.error("Error: ", error)
        // })
        handleGetCategories();
    }, []);

    const setLocalStorageQuantiyCart = async () => {
        if (user?.accessToken) {
            const numOfCart = await quantityCart();

            if(numOfCart?.message === TOKEN_INVALID){
                dispatch(numOfCartPackage(0));
            } else {
                dispatch(numOfCartPackage(numOfCart));
            };
        };
    };

    useEffect(() => {
        setLocalStorageQuantiyCart();
    }, [user?.accessToken]);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("numOfCart");
        dispatch(clear());
        setAccount(!account);
        message?.success("Đăng xuất thành công");
        navigate('/');
    };

    const handlepopOverAcc = () => {
        if (user?.accessToken) {
            state.popOverAcc = !state.popOverAcc;
            setState((prev) => ({ ...prev }));
        } else {
            navigate("/login");
            state.popOverAcc = !state.popOverAcc;
            setState((prev) => ({ ...prev }));
        };
    };

    const menuContent = [
        {
            key: 'header-menu-1',
            label: 'TRANG CHỦ',
            route: '/'
        },
        {
            key: 'product',
            type: 'product',
            label: (
                <a href="/products/all">
                    SẢN PHẨM
                </a>
            ),
            route: '/products/all',
            children: state.category,
        },
        {
            key: 'header-menu-3',
            label: 'CỬA HÀNG',
            route: '/store'
        },
        {
            key: 'header-menu-4',
            label: 'CHÍNH SÁCH',
            children: policyTitle,
        },
    ];

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    };

    const handleNavBarChange = (openKeys) => {
        const levelKeys = getLevelKeys(menuContent);
        const currentOpenKey = openKeys.find((key) => state.navbarMobileOpenkey.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys.filter((key) => key !== currentOpenKey).findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
            setState(prev => ({
                ...prev,
                navbarMobileOpenkey: openKeys.filter((_, index) => index !== repeatIndex).filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
            }));
        } else {
            setState(prev => ({
                ...prev,
                navbarMobileOpenkey: openKeys
            }));
        };
    };

    const handleNavbarClick = (item) => {
        setMobileMenuVisible(false);
        const sidebarElement = document.getElementById('navbar-mobile');

        if (sidebarElement) {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            sidebarElement.dispatchEvent(clickEvent);
        };

        if (item.keyPath[item.keyPath?.length - 1] === 'product') {
            navigate(
                { pathname: `/products/${item?.item?.props?.route}` },
                { state: { key: item?.key }}
            );

            return;
        };

        navigate({
            pathname: item?.item?.props?.route,
        });
    };

    return (     
        <header className={`relative w-full px-4 md:px-20 lg:px-40 top-0 left-0 right-0 bg-white shadow-md z-50 ${visible ? 'header-visible' : 'header-hidden'}`}>
            {/* Mobile Menu Drawer */}
            <Drawer
                placement="left"
                onClose={toggleMobileMenu}
                visible={mobileMenuVisible}
                width="80%"
                bodyStyle={{ padding: 0 }}
            >
                <div className="flex flex-col h-full">
                    <Menu
                        className="font-bold w-full h-full overflow-y-auto"
                        mode="inline"
                        theme="light"
                        openKeys={state.navbarMobileOpenkey}
                        items={menuContent}
                        onClick={handleNavbarClick}
                        onOpenChange={handleNavBarChange}
                    />
                </div>
            </Drawer>

            <div className="h-full flex flex-grow">
                <div className="md:hidden flex items-center justify-center">
                    <MenuOutlined onClick={toggleMobileMenu} className="text-2xl scale-75 transform" />
                </div>
                <div className="h-full w-full hidden md:flex">
                    <Menu
                        className="font-bold flex items-center justify-center"
                        rootClassName="!border-none w-full"
                        mode="horizontal"
                        theme="light"
                        items={menuContent}
                        multiple={false}
                        onClick={handleNavbarClick}
                        onOpenChange={handleNavBarChange}
                    />
                </div>
            </div>

            <div className="flex items-center gap-5">
                <div className="cursor-pointer relative">
                    <Popover
                        className="style"
                        arrow={false}
                        placement="bottomRight"
                        content={
                            <div className="flex flex-col font-bold gap-2">
                                {user?.isAdmin && (
                                    <div
                                        onClick={() => {
                                            navigate("/admin")
                                            setAccount(!account)
                                        }}
                                        className={accountMenuClassName}
                                    >
                                        Trang quản lý
                                    </div>
                                )}
                                {
                                    user?.accessToken && (
                                        <>
                                            <div
                                                onClick={() => {
                                                    navigate("/account")
                                                    setAccount(!account)
                                                    localStorage.setItem("sildeBar", "/account");
                                                }}
                                                className={accountMenuClassName}
                                            >
                                                Tài khoản của tôi
                                            </div>
                                            <div
                                                onClick={handleLogOut}
                                                className={accountMenuClassName}
                                            >
                                                Đăng xuất
                                            </div>
                                        </>
                                    )}
                            </div>
                        }
                        title="Thông tin tài khoản"
                        trigger="click"
                        open={state?.popOverAcc}
                        onOpenChange={handlepopOverAcc}
                    >
                        <div>
                            <UserOutlined className="text-lg" />
                        </div>
                    </Popover>
                </div>
                <div className="relative cursor-pointer flex items-center justify-center">
                    <Badge count={numOfCart}>
                        <div
                            onClick={() => {
                            setAccount(false);
                            // setSearchBox(false);
                            navigate('/cart');
                        }}>
                            <ShoppingCartOutlined className="text-xl"/>
                        </div>
                    </Badge>
                </div>
            </div>
        </header>
    )
}

export default Header