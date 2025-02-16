import React from "react";
import VoucherContainer from "./VoucherContainer";
import { Tabs } from "antd";
import { voucherTabs } from "@constants/index";
import VoucherList from "@_components/Admin/Voucher/VoucherList";
import useAdminProductStore from "@store/admin-product";

const Voucher = (props) => {
    const { isGetVouchers, vouchers } = props;
    const { handleVoucherDetail, refetchVoucher } = props;

    const {  setStatusVoucher } = useAdminProductStore();

    const onChange = (key) => {
        console.log(key);
        setStatusVoucher(key);
    };

    return (
        <VoucherContainer>
            <Tabs
                onChange={onChange}
                defaultActiveKey="1"
                rootClassName="!w-full !max-w-full"
                className="!w-full !max-w-full"
                items={voucherTabs.map((item) => {
                    return {
                        key: item?.key,
                        label: item?.label,
                        children: (
                            <VoucherList
                                vouchers={vouchers}
                                handleVoucherDetail={handleVoucherDetail}
                                refetchVoucher={refetchVoucher}
                            />
                        )
                    }
                })}
            />
        </VoucherContainer>
    )
}

export default Voucher