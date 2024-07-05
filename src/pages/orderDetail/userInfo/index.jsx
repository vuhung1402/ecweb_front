import { PhoneOutlined, PinterestOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import LocationIcon from "@icon/locatioin.svg"

const UserInfo = (props) => {
    const { data } = props;

    return (
        <div className=" w-full p-3 flex flex-col gap-3 border rounded-lg">
            <div className=" font-medium text-2xl">
                Thông tin khách hàng
            </div>
            <div className=" flex flex-col gap-2">
                <div className=" flex gap-2">
                    <UserOutlined />
                    <div>{data?.split('/')[0]}</div>
                </div>
                <div className=" flex gap-2">
                    <PhoneOutlined />
                    <div>{data?.split('/')[1]}</div>
                </div>
                <div className=" flex gap-2">
                    <LocationIcon />
                    <div>
                        {data?.split('/')[2]}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;