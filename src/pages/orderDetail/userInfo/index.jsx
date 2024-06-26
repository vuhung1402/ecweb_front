import { PhoneOutlined, PinterestOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import LocationIcon from "@icon/locatioin.svg"

const UserInfo = () => {
    return (
        <div className=" w-full p-3 flex flex-col gap-3 border rounded-lg">
            <div className=" font-medium text-2xl">
                Thông tin khách hàng
            </div>
            <div className=" flex flex-col gap-2">
                <div className=" flex gap-2"> 
                    <UserOutlined/>
                    <div>Hung Do Vu</div>
                </div>
                <div className=" flex gap-2">
                    <PhoneOutlined/>
                    <div>0353592827</div>
                </div>
                <div className=" flex gap-2">
                    <LocationIcon/>
                    <div>
                    Chung cư Cao Ốc Xanh, 144 Nam Hoà, Phường Phước Long A, Thành Phố Thủ Đức, Hồ Chí Minh
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;