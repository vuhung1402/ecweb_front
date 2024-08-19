import React from "react";

import { formatCurrencyVN } from "@utils/function";
import { Image, Card } from "antd";

import './style.scss';

const CardProduct = (props) => {
    const { dataDetail } = props;

    return (
        <div className="admin-card-product">
            <Card
                style={{width: 150}}
                cover={
                    <Image
                        src={dataDetail?.image_hover}
                    />
                }
                bordered
            >
                <Card.Meta
                    title={dataDetail?.product_name}
                    description={
                        <div className="font-bold">
                            <div>{dataDetail?.color}{dataDetail?.size ? `/${dataDetail?.size}` : ''}</div>
                            <div>{formatCurrencyVN(dataDetail?.price_per_one)}</div>
                            <div>Số lượng: {dataDetail?.quantity}</div>
                            <div className="flex justify-end text-red-600 text-lg">{formatCurrencyVN(dataDetail?.price_per_item)}</div>
                        </div>
                    }
                />
            </Card>
        </div>
    )
}

export default CardProduct;