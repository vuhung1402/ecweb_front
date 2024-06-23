import { ArrowLeftOutlined } from "@ant-design/icons";
import SildeBar from "@pages/profile/SildeBar";
import React from "react";
import ProductCard from "./productCard";
import PaymentInfor from "./paymentInfor";
import UserInfo from "./userInfo";
import SupportInfo from "./supportInfo";

const OderDetail = () => {
    return (
        <>
            <div
                className="flex w-full p-3"
            >
                {/* <div className=" flex flex-col items-center justify-center font-semibold text-5xl gap-3 p-5 border-b-[1px]">
                    <h1>Lịch sử mua hàng</h1>
                    <span className="bg-black p-[1.5px] w-14 flex items-center justify-center"></span>
                </div> */}
                <SildeBar />
                <div className=" flex flex-col gap-6 w-full">
                    <div className=" flex gap-6">
                        <ArrowLeftOutlined
                            className=" cursor-pointer"
                        />
                        <div className=" uppercase font-medium">Chi tiết đơn hàng</div>
                    </div>
                    <div>
                        <div className=" flex gap-3">
                            <div>Mã đơn hàng:</div>
                            <div className=" font-medium">WN0301936174</div>
                        </div>
                        <div>16/06/2024 10:23</div>
                        <div className=" text-green-600 font-medium">Đã giao hàng</div>
                    </div>
                    <ProductCard />
                    <PaymentInfor />
                    <UserInfo />
                    {/* <SupportInfo/> */}
                </div>
            </div>
        </>
    )
}

export default OderDetail;