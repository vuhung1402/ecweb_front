import React, { useState } from "react";
import HomeIcon from "@icon/home.svg"
import OrdersIcon from "@icon/iconOrder.svg"
import UserIcon from "@icon/iconUser.svg"
import ProductIcon from "@icon/iconProduct.svg"
import TransactionIcon from "@icon/iconTransaction.svg"
import InboxIcon from "@icon/iconInbox.svg"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import NotifiIcon from "@icon/notifiIcon.svg"

const SildeBar = ({tab, handleChangeTab}) => {

    const sidebarTitle = [
        {
            label: "Dashboard",
            icon: <HomeIcon className="scale-75"/>,
        },
        {
            label: "Orders",
            icon: <OrdersIcon className="scale-75"/>,
        },
        {
            label: "Users",
            icon: <UserIcon className="scale-75"/>,
        },
        {
            label: "Products",
            icon: <ProductIcon className="scale-75"/>,
        },
        {
            label: "Transaction",
            icon: <TransactionIcon className="scale-75"/>,
        },
        {
            label: "Inbox",
            icon: <InboxIcon className="scale-75"/>,
        },
    ];

    return(
        <div className=" w-full h-full flex flex-col items-center pt-5 gap-5">
            <div className=" flex items-center w-3/4 gap-4 p-2">
                <Avatar icon={<UserOutlined />} />
                <div>User 1</div>
            </div>
            {sidebarTitle.map((item, index) => {
                return (
                    <div
                        onClick={() => handleChangeTab(index)}
                        className={`flex gap-2 items-center w-3/4 p-2 cursor-pointer hover:bg-[rgb(219,219,219)] 
                                    rounded-lg transition-all duration-200 ${tab === index ? ' bg-black text-white' : ''}`}
                        key={`sidebar-${index}`}
                    >
                        {item.icon}
                        <div className="text-sm font-medium">{item.label}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default SildeBar