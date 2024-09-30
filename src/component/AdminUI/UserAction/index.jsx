import { QuestionCircleOutlined } from "@ant-design/icons";
import { useAddToBlackList } from "@pages/admin/UserDetail/function";
import { Button, Popconfirm } from "antd";
import React from "react";

const UserAction = (props) => {
    const { email } = props;

    const { mutate } = useAddToBlackList(email)

    return (
        <div className=" w-full p-3 flex gap-2 justify-end items-center">
            <Popconfirm
                title="Chặn người dùng"
                description="Bạn muốn chặn người dùng này?"
                icon={
                    <QuestionCircleOutlined
                        style={{
                            color: 'red',
                        }}
                    />
                }
                onConfirm={mutate}
            >
                <Button
                    danger
                >
                    Chặn người dùng
                </Button>
            </Popconfirm>

            <Popconfirm
                title="Xoá người dùng"
                description="Bạn muốn xoá người dùng này?"
                icon={
                    <QuestionCircleOutlined
                        style={{
                            color: 'red',
                        }}
                    />
                }
            >
                <Button danger>Xoá người dùng</Button>
            </Popconfirm>
        </div>
    )
}

export default UserAction