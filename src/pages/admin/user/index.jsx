import { Button, Input, Select } from "antd";
import React, { useState } from "react";
import { optionSearchOrder } from "../orders/mock";
import { SearchOutlined } from "@ant-design/icons";
import { filterUser } from "./mock";
import UserList from "@component/AdminUI/UserList";

const User = () => {
    const  [state, setState] = useState({
        selectValue: '1',
        placeholder: '',
    });

    const handleSelect = (value, option) => {
        state.selectValue = value;
        state.placeholder = option?.label;
        setState((prev) => ({...prev}));
    }

    return (
        <div className=" p-4">
            <div className="w-full flex justify-end items-center gap-3">
                <div className=" flex gap-2">
                    <Select
                        style={{
                            width: 200,
                        }}
                        value={state.selectValue}
                        onSelect={handleSelect}
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={filterUser}
                    />
                    <Input
                        placeholder={state.placeholder ||'Tên người dùng'} prefix={<SearchOutlined />}
                    />
                </div>
                <Button type="primary">Áp dụng</Button>
            </div>
            <div className="">
                <UserList/> 
            </div>
        </div>
    )
}

export default User