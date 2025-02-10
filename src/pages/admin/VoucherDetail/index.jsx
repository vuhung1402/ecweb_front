import React, { useEffect, useState } from "react";
import VoucherDetailContainer from "./VoucherDetailContainer";
import { Button, DatePicker, Input, InputNumber, message, Select } from "antd";
import { dateFormat } from "@api/api";
import { ConfirmButtonWrapper } from "../products/Products";
import { voucherStatus, voucherType } from "@constants/index";
import { InforDetailWrapper, VoucherInforWrapper } from "./VoucherDetail";
import { useCreateVoucher, useGetVoucherDetail, useUpdateStatus, useUpdateVoucher } from "../voucher/function";
import dayjs from "dayjs";
import { SUCCESS } from "@utils/message";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { useNavigate } from "react-router-dom";
import Loading from "@widgets/Loading/Loading";

const VoucherDetail = (props) => {
    const { voucherId, mode } = props;
    const { refetchVoucher } = props;

    const navigate = useNavigate()
    const [state, setState] = useState(
        {
            name: '',
            discount: 0,
            minPrice: 0,
            type: '',
            expiredAt: 0,
        }
    )

    const { data: voucherDetail, isLoading: isGetVoucherDetail, refetch: refetchVoucherDetail,
        isRefetching: isRefetchVoucherDetail } = useGetVoucherDetail(voucherId);

    const mutateAddVoucher = useCreateVoucher();
    const mutateUpdateVoucher = useUpdateVoucher();
    const mutateUpdateStatus = useUpdateStatus();

    useEffect(() => {
        if (mode === 'edit') {
            // setState(prev => ({ ...prev }));
            getDetail();
        };

        if (mode === 'new') {
            setState(prev => ({ ...prev }));
            onCancel();
        };
    }, [mode, voucherId, isGetVoucherDetail]);

    const onChange = (value, atrb) => {
        setState({
            ...state,
            [atrb]: value
        })
    }

    const onOk = () => {
        if (state.expiredAt < dayjs(new Date()).valueOf()) {
            message.error("Ngày hết hạn không hợp lệ");
            return;
        }
        if (mode === 'edit') {
            const body = { ...state, id: voucherId };
            mutateUpdateVoucher.mutateAsync(body, {
                onSuccess: () => {
                    // handleModifiedProduct();
                    refetchVoucher();
                    refetchVoucherDetail();
                    message.success(SUCCESS);
                },
                onError: (error) => {
                    const response = error?.response?.data;
                    if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                        logAgain();
                        navigate('/login');
                    } else {
                        message.error(response?.message);
                    }
                }
            })
        };

        if (mode === 'new') {
            const body = { ...state };
            mutateAddVoucher.mutateAsync(body, {
                onSuccess: () => {
                    // handleModifiedProduct();
                    refetchVoucher();
                    message.success(SUCCESS);
                },
                onError: (error) => {
                    const response = error?.response?.data;
                    if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                        logAgain();
                        navigate('/login');
                    } else {
                        message.error(response?.message);
                    }
                }
            })
            onCancel();
        };
    }

    const onUpdateStatus = (status) => {
        if (state.expiredAt < dayjs(new Date()).valueOf()) {
            message.error("Ngày hết hạn không hợp lệ");
            return;
        }
        const body = { id: voucherId, status };
        mutateUpdateStatus.mutateAsync(body, {
            onSuccess: () => {
                // handleModifiedProduct();
                refetchVoucher();
                message.success(SUCCESS);
            },
            onError: (error) => {
                const response = error?.response?.data;
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login');
                } else {
                    message.error(response?.message);
                }
            }
        })
    }

    const getDetail = () => {
        const voucher = voucherDetail?.voucher;
        setState(prev => ({
            ...prev,
            name: voucher?.name,
            discount: voucher?.discount,
            minPrice: voucher?.minPrice,
            type: voucher?.type,
            expiredAt: voucher?.expiredAt,
        }));
    }

    const onCancel = () => {
        setState((prev) => ({
            ...prev,
            name: '',
            discount: 0,
            minPrice: 0,
            type: '',
            expiredAt: 0,
        }));
    };

    if(!voucherId && mode !== 'new') return <div className="font-bold">Chi tiết sản phẩm sẽ hiển thị ở đây</div>

    if(isGetVoucherDetail) return <Loading/>

    return (
        <VoucherDetailContainer>
            <VoucherInforWrapper>
                <InforDetailWrapper>
                    <div className="w-32 min-w-32">Tên voucher</div>
                    <Input
                        value={state.name}
                        placeholder="Nhập tên voucher"
                        type=""
                        className="w-full"
                        onChange={(e) => onChange(e.target.value, 'name')}
                    />
                </InforDetailWrapper>
                <InforDetailWrapper>
                    <div className="w-32 min-w-32">% giảm</div>
                    <InputNumber
                        value={state.discount}
                        className="w-full"
                        defaultValue={100}
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                        parser={(value) => value?.replace('%', '')}
                        onChange={(value) => onChange(value, 'discount')}
                    />
                </InforDetailWrapper>
                <InforDetailWrapper>
                    <div className="w-32 min-w-32">Giá tối thiểu</div>
                    <InputNumber
                        value={state.minPrice}
                        placeholder="Nhập giá tối thiểu"
                        type=""
                        className="w-full"
                        onChange={(value) => onChange(value, 'minPrice')}
                        formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\VND\s?|(,*)/g, '')}
                    />
                </InforDetailWrapper>
                <InforDetailWrapper>
                    <div className="w-32 min-w-32">Loại</div>
                    <Select
                        value={state.type}
                        showSearch
                        placeholder="Select a person"
                        className="w-full"
                        optionFilterProp="label"
                        onChange={(value) => onChange(value, 'type')}
                        // onSearch={onSearch}
                        options={[
                            {
                                value: voucherType.DISCOUNT,
                                label: 'Giảm tiền hoá đơn',
                            },
                            {
                                value: voucherType.SHIPPING,
                                label: 'Giảm tiền ship',
                            },
                        ]}
                    />
                </InforDetailWrapper>
                <InforDetailWrapper>
                    <div className="">Ngày hết hạn</div>
                    <DatePicker
                        value={state.expiredAt !== 0 ? dayjs(state.expiredAt) : dayjs(new Date())}
                        format={dateFormat}
                        onChange={(date, dateString) => onChange(dayjs(date).valueOf(), 'expiredAt')}
                        className="w-full"
                    />
                </InforDetailWrapper>
            </VoucherInforWrapper>
            <ConfirmButtonWrapper>
                {
                    mode === 'edit' && voucherDetail?.voucher?.status !== voucherStatus.RELEASED &&
                    <Button
                        onClick={() => onUpdateStatus(voucherStatus.RELEASED)}
                        loading={mutateUpdateStatus.isPending}
                        type="primary"
                        className="font-bold"
                    >
                        {voucherDetail?.voucher?.status === voucherStatus.EXPIRED && 'Phát hành lại'}
                        {voucherDetail?.voucher?.status === voucherStatus.UNRELEASED && 'Phát hành'}
                    </Button>
                }
                <Button
                    onClick={onOk}
                    // loading={pendingUpdateProduct || pendingAddProduct}
                    type="primary"
                    className="font-bold"
                >
                    {mode === 'new' && 'Tạo mới'}
                    {mode === 'edit' && 'Cập nhật'}
                </Button>
            </ConfirmButtonWrapper>
        </VoucherDetailContainer>
    )
}

export default VoucherDetail