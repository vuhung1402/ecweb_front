import React from "react";
import './styles.scss'; // Import the styles

const OrderStatus = (props) => {

    const { orderHistory } = props;

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

    if(orderHistory?.length === 0) return <></>

    return (
        <>
            {
                <div className="order-status-container"> {/* Add a class for styling */}
                    <div className="status-history"> {/* Add a class for styling */}
                        {
                            orderHistory?.map((item) => {
                                return (
                                    <div className="status-item"> {/* Add a class for styling */}
                                        <div className="status-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                                                <circle cx="5" cy="5" r="5" fill="#00796b" />
                                            </svg>
                                        </div>
                                        <div className="status-details">
                                            <div className="status-date">{item?.day_add}</div>
                                            <div className="status-label">{statusName[item?.status]}</div>
                                        </div>
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