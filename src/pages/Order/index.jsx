import React, { useState } from "react";
import { Tabs } from "antd";
import SideBar from "@widgets/SideBar";
import OrderList from "../../_components/Order/OrderList";

import { statusOrder } from "./mock";
import { useGetOrderList } from "./function";
import OrderContainer from "./OrderContainer";
import { ContentWrapper, SildeBarWrapper, TabWrapper, Title } from "./Order";

const Order = () => {
    const [state, setState] = useState({
        data: undefined,
        tabKey: 1,
        query: `?status=1`,
    });

    const { data: orderList, isLoading } = useGetOrderList(state.query);

    const handleChangeTab = async (key) => {
        setState((prev) => ({ ...prev, data: undefined, tabKey: key, query: `?status=${key}&sort=-1` }));
    };

    return (
        <OrderContainer isLoading = {isLoading}>
            <Title />
            <ContentWrapper>
                <SildeBarWrapper>
                    <SideBar />
                </SildeBarWrapper>
                <TabWrapper isLoading = {isLoading}>
                    <Tabs
                        onChange={handleChangeTab}
                        activeKey={state.tabKey}
                        className="font-bold"
                        items={statusOrder.map((item) => {
                            return {
                                key: item?.key,
                                label: item?.name,
                                children: (
                                    <OrderList data={orderList?.format_order_list} />
                                )
                            }
                        })}
                    />
                </TabWrapper>
            </ContentWrapper>
        </OrderContainer>
    );
};

export default Order;