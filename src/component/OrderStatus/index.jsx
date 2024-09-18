import React from "react"

import IconOrderSuccess from '@icon/iconOrderSuccess.svg';
import IconConfirm from '@icon/iconConfirm.svg';
import IconTransport from '@icon/iconTransport.svg';
import IconOrderFinish from '@icon/iconOrderFinish.svg';

const OrderStatus = (props) => {

    const { status, history } = props;

    const orderStatus = [
        { label: 'Đặt hàng thành công', icon: <IconOrderSuccess /> },
        { label: 'Đã xác nhận', icon: <IconConfirm /> },
        { label: 'Đang vận chuyển', icon: <IconTransport /> },
        { label: 'Đã giao hàng', icon: <IconOrderFinish /> },
    ];

    const statusName = {
        0: 'Chờ thanh toán',
        1: 'Chờ xác nhận',
        2: 'Đã xác nhận',
        3: 'Đang giao hàng',
        4: 'Đã giao hàng',
        5: 'Đã huỷ',
        6: 'Trả hàng/Hoàn tiền',
        7: 'Giao hàng không thành công',
    }

    return (
        <>
            {
                status !== 5 &&
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:h-[80px]">
                    {/* {orderStatus.map((item, index) => {
                        return (
                            <div key={`order-status=${index}`} className="flex items-center h-full">
                                <div
                                    style={{
                                        opacity: index >= status ? '0.5' : '1'
                                    }}
                                    className="flex flex-col gap-3 items-center text-xs"
                                >
                                    <div className="scale-75 sm:scale-100 transform">{item.icon}</div>
                                    <div className="w-20 text-center text-red-500 font-medium">{item.label}</div>
                                </div>
                                {index !== 3 && (
                                    <div className="w-[30px] hidden sm:block h-[1px] border-dashed border-t-2 border-red-500"></div>
                                )}
                            </div>
                        )
                    })} */}
                    <div className=" flex flex-col gap-3">
                        {
                            history?.map((item) => {
                                return (
                                    <div className=" flex">
                                        <div>{item?.day_add}</div>
                                        <div>{statusName[item?.status]}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default OrderStatus;