import React from "react";
import OrdersIcon from "@icon/iconOrder.svg"
import UserIcon from "@icon/iconUser.svg"
import ProductIcon from "@icon/iconProduct.svg"
import TransactionIcon from "@icon/iconTransaction.svg"
import InboxIcon from "@icon/iconInbox.svg"

const SildeBar = ({tab, handleChangeTab}) => {

    const sidebarTitle = [
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
        <div className="h-full w-full flex sm:flex-col border border-[rgb(229,230,230)] rounded-tl-md rounded-bl-md p-2 gap-2 bg-[rgba(229,237,255,0.3)]">
            {sidebarTitle.map((item, index) => {
                return (
                    <div
                        className={`w-full flex flex-nowrap whitespace-nowrap p-2 gap-2 items-center justify-center sm:justify-normal cursor-pointer text-[#00237a] font-medium hover:bg-[rgb(204,218,255)] rounded-md transition-colors duration-200 ${Number(tab) === Number(index) ? 'bg-[rgb(47,66,235)] !text-white' : ''}`}
                        onClick={() => handleChangeTab(index)}
                    >
                        <div className='flex w-8 h-8 gap-2 align-middle'>
                            {item.icon}
                        </div>
                        <div className='hidden md:flex text-sm font-bold'>{item.label}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default SildeBar