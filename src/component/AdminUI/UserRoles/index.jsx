import React, { useState } from "react";
import { Select } from "antd";
import { roles } from "./mock";

const UserRoles = (props) => {
    const { userRoles, initialRole } = props;
    const { handleAddRole } = props;

    const filteredOptions = roles.filter((o) => !userRoles?.includes(o.value));


    return (
        <div className=" w-full p-3 flex flex-col gap-2 justify-center">
            <div className=" font-bold">
                Phần quyền
            </div>
            <div>
                <Select
                    mode="multiple"
                    placeholder="Chọn quyền"
                    value={userRoles}
                    onChange={(value, options) => handleAddRole(value, options)}
                    style={{
                        width: '100%',
                    }}
                options={filteredOptions.map((item) => ({
                    value: item.value,
                    label: item.label,
                }))}
                />
            </div>
        </div>
    )
}

export default UserRoles