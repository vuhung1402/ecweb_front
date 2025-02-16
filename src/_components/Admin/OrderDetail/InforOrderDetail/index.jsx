import { LeftOutlined } from "@ant-design/icons";
import CardProduct from "@_components/Admin/OrderDetail/CardProduct";
import PaymentInfo from "@_components/Admin/OrderDetail/PaymentInfo";
import PaymentMethod from "@_components/Admin/OrderDetail/PaymentMethod";
import { Tag } from "antd";
import React from "react";
import ReturnRequest from "../ReturnRequest";

const InforOrderDetail = (props) => {

    const { statusOrder, detailData, iw } = props;
    const { handleBack } = props;

    const isShowRequestReturn = [6, 8, 9];

    return (
        <>
            <div className="w-full items-center flex justify-between">
                <div>
                    {iw < 960 && (
                        <div
                            className="w-fit px-4 py-1 flex items-center gap-3 font-bold hover:bg-[rgb(219,219,219)] rounded-md transition-colors duration-200 cursor-pointer"
                            onClick={handleBack}
                        >
                            <LeftOutlined />
                            <div>Trở về</div>
                        </div>
                    )}
                </div>
                <Tag color="green" className="font-bold">
                    {statusOrder.find((item) => item?.status === detailData?.formatted_order_detail?.status)?.name}
                </Tag>
            </div>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex flex-wrap items-center justify-center gap-2">
                    {
                        detailData?.formatted_order_detail?.items?.map((item) => {
                            return (
                                <div key={item?.product_id}>
                                    <CardProduct dataDetail={item} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex flex-col w-full gap-3">
                    {
                        isShowRequestReturn.includes(detailData?.formatted_order_detail?.status)
                        &&
                        <ReturnRequest
                            listImage={detailData?.formatted_order_detail?.list_image}
                            description={detailData?.formatted_order_detail?.description}
                        />
                    }
                    <PaymentInfo
                        address={detailData?.formatted_order_detail?.address}
                        totalPrice={detailData?.formatted_order_detail?.total_price}
                        name={detailData?.formatted_order_detail?.name}
                        phone={detailData?.formatted_order_detail?.phone}
                        price_pay={detailData?.formatted_order_detail?.price_pay}
                        shipping_code={detailData?.formatted_order_detail?.shipping_code}
                    />
                    <PaymentMethod
                        typePay={detailData?.formatted_order_detail?.type_pay}
                        status={detailData?.formatted_order_detail?.status}
                    />
                </div>
            </div>
        </>
    )
}

export default InforOrderDetail