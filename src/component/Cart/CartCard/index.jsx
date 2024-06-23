import { formatCurrencyVN, logAgain } from "@utils/function";
import React, { useEffect, useState } from "react";
import { deleteItemCart } from "../function";
import { Button, message } from "antd";
import { FAIL, SUCCESS } from "@utils/message";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";

const CartCard = (props) => {
    const { data } = props;
    const { getData } = props;
    const navigate = useNavigate();
    const [state, setState] = useState({
        quantity: '',
        isLoadingDelete: false,
    })

    useEffect(() => {
        state.quantity = data?.quantity;
        setState((prev) => ({ ...prev }))
    }, []);

    const handleDelete = async () => {
        setState((prev) => ({ ...prev, isLoadingDelete:true }));
        const result = await deleteItemCart(data?._id);
        if (result?.success) {
            getData();
            setState((prev) => ({ ...prev, isLoadingDelete:false }));
            message.success(SUCCESS);
        } else {
            if (result?.message === TOKEN_INVALID || result?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                setState((prev) => ({ ...prev, isLoadingDelete:false }));
                message.error(FAIL);
            }
        }
    }

    return (
        <div className="p-1 border-b-[1px] flex justify-between">
            <div className=" flex items-center">
                <img className="h-[100px] w-[100px]" src={data?.image_hover} />
                <div className=" ml-3">
                    <a className=" mb-1 hover:text-blue-500" href="#">{data?.product_name}</a>
                    <div className=" mb-1 text-sm font-light">{data?.color}/{data?.size}</div>
                    <div className=" flex items-center">
                        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 font-bold">
                            -
                        </button>
                        <span className=" px-4 bg-[#f5f5f5]">{state?.quantity}</span>
                        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 font-bold">
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col justify-between items-center">
                <Button
                    onClick={handleDelete}
                    loading={state.isLoadingDelete}
                    icon={<CloseOutlined />}
                />
                <div className=" font-semibold">{formatCurrencyVN(data?.price_per_one)}</div>
            </div>
        </div>
    )
}

export default CartCard;