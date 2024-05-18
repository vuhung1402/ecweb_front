import React, { useEffect, useRef, useState } from "react";
import { Tabs } from "antd"
import ProductList from "@component/AdminUI/ProductList";
import Modal from "@component/ModalCategory";

const TabCategory = ({data}) => {
    const [state, setState] = useState({
        activeKey: data?.[0]?.category_id,
        isModalOpen: false,
        modalType: '',
    })
    useEffect(() => {
        if (data) {
            state.activeKey = data?.[0]?.category_id;
            setState((prev) => ({ ...prev }))
        }
    }, [data])

    const onChange = (newActiveKey) => {
        console.log("newActiveKey: ", newActiveKey);
        state.activeKey = newActiveKey;
        setState((prev) => ({ ...prev }))
    };

    const handleOpenModal = () => {
        state.isModalOpen = !state.isModalOpen;
        setState((prev) => ({...prev}))
    }

    // const deleteTab = (targetKey) => {
    //     state.isModalDeleteOpen = !state.isModalDeleteOpen;
    //     state.activeKey = targetKey
    //     setState((prev) => ({...prev}))
    // }

    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            state.modalType = 'create'
            handleOpenModal();
        } else {
            state.modalType = 'delete'
            handleOpenModal();
        }
        setState((prev) => ({...prev}))
    };

    return (
        <div>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={state.activeKey}
                onEdit={onEdit}
                items={data?.map((item, index) => {
                    return {
                        label: item.name,
                        key: item?.category_id,
                        children: (
                            <ProductList idCategory={item?.category_id} name = {item?.name} />
                        )
                    }
                })}
            />

            <Modal open = {state.isModalOpen} onCancel = {handleOpenModal} type = {state.modalType} />
        </div>
    )
}

export default TabCategory