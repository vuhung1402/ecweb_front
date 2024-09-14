import React from "react";
import { PhoneOutlined, MailFilled, UserOutlined } from "@ant-design/icons";

const UserInfo = (props) => {
    const { phone, name, email } = props;

    return (
        <div className="w-full p-3 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <div className="text-sm flex gap-2">
                    <UserOutlined />
                    <div>{name}</div>
                </div>
                <div className="text-sm flex gap-2">
                    <PhoneOutlined />
                    <div>{phone}</div>
                </div>
                <div className="text-sm flex gap-2">
                    <MailFilled />
                    <div className="truncate">{email}</div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;