import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import React from "react";
import { filterUser } from "./mock";

const UserFilter = (props) => {
    const { email } = props;
    const { handleChangeInfor } = props;

    return (
        <>
            <div className=" flex gap-2">
                <Select
                    style={{
                        width: 200,
                    }}
                    // value={state.selectValue}
                    // onSelect={handleSelect}
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={filterUser}
                />
                <Input
                    value={email}
                    // placeholder={state.placeholder || 'Tên người dùng'} 
                    onChange={(e) => handleChangeInfor(e.target.value, "email")}
                    placeholder="Email người dùng"
                    prefix={<SearchOutlined />}
                />
            </div>
            <Button type="primary">Áp dụng</Button>
        </>
    )
}

export default UserFilter