import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import IconStopCircle from '@icon/iconStopCircle.svg';

const SideBar = () => {
    const navigate = useNavigate()
    const handleClick = (url) => {
        navigate(url);
        localStorage.setItem("sildeBar", url);
    }
    
    return (
        <div className="w-full py-5">
            <p className="uppercase font-extrabold mb-3">Tài khoản</p>
            <div
                className={`mt-2 text-sm font-bold opacity-70 hover:text-blue-500 flex items-center gap-1 cursor-pointer ${localStorage.getItem('sildeBar') === "/account" ? 'text-blue-500' : ''}`}
                onClick={() => handleClick('/account')}
            >
                <IconStopCircle />
                Thông tin tài khoản
            </div>
            <div
                className={`text-sm mt-2 font-bold opacity-70 hover:text-blue-500 flex items-center gap-1 cursor-pointer ${localStorage.getItem('sildeBar') === "/address" ? 'text-blue-500' : ''}`}
                onClick={() => handleClick('/address')}
            >
                <IconStopCircle />
                Danh sách địa chỉ
            </div>
            <div
                className={`text-sm mt-2 font-bold opacity-70 hover:text-blue-500 flex items-center gap-1 cursor-pointer ${localStorage.getItem('sildeBar') === "/order" ? 'text-blue-500' : ''}`}
                onClick={() => handleClick('/order')}
            >
                <IconStopCircle />
                Lịch sử mua hàng
            </div>
        </div>
    )
}

export default SideBar;