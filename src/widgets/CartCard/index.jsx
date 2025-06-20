import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { CloseOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";

import { formatCurrencyVN } from "@utils/function";

const CartCard = (props) => {
    const { data, isLoadingDelete, isLoadingUpdate } = props;
    const { handleSelectItem, handleDeleteItem, handleUpdateItem } = props;
    const [state, setState] = useState({
        quantity: 0,
        isDeleteLoading: false,
        isLoadingMinus: false,
        isLoadingPlus: false,
    })

    useEffect(() => {
        state.quantity = data?.quantity;
        setState((prev) => ({ ...prev }))
    }, [data]);

    useEffect(() => {
        if (!isLoadingUpdate) setState(prev => ({...prev, isLoadingMinus: false, isLoadingPlus: false}));
    },[isLoadingUpdate]);

    useEffect(() => {
        if (!isLoadingDelete) setState(prev => ({...prev, isDeleteLoading: false}));
    },[isLoadingDelete]);

    const handleDelete = async () => {
        setState(prev => ({...prev, isDeleteLoading: true}));
        await handleDeleteItem(data?._id);
    }

    const handleMinus = async () => {
        setState(prev => ({...prev, isLoadingMinus: true}));
        await handleUpdateItem(data?._id, data?.quantity - 1, "minus")
    }

    const handlePlus = async () => {
        setState(prev => ({...prev, isLoadingPlus: true}));
        await handleUpdateItem(data?._id, data?.quantity + 1, "plus")
    }

    const buttonStyle = 'flex items-center justify-center bg-gray-300 text-xs hover:bg-gray-400 transition-colors duration-200 text-gray-800 font-bold';

    return (
        <div className="py-5 px-1 border-b-[1px] border-opacity-70 flex justify-between">
            <div className="flex gap-2 items-center">
                <Checkbox onChange={(e) => handleSelectItem(e, data)} />
                <div className=" flex gap-2">
                    <img className="h-[100px] w-[100px]" src={data?.image_hover} />
                    <div className="ml-3 flex flex-col gap-2">
                        <a className="hover:text-blue-500 font-bold opacity-85 cursor-pointer">{data?.product_name}</a>
                        <div className="text-sm font-bold tracking-wider opacity-70">{`${data?.color ? `${data?.color}/` : ""}${data?.size ? data?.size : ""}`}</div>
                        <div className="flex items-center">
                            <Button
                                loading={state.isLoadingMinus}
                                className={buttonStyle}
                                onClick={handleMinus}
                            >
                                <MinusOutlined />
                            </Button>
                            <span className="w-[35px] h-[25px] cursor-default flex items-center justify-center bg-[#f5f5f5] font-bold opacity-70 text-[15px]">{data?.quantity}</span>
                            <Button
                                loading={state.isLoadingPlus}
                                className={buttonStyle}
                                onClick={handlePlus}
                            >
                                <PlusOutlined />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col justify-between items-end">
                <Button
                    onClick={handleDelete}
                    loading={state.isDeleteLoading}
                    icon={<CloseOutlined />}
                />
                <div className="font-semibold text-[16px]">{formatCurrencyVN(data?.price_per_one, true)}</div>
            </div>
        </div>
    )
}

export default CartCard;