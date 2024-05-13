import React from "react"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import NotifiIcon from "@icon/notifiIcon.svg"

const Header = () => {
    return(
        <div className="p-4 w-full h-full flex justify-end items-center">
            <div className=" flex items-center gap-4">
                <NotifiIcon/>
                <Avatar icon={<UserOutlined />} />
                <div>User 1</div>
            </div>
        </div>
    )
}

export default Header