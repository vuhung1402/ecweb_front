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
    const { idCategory, subCategory } = props;
    const { handleOpenModal, handleChangeSubCategory } = props; // function

    const data = [
        {
            "name": "FEARLESS Apple baby tee",
            "price": 330000,
            "total_number": 0,
            "primary_image": "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faothun%2FFEARLESS%20Apple%20baby%20tee%2Fz5366256165971_4721defa138815d96779a43acc9378d8.jpg?alt=media&token=65e03673-bf59-4968-8105-2f4754f3bf42",
            "category_id": "a",
            "sub_category_id": "1",
            "name_sub_category": "Áo thun",
            "product_id": "10",
            "status": "Còn hàng",
            "onlShop": false,
            "createDate": "12/02/2002"
        },
        {
            "name": "FEARLESS Apple baby tee 123",
            "price": 330000,
            "total_number": 0,
            "primary_image": "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faothun%2FFEARLESS%20Apple%20baby%20tee%2Fz5366256165971_4721defa138815d96779a43acc9378d8.jpg?alt=media&token=65e03673-bf59-4968-8105-2f4754f3bf42",
            "category_id": "a",
            "sub_category_id": "1",
            "name_sub_category": "Áo thun",
            "product_id": "11",
            "status": "Còn hàng",
            "onlShop": true,
            "createDate": "12/02/2002"
        }
    ];

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
        state.data = data;
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
        console.log('running');
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
        console.log("id: ", option.value)
        console.log("name: ", option.label)
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
                dataSource={data}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 30
                }}
            />
        </div>
    )
}

export default ProductList;