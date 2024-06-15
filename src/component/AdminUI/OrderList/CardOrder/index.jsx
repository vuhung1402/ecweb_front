import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import './styles.scss'
import React from "react";
import { formatCurrencyVN } from "@utils/function";

const CardOrder = (props) => {
    const { handleDetail } = props

    return (
        <Card
            hoverable
            style={{
                width: 200,
            }}
            cover={
                // <img
                //     className=" h-[150px] object-cover"
                //     alt="example"
                //     src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                // />
                <Image
                    className="object-cover !w-full !h-[150px]"
                    // style={{
                    //     objectFit: 'cover'
                    // }}
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
            }
        >
            <div
                onClick={handleDetail}
                className=" w-full"
            >
                <div className=" font-semibold underline hover:text-blue-400">
                    PRD-01
                </div>
                <div className=" flex justify-end text-red-600 font-medium text-xl">
                    {formatCurrencyVN(100000)}
                </div>
            </div>
        </Card>
    )
};

export default CardOrder;