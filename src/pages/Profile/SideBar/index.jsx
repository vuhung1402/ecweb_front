import React from "react";
import { NavLink } from "react-router-dom";
import IconStopCircle from '@icon/iconStopCircle.svg';

const SideBar = () => {
    const menuItems = [
        { path: '/account', label: 'Thông tin tài khoản' },
        { path: '/address', label: 'Danh sách địa chỉ' },
        { path: '/order', label: 'Lịch sử mua hàng' },
    ];

    return (
        <div className="w-full py-5 bg-gray-100 rounded-lg">
            <p className="uppercase font-extrabold mb-3 px-4">Tài khoản</p>
            {menuItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                        flex items-center gap-2 px-4 py-2 text-sm font-medium
                        ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}
                    `}
                >
                    <IconStopCircle />
                    {item.label}
                </NavLink>
            ))}
        </div>
    );
};

export default SideBar;