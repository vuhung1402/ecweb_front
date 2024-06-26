import React, { useEffect } from "react"
import { useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import './style.scss'
import SearchBox from "../../component/SearchBox/SearchBox"
import CartPopUp from "../../component/CartPopUp/CartPopUp"
import { clear, numOfCartPackage } from "../../redux/actions"
import { endpoint } from "../../api/api"
import { Badge, Popover, message } from "antd"
import { useNumOfCartPackageHook } from "@redux/hooks/numOfCart"
import { quantityCart } from "@pages/product/function"
import { set } from "firebase/database"
import { TOKEN_INVALID } from "@utils/error"

const Header = () => {
    const user = useUserPackageHook();
    const numOfCart = useNumOfCartPackageHook()
    const [searchBox, setSearchBox] = useState(false)
    const [account, setAccount] = useState(false)
    // const [cartPopUp, setCartPopUp] = useState(false)
    const [category, setCategory] = useState([])

    const [state, setState] = useState({
        popOverAcc: false,
    })

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
    }, [])

    const setLocalStorageQuantiyCart = async () => {
        if (user?.accessToken) {
            const numOfCart = await quantityCart();
            if(numOfCart?.message === TOKEN_INVALID){
                dispatch(numOfCartPackage(0));
            }else{
                dispatch(numOfCartPackage(numOfCart));
            }
        }
    }

    useEffect(() => {
        setLocalStorageQuantiyCart();
    }, [user?.accessToken])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAccount = () => {
        if (user?.accessToken) {
            setAccount(!account)
            setSearchBox(false)
            setCartPopUp(false)
        } else {
            navigate('/login')
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("numOfCart");
        dispatch(clear())
        setAccount(!account)
        message.success("Đăng xuất thành công");
        navigate('/')
    }

    const handlepopOverAcc = () => {
        if (user?.accessToken) {
            state.popOverAcc = !state.popOverAcc;
            setState((prev) => ({ ...prev }));
        } else {
            navigate("/login");
            state.popOverAcc = !state.popOverAcc;
            setState((prev) => ({ ...prev }));
        }
    }

    const classNameOfMenu = "px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]";

    const handleNavigate = (route, key) => {
        navigate(
            {
                pathname: route
            },
            {
                state: {
                    key: key,
                }
            }
        );
    }


    return (
        <header className="z-[999]">
            <div>LOGO</div>
            <nav class="menu">
                <ul>
                    <li className="px-3 cursor-pointer main-menu"><div onClick={() => navigate("/")}>TRANG CHỦ</div></li>
                    <li className="px-3 cursor-pointer main-menu">
                        <div onClick={() => handleNavigate('/products/all')}>SẢN PHẨM ▾</div>
                        <ul className="sub-menu">
                            {
                                category?.map((item) => {
                                    return (
                                        <li>
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
                            <li>
                                <div className="px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]">CHÍNH SÁCH ĐỔI TRẢ</div>
                            </li>
                            <li>
                                <div className="px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]">CHÍNH SÁCH BẢO MẬT</div>
                            </li>
                            <li>
                                <div className="px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]">CHÍNH SÁCH GIAO HÀNG</div>
                            </li>
                            <li>
                                <div className="px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]">PHƯƠNG THỨC THANH TOÁN</div>
                            </li>
                            <li>
                                <div className="px-4 py-2 flex items-center justify-between cursor-pointer hover:text-[rgb(0,4,255)]">HƯỚNG DẪN MUA HÀNG</div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className=" flex justify-between w-[132px]">
                <div className=" relative cursor-pointer">
                    <div onClick={() => {
                        setSearchBox(!searchBox)
                        setAccount(false)
                        // setCartPopUp(false)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    {
                        searchBox &&
                        (
                            <div className=" absolute bg-white rounded-md shadow-slate-600 border top-10 right-1 w-[370px]">
                                <SearchBox />
                            </div>
                        )
                    }
                </div>
                <div className=" cursor-pointer relative">
                    <Popover
                        className="style"
                        content={
                            <div className="">
                                {/* <div className=" uppercase text-center font-semibold p-2 border-b-[1px]">Thông tin tài khoản</div> */}
                                {
                                    user?.isAdmin &&
                                    <div
                                        onClick={() => {
                                            navigate("/admin")
                                            setAccount(!account)
                                        }}
                                        className=" hover:text-blue-300 cursor-pointer"
                                    >
                                        Trang quản lý
                                    </div>
                                }
                                {
                                    user?.accessToken &&
                                    <>
                                        <div
                                            onClick={() => {
                                                navigate("/account")
                                                setAccount(!account)
                                                localStorage.setItem("sildeBar", "/account");
                                            }}
                                            className=" hover:text-blue-300 cursor-pointer"
                                        >
                                            Tài khoản của tôi
                                        </div>
                                        <div onClick={handleLogOut} className="hover:text-blue-300 cursor-pointer">Đăng xuất</div>
                                    </>
                                }
                            </div>
                        }
                        title="Thông tin tài khoản"
                        trigger="click"
                        open={state?.popOverAcc}
                        onOpenChange={handlepopOverAcc}
                    >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                    </Popover>
                </div>
                <div className=" relative cursor-pointer" >
                    <Badge count={numOfCart}>
                        <div onClick={() => {
                            setAccount(false);
                            setSearchBox(false);
                            navigate('/cart');
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </div>
                    </Badge>
                    {/* {
                        cartPopUp &&
                        (
                            <div className=" absolute top-10 w-[450px] right-0 bg-white rounded border p-2 z-[999]">
                                <CartPopUp />
                            </div>
                        )
                    } */}
                </div>
            </div>
        </header>
    )
}

export default Header