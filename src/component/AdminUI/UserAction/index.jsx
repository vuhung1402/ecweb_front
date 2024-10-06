import { QuestionCircleOutlined } from "@ant-design/icons";
import { useAddToBlackList } from "@pages/admin/UserDetail/function";
import { SUCCESS } from "@utils/message";
import { Button, message, Popconfirm } from "antd";
import React from "react";

const UserAction = (props) => {
    const { isGrantRole, userRoles, initialRole } = props;
    const { addToBlackList, deleteUser, grantRole } = props;

    return (
        <div className=" w-full p-3 flex gap-2 justify-end items-center">
            <Popconfirm
                title="Chặn người dùng"
                description="Cập nhật quyền người dùng này?"
                icon={
                    <QuestionCircleOutlined
                        style={{
                            color: 'red',
                        }}
                    />
                }
                onConfirm={grantRole}
            >
                <Button
                    disabled={initialRole === userRoles}
                    type="primary"
                >
                    Cập nhật
                </Button>
            </Popconfirm>
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
                onConfirm={addToBlackList}
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
                onConfirm={deleteUser}
            >
                <Button danger>Xoá người dùng</Button>
            </Popconfirm>
        </div>
    )
}

export default UserAction