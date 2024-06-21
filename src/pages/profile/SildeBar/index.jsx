import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SildeBar = () => {
    const navigate = useNavigate()
    const handleClick = (url) => {
        navigate(url);
        localStorage.setItem("sildeBar", url);
    }
    const handleLogOut = () => {
        dispatch(clear())
        navigate('/')
    }
    return (
        <div className=" w-1/4 p-5">
            <p className=" uppercase font-bold mb-3">Tài khoản</p>
            <div
                className={` mt-2 hover:text-blue-500 cursor-pointer ${localStorage.getItem('sildeBar') === "/account" ? 'text-blue-500' : ''}`}
                onClick={() => handleClick('/account')}
            >
                Thông tin tài khoản
            </div>
            <div
                className={` mt-2 hover:text-blue-500 cursor-pointer ${localStorage.getItem('sildeBar') === "/address" ? 'text-blue-500' : ''}`}
                onClick={() => handleClick('/address')}
            >
                Danh sách địa chỉ
            </div>
            <div
                className={` mt-2 hover:text-blue-500 cursor-pointer ${localStorage.getItem('sildeBar') === "/order" ? 'text-blue-500' : ''}`}
                onClick={() => handleClick('/order')}
            >
                Lịch sử mua hàng
            </div>
            <div
                onClick={() => handleLogOut()}
                className=" mt-2 hover:text-blue-500 cursor-pointer"
            >
                Đăng xuất
            </div>
        </div>
    )
}

export default SildeBar;