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
        isOpenModalUser: false,
        isOpenModalTransaction: false,
    });

    const handleSelect = (value, option) => {
        state.selectValue = value;
        state.placeholder = option?.label;
        setState((prev) => ({...prev}));
    }

    const handleOpenModalUserInfor = async () => {
        setState((prev) => ({...prev, isOpenModalUser: !state.isOpenModalUser}));
    }

    const handleOpenModalTransaction = async () => {
        setState((prev) => ({ ...prev, isOpenModalTransaction: !state.isOpenModalTransaction }));
    }

    return (
        <div className="w-full h-full p-4 flex flex-col gap-3">
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
                <UserList
                    handleOpenModalUserInfor={handleOpenModalUserInfor}
                    handleOpenModalTransaction={handleOpenModalTransaction}
                    isOpenModalUser={state.isOpenModalUser}
                    isOpenModalTransaction={state.isOpenModalTransaction}
                /> 
            </div>
        </div>
    )
}

export default User