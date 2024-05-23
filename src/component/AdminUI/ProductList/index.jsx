import React, { useEffect, useState } from 'react';
import { Button, Space, Switch, Table, Tag } from 'antd';
import DeleteIcon from "@icon/deleteIcon.svg"
import EditIcon from "@icon/edit.svg"
import DropDownSubCategory from '../DropDownSubCategory';
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { changeStatusOnlShop, getProductsByCategory } from '@pages/admin/products/function';
import ModalCategory from '@component/ModalCategory';
import ModalProduct from '../ModalProduct';

const ProductList = (props) => {
    const { idCategory, subCategory, products } = props;
    const { handleOpenModal, handleChangeSubCategory } = props; // function

    const [state, setState] = useState({
        data: [],
        name: '',
        idSubCategory: '',
        isModalOpen: false,
        modalType: '',
        isModalProductOpen: false,
        modalProductType:'',
    })

    useEffect(() => {
        // state.data = getProductsByCategory(idCategory)
        state.data = products;
        state.idSubCategory = subCategory?.[0]?.sub_category_id;
        state.name = subCategory?.[0]?.name;
        setState((prev) => ({ ...prev }))
    }, [])

    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'product_id',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
        },
        {
            title: 'Danh mục phụ',
            dataIndex: 'name_sub_category',
        },
        {
            title: 'Trạng thái số lượng',
            dataIndex: 'status',
        },
        {
            title: 'Trạng thái bán hàng',
            dataIndex: 'onlShop',
            render: (_, record) => {
                const obj = state.data?.find(item => item.product_id === record?.product_id);
                return (
                    <Switch checked={obj?.onlShop} onChange={(checked) => handleOnchange(checked, record)} />
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div className='cursor-pointer'>
                        <EditIcon />
                    </div>
                    <div className='cursor-pointer'>
                        <DeleteIcon />
                    </div>
                </Space>
            ),
        },
    ];

    const handleOnchange = (checked, record) => {
        const object = state.data.map((item) => {
            if (item?.product_id === record?.product_id) {
                return {
                    ...item,
                    onlShop: checked,
                }
            }
            return item
        });
        //goi api changeStatus onlShop
        // changeStatusOnlShop(record?.product_id, checked)
        setState((prev) => ({ ...prev, data: object }));
    }

    const handleModalProduct = (type) => {
        if (type === 'create' || type === 'edit') {
            state.modalProductType = type;
            state.isModalProductOpen = true;
        } else {
            state.isModalProductOpen = false;
        }
        setState(prev => ({...prev}));
    };

    const handleCloseModalProduct = () => {
        state.isModalProductOpen = false;
        setState(prev => ({...prev}));
    }

    const handleSelect = (value, option) => {
        state.idSubCategory =  option?.value
        state.name = option?.label
        setState((prev) => ({...prev}))
    }

    const onNameChange = (event) => {
        state.name = event.target.value
        setState((prev) => ({...prev}))
    };

    return (
        <div>
            <div className='flex gap-3 items-center justify-between mb-3 px-2'>
                <div className=' flex items-center gap-3'>
                    <Button onClick={() => handleOpenModal('edit')} icon={<EditOutlined />} type='primary' >
                        Sửa danh mục
                    </Button>

                    <Button onClick={() => handleModalProduct('create')} icon={<PlusOutlined />} type='primary' >
                        Thêm sản phẩm
                    </Button>
                    <ModalProduct
                        idCategory={idCategory}
                        idSubCategory={state.idSubCategory}
                        open={state.isModalProductOpen}
                        type={state.modalProductType}
                        handleModalProduct={handleModalProduct}
                        handleCloseModalProduct={handleCloseModalProduct}
                    />
                </div>
                <DropDownSubCategory
                    name={state.name}
                    idCategory={idCategory}
                    subCategory={subCategory}
                    idSubCategory={state.idSubCategory}
                    handleChangeSubCategory={handleChangeSubCategory}
                    handleSelect={handleSelect}
                    onNameChange={onNameChange}
                />
            </div>
            <Table
                columns={columns}
                dataSource={products}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 30
                }}
            />
        </div>
    )
}

export default ProductList;