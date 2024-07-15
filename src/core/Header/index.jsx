import React, { useEffect, useState } from "react";
import { useUserPackageHook } from "@redux/hooks/userHook";
import { useNumOfCartPackageHook } from "@redux/hooks/numOfCart"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Badge, Popover, message, Menu } from "antd"

import HeaderSearch from "@component/HeaderSearch";

import { clear, numOfCartPackage } from "@redux/actions";
import { quantityCart } from "@pages/product/function";
import { endpoint } from "@api/api";
import { TOKEN_INVALID } from "@utils/error";
import { getLevelKeys } from "@utils/function";

import IconUser from '@icon/iconUserHeader.svg';
import IconCart from '@icon/iconCart.svg';
import IconBars from '@icon/iconBars.svg';

import './style.scss';

const policyTitle = [
    {key: 'policy-title-1' , label: 'CHÍNH SÁCH ĐỔI TRẢ'},
    {key: 'policy-title-2' , label: 'CHÍNH SÁCH BẢO MẬT'},
    {key: 'policy-title-3' , label: 'CHÍNH SÁCH GIAO HÀNG'},
    {key: 'policy-title-4' , label: 'PHƯƠNG THỨC THANH TOÁN'},
    {key: 'policy-title-5' , label: 'HƯỚNG DẪN MUA HÀNG'},
];

const accountMenuClassName = 'cursor-pointer hover:bg-[rgb(239,239,239)] rounded-md px-3 py-[5px] transition-colors duration-200';

const Header = () => {
    const user = useUserPackageHook();
    const numOfCart = useNumOfCartPackageHook();

    const [account, setAccount] = useState(false)
    const [category, setCategory] = useState([])

    const [state, setState] = useState({
        popOverAcc: false,
        searchBox: false,
        account: false,
        category: [],
        navbarMobileOpenkey: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${endpoint}/category/getAllCategories`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if (json?.success) {
                setCategory(json?.formattedData)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
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
        message.success("Đăng xuất thành công");
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

    const classNameOfMenu = "px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]";

    const handleNavigate = (route, key) => {
        navigate(
            { pathname: route },
            { state: { key: key }}
        );
    };

    const menuContent = [
        {
            key: 'header-menu-1',
            label: 'TRANG CHỦ',
        },
        {
            key: 'header-menu-2',
            label: 'SẢN PHẨM',
            children: category,
        },
        {
            key: 'header-menu-3',
            label: 'CỬA HÀNG',
        },
        {
            key: 'header-menu-4',
            label: 'CỬA HÀNG',
            children: policyTitle,
        },
    ];

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

    return (
        <header className="relative bg-white px-4 md:px-20 lg:px-40">
            <div className="relative cursor-pointer hidden md:flex">
                <HeaderSearch />
            </div>

            <Popover
                trigger={"click"}
                rootClassName="w-screen navbar-mobile"
                arrow={false}
                content={
                    <Menu
                        className="font-medium w-full h-full overflow-y-auto"
                        mode="inline"
                        theme="light"
                        openKeys={state.navbarMobileOpenkey}
                        items={menuContent}
                        onOpenChange={handleNavBarChange}
                    />
                }            
            >
                <div className="flex md:hidden cursor-pointer">
                    <IconBars />
                </div>
            </Popover>

            <nav className="menu hidden md:flex">
                <ul className="font-medium">
                    <li className="px-3 cursor-pointer main-menu">
                        <div onClick={() => navigate("/")}>TRANG CHỦ</div>
                    </li>
                    <li className="px-3 cursor-pointer main-menu">
                        <div onClick={() => handleNavigate('/products/all')}>SẢN PHẨM ▾</div>
                        <ul className="sub-menu">
                            {
                                category?.map((item) => {
                                    return (
                                        <li className="relative">
                                            <div
                                                className="px-4 py-2 flex items-center gap-10 justify-between cursor-pointer hover:text-[rgb(0,4,255)]"
                                            >
                                                <div>{item?.label}</div>
                                                <div>▾</div>
                                            </div>
                                            <ul className="border third-menu">
                                                {
                                                    item?.children?.map((children) => {
                                                        return (
                                                            <li>
                                                                <div onClick={() => handleNavigate(`/products/${children?.route}`, children?.key)} className={`${classNameOfMenu}`}>{children?.label}</div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </li>
                    <li className="px-3 cursor-pointer main-menu"><div>CỬA HÀNG</div></li>
                    <li className="px-3 cursor-pointer z-[999] main-menu">
                        <div>CHÍNH SÁCH ▾</div>
                        <ul className="sub-menu text-[14px]">
                            {policyTitle.map((item, index) => {
                                return (
                                    <li key={`policy-header-menu-${item}`}>
                                        <div className="px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]">{item.label}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className="flex items-center gap-5">
                <div className="cursor-pointer relative">
                    <Popover
                        className="style"
                        arrow={false}
                        placement="bottomRight"
                        content={
                            <div className="flex flex-col gap-2">
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
                            <IconUser />
                        </div>
                    </Popover>
                </div>
                <div className="relative cursor-pointer flex items-center justify-center">
                    <Badge count={numOfCart}>
                        <div
                            onClick={() => {
                            setAccount(false);
                            setSearchBox(false);
                            navigate('/cart');
                        }}>
                            <IconCart />
                        </div>
                    </Badge>
                </div>
            </div>
        </header>
    )
}

export default Header