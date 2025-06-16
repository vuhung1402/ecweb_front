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
        tabKey: 0,
        query: `?status=0`,
        name:'', 
        nameInput:'',
    });

    const { data: orderList, isLoading } = useGetOrderList(state.query);

    const handleChangeTab = async (key) => {
        setState((prev) => ({ ...prev, data: undefined, tabKey: key, query: `?status=${key}&sort=-1` }));
    };

    const onSearch = (value, _e, info) => {
        setState((prev) => ({ ...prev, query: `?status=${state.tabKey}&sort=-1&search=${value}` }));
    }

    const onChange = (value) => {
        setState((prev) => ({ ...prev, nameInput: value }));
    }

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
                                    <OrderList 
                                        data={orderList?.format_order_list} 
                                        name={state.nameInput}
                                        onSearch={onSearch}
                                        onChange={onChange}
                                    />
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