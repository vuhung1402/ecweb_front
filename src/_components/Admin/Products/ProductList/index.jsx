import { Button, Popconfirm, Space, Switch, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '@widgets/Loading/Loading';
import DropDownSubCategory from '../DropDownSubCategory';

import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import DeleteIcon from "@icon/deleteIcon.svg";
import EditIcon from "@icon/edit.svg";
import { useDeleteProduct, useUpdateOnlShopStatus } from '@pages/admin/products/function';
import { NOT_AUTHENTICATION, TOKEN_INVALID } from '@utils/error';
import { formatCurrencyVN, logAgain } from '@utils/function';

import { ActionWrraper, DropDownSubCategoryWrapper, ProductActionWrapper, ProductListWrapper } from '@pages/admin/products/Products';
import { FAIL, SUCCESS } from '@utils/message';
import './style.scss';

const ProductList = (props) => {
    const { idCategory, subCategory, products, isGetProducts, pendingEditSubCategory } = props;
    const { handleOpenModal, handleChangeSubCategory, getData, filterData, handleDetail, refetchCategories, refetchProducts } = props; // function

    const navigate = useNavigate();

    const [state, setState] = useState({
        data: [],
        name: '',
        idSubCategory: '',
        isModalOpen: false,
        modalType: '',
        isModalProductOpen: false,
        modalProductType: '',
        detailData: {},
        switchLoading: {
            status: false,
            id: '',
        },
        confirmLoading: false,
    })

    const mutateUpdateOnlShop = useUpdateOnlShopStatus();

    const mutateDeleteProduct = useDeleteProduct()

    const [selectedRowKey, setSelectedRowKey] = useState(null); // Track selected row

    const onRowClick = (record) => {
        setSelectedRowKey(record.product_id); // Set selected row key
    };

    const rowClassName = (record) => {
        return record.product_id === selectedRowKey ? 'selected-row' : ''; // Highlight selected row
    };

    useEffect(() => {
        state.idSubCategory = '';
        state.data = products;
        const subIndex = subCategory.findIndex(item => item?.sub_category_id === state.idSubCategory);
        state.name = subCategory?.[subIndex]?.name;
        setState((prev) => ({ ...prev }))
    }, [subCategory?.length]);

    const onConfirm = async (product_id) => {
        const body = {
            product_id
        };

        mutateDeleteProduct.mutateAsync(body, {
            onSuccess: () => {
                refetchProducts();
                message.success(SUCCESS);
            },
            onError: (error) => {
                const response = error?.response?.data;
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login');
                } else {
                    message.error(FAIL);
                }
            }
        })
    }

    const columns = [
        {
            title: <div className='font-bold'>Mã sản phẩm</div>,
            dataIndex: 'code',
        },
        {
            title: <div className='font-bold'>Tên sản phẩm</div>,
            dataIndex: 'name',
            responsive: ['sm']
        },
        {
            title: <div className='font-bold'>Giá tiền</div>,
            dataIndex: 'price',
            render: (_, record) => {
                return (
                    <div>{formatCurrencyVN(record?.price)}</div>
                )
            },
            responsive: ['md']
        },
        {
            title: <div className='font-bold'>Ngày thêm sản phẩm</div>,
            dataIndex: 'createDate',
            responsive: ['xxl']
        },
        {
            title: <div className='font-bold'>Trạng thái số lượng</div>,
            dataIndex: 'total_number',
            responsive: ['xl']
        },
        {
            title: <div className='font-bold'>Trạng thái bán hàng</div>,
            dataIndex: 'onlShop',
            render: (_, record) => {
                // const obj = state.data?.find(item => item.product_id === record?.product_id);
                return (
                    <Switch
                        checked={record?.onlShop}
                        loading={state.switchLoading.status && record?.product_id === state.switchLoading.id}
                        onChange={(checked) => handleOnchange(checked, record)}
                    />
                )
            }
        },
        {
            title: <div className='font-bold'>Action</div>,
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div
                        className='cursor-pointer'
                        onClick={() => handleDetail(record?.product_id, 'edit')}
                    >
                        <EditIcon />
                    </div>
                    <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có chắc chắn muốn xóa sản phẩm này?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => onConfirm(record?.product_id)}
                        okButtonProps={{
                            loading: mutateDeleteProduct.isPending,
                        }}
                    >
                        <div className='cursor-pointer'>
                            <DeleteIcon />
                        </div>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleOnchange = async (checked, record) => {
        setState(prev => ({ ...prev, switchLoading: { status: true, id: record?.product_id } }));
        const body = {
            id: record?.product_id,
            onlShop: checked,
        };

        mutateUpdateOnlShop.mutateAsync(body, {
            onSuccess: () => {
                message.success(SUCCESS);
                setState(prev => ({ ...prev, switchLoading: { status: false, id: '' } }));
                refetchProducts()
            },
            onError: (error) => {
                const response = error?.response?.data;
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login');
                } else {
                    message.error(FAIL);
                }
            }
        });
    }

    const handleSelect = async (value, option) => {
        state.idSubCategory = option?.value;
        state.name = option?.label;
        setState((prev) => ({ ...prev }));
        await filterData(option?.value === "" ? idCategory : option?.value);
    }

    const onNameChange = (event) => {
        state.name = event.target.value
        setState((prev) => ({ ...prev }))
    };

    return (
        <ProductListWrapper>
            {
                isGetProducts ? <Loading /> :
                    <>
                        <ActionWrraper>
                            <ProductActionWrapper>
                                <Button
                                    className='font-bold'
                                    onClick={() => handleOpenModal('edit', idCategory)}
                                    icon={<EditOutlined />}
                                    type='primary'
                                >
                                    Sửa danh mục
                                </Button>

                                <Button
                                    className='font-bold'
                                    onClick={() => handleDetail('', 'new')}
                                    icon={<PlusOutlined />}
                                    type='primary'
                                >
                                    Thêm sản phẩm
                                </Button>
                            </ProductActionWrapper>
                            <DropDownSubCategoryWrapper>
                                <DropDownSubCategory
                                    name={state.name}
                                    idCategory={idCategory}
                                    subCategory={subCategory}
                                    idSubCategory={state.idSubCategory}
                                    handleChangeSubCategory={handleChangeSubCategory}
                                    handleSelect={handleSelect}
                                    onNameChange={onNameChange}
                                    getData={getData}
                                    refetchCategories={refetchCategories}
                                    pendingEditSubCategory={pendingEditSubCategory}
                                />
                            </DropDownSubCategoryWrapper>
                        </ActionWrraper>
                        <Table
                            rootClassName={`${products?.formatted_product?.length > 10 ? 'tableOrderWithPagination' : 'tableOrder'}`}
                            columns={columns}
                            bordered
                            dataSource={products?.formatted_product.map(product => ({ ...product, key: product.product_id }))}
                            pagination={{
                                hideOnSinglePage: true,
                                pageSize: 10
                            }}
                            rowClassName={rowClassName} // Add rowClassName prop
                            onRow={(record) => ({
                                onClick: () => onRowClick(record), // Handle row click
                            })}
                        />
                    </>
            }
        </ProductListWrapper>
    )
}

export default ProductList;