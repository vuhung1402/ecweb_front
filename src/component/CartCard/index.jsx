import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Checkbox } from "antd";
import { CloseOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";

import { formatCurrencyVN } from "@utils/function";

const CartCard = (props) => {
    const { data, isLoadingDelete, isLoadingUpdate } = props;
    const { getData, handleSelectItem, handleDeleteItem, handleUpdateItem } = props;
    const navigate = useNavigate();
    const [state, setState] = useState({
        quantity: '',
        isLoadingDelete: false,
    })

    console.log({isLoadingUpdate})

    useEffect(() => {
        state.quantity = data?.quantity;
        setState((prev) => ({ ...prev }))
    }, []);

    const handleDelete = async () => {
        setState((prev) => ({ ...prev, isLoadingDelete: true }))
        await handleDeleteItem(data?._id);
        setState((prev) => ({ ...prev, isLoadingDelete: false }))
    }

    return (
        <div className="py-5 px-1 border-b-[1px] border-opacity-70 flex justify-between">
            <div className="flex gap-2 items-center">
                <Checkbox onChange={(e) => handleSelectItem(e, data)} />
                <div className=" flex gap-2">
                    <img className="h-[100px] w-[100px]" src={data?.image_hover} />
                    <div className="ml-3 flex flex-col gap-2">
                        <a className="hover:text-blue-500 font-bold opacity-85 cursor-pointer">{data?.product_name}</a>
                        <div className="text-sm font-bold tracking-wider opacity-70">{`${data?.color} / ${data?.size}`}</div>
                        <div className="flex items-center">
                            <Button
                                loading={isLoadingUpdate?.status && "minus" === isLoadingUpdate?.type && data?._id === isLoadingUpdate?.id}
                                className="flex items-center justify-center bg-gray-300 text-xs hover:bg-gray-400 transition-colors duration-200 text-gray-800 font-bold"
                                onClick={() => handleUpdateItem(data?._id, data?.quantity - 1, "minus")}
                            >
                                <MinusOutlined />
                            </Button>
                            <span className="w-[35px] h-[25px] cursor-default flex items-center justify-center bg-[#f5f5f5] font-bold opacity-70 text-[15px]">{data?.quantity}</span>
                            <Button
                                loading={isLoadingUpdate?.status && "plus" === isLoadingUpdate?.type && data?._id === isLoadingUpdate?.id}
                                className="flex items-center justify-center bg-gray-300 text-xs hover:bg-gray-400 transition-colors duration-200 text-gray-800 font-bold"
                                onClick={() => handleUpdateItem(data?._id, data?.quantity + 1, "plus")}
                            >
                                <PlusOutlined />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end">
                <Button
                    onClick={() => handleDelete()}
                    loading={state.isLoadingDelete}
                    icon={<CloseOutlined />}
                />
                <div className="font-semibold text-[16px]">{formatCurrencyVN(data?.price_per_one)}</div>
            </div>
        </div>
    )
}

export default CartCard;