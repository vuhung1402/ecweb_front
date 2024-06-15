import React from "react";
import CardProduct from "../CardProduct";
import PaymentInfo from "../PaymentInfo";
import PaymentMethod from "../PaymentMethod";
import { Button } from "antd";

const OrderDetail = (props) => {
    const { handleDetail } = props;

    return (
        <div
            className=" w-full py-3 flex flex-col justify-between px-10"
            style={{
                height: 'calc(100vh - 78px)'
            }}
        >
            <div className="flex flex-col gap-2 px-10">
                <div className=" font-medium" >Mã đơn hàng</div>

                <div className=" w-full">
                    <div className=" flex justify-between">
                        <div className=" flex flex-col gap-2 h-[400px] overflow-y-auto scrollbar-hide">
                            <CardProduct />
                            <CardProduct />
                            <CardProduct />
                        </div>
                        <div className=" flex flex-col w-[300px] gap-3">
                            <PaymentInfo />
                            <PaymentMethod />
                        </div>
                    </div>
                </div>
            </div>
            <div className=" flex gap-3 justify-end px-10">
                <Button onClick={handleDetail} type="primary">Huỷ</Button>
                <Button type="primary">Xác nhận</Button>
            </div>
        </div>
    )
}

export default OrderDetail