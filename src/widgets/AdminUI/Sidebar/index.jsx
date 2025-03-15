import React from "react";
import OrdersIcon from "@icon/iconOrder.svg"
import UserIcon from "@icon/iconUser.svg"
import ProductIcon from "@icon/iconProduct.svg"
import HomeIcon from "@icon/home.svg"
import { cn } from "@utils/function";

const Sidebar = (props) => {
    const { tab, roles } = props;
    const { handleChangeTab } = props;

    const sidebarTitle = [
        {
            role: ["admin"],
            label: "Trang chủ",
            icon: <HomeIcon className="scale-75" />,
        },
        {
            role: ["admin", "ql_order"],
            label: "Đơn Hàng",
            icon: <OrdersIcon className="scale-75" />,
        },
        {
            role: ["admin", "ql_user"],
            label: "Người Dùng",
            icon: <UserIcon className="scale-75" />,
        },
        {
            role: ["admin", "ql_product"],
            label: "Sản Phẩm",
            icon: <ProductIcon className="scale-75" />,
        },
        // {
        //     role: ["admin", "ql_transaction"],
        //     label: "Transaction",
        //     icon: <TransactionIcon className="scale-75"/>,
        // },
        {
            role: ["admin"],
            label: "Mã Giảm Giá",
            // icon: < className="scale-75"/>,
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
            </svg>


        },
    ];

    return (
        <div className="h-full w-full flex sm:flex-col border border-[rgb(229,230,230)] rounded-tl-md rounded-bl-md p-2 gap-2 bg-[rgba(229,237,255,0.3)]">
            {sidebarTitle.map((item, index) => {

                const isHaveRole = roles?.some(userRole => item.role.includes(userRole));

                if (!isHaveRole) return (<></>);

                return (
                    <div
                        className={cn(
                            "w-full flex flex-nowrap whitespace-nowrap p-2 gap-2 items-center justify-center sm:justify-normal cursor-pointer text-[#00237a] font-medium hover:bg-[rgb(204,218,255)] rounded-md transition-colors duration-200",
                            Number(tab) === Number(index) && "bg-[rgb(47,66,235)] !text-white")}
                        onClick={() => handleChangeTab(index)}
                        key={`admin-sidebar-${index}`}
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

export default Sidebar