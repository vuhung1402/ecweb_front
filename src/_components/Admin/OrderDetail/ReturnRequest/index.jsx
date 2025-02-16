import { Card, Image, Tag } from "antd";
import React from "react";

const ReturnRequest = (props) => {
    const { listImage } = props;
    const { description } = props;

    return (
        <Card title="Yêu cầu trả hàng">
            <div className=" flex flex-col gap-2">
                <div className=" text-lg font-bold">
                    Mô tả:
                </div>
                <div className=" w-full text-lg break-words">
                    {description}
                </div>
            </div>

            <div className=" mt-2 flex flex-col gap-2">
                <div className=" text-lg font-bold">
                    Hình ảnh:
                </div>
                <div className=" flex flex-wrap">
                    {
                        listImage?.map((item) => {
                            return (
                                <Image
                                    width={100}
                                    src={item?.url}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </Card>
    )
}

export default ReturnRequest