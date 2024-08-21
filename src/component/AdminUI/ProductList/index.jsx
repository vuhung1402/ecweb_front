import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Switch, Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import Loading from '@component/Loading/Loading';
import DropDownSubCategory from '../DropDownSubCategory';

import { deleteProduct, updateOnlShopStatus } from '@pages/admin/products/function';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import useWindowSize from '@hooks/useWindowSize';
import { formatCurrencyVN } from '@utils/function';
import { TOKEN_INVALID } from '@utils/error';
import DeleteIcon from "@icon/deleteIcon.svg";
import EditIcon from "@icon/edit.svg";

import './style.scss';

const ProductList = (props) => {
    const { idCategory, subCategory, products, skeletonLoading } = props;
    const { handleOpenModal, handleChangeSubCategory, getData, filterData, handleDetail } = props; // function

    const navigate = useNavigate();
    const iw = useWindowSize().width;

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

    useEffect(() => {
        state.idSubCategory = '';
        state.data = products;
        const subIndex = subCategory.findIndex(item => item?.sub_category_id === state.idSubCategory);
        state.name = subCategory?.[subIndex]?.name;
        setState((prev) => ({ ...prev }))
    }, [subCategory?.length]);

    const onConfirm = async (product_id) => {
        setState(prev => ({ ...prev, confirmLoading: true }));
        const result = await deleteProduct(product_id);
        if (result?.success) {
            await getData();
            setState(prev => ({ ...prev, confirmLoading: false }));
            message.success(result?.message);
        } else {
            if (result?.message === TOKEN_INVALID) {
                message?.info("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
                navigate("/login");
            } else {
                setState(prev => ({ ...prev, confirmLoading: false }));
                message?.error("Không thành công!");
            }
        }
    }

    const columns = [
        {
            title:<div className='font-bold'>Mã sản phẩm</div>,
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
                const obj = state.data?.find(item => item.product_id === record?.product_id);
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
                            loading: state.confirmLoading,
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
        const isUpdateOnlShop = await updateOnlShopStatus(record?.product_id, checked)

        if (isUpdateOnlShop?.success) {
            await getData();
            setState(prev => ({ ...prev, switchLoading: { status: false, id: '' } }));
            message.success("Thành công!!");
        } else {
            if (isUpdateOnlShop?.message === TOKEN_INVALID || isUpdateOnlShop?.message === "You're not authenticated") {
                message.info("Phiên đăng nhập hết hạn!!");
                navigate('/login');
            } else {
                setState(prev => ({ ...prev, switchLoading: { status: false, id: '' } }));
                message.error("Không thành công!!");
            }
        }
    }

    const handleSelect = async (value, option) => {
        state.idSubCategory = option?.value;
        state.name = option?.label;
        setState((prev) => ({ ...prev }));
        await filterData(option?.value);
    }

    const onNameChange = (event) => {
        state.name = event.target.value
        setState((prev) => ({ ...prev }))
    };

    return (
        <div
            style={{
                height: iw > 640 ? 'calc(100vh - 120px)' : 'calc(100vh - 230ưpx)'
            }}
        >
            {
                products === undefined ? <Loading /> :
                    <>
                        <div className='flex flex-col 2xl:flex-row gap-3 items-center justify-end 2xl:justify-between mb-3 px-2'>
                            <div className='flex flex-col sm:flex-row w-full sm:items-center gap-3 justify-end 2xl:justify-normal'>
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
                            </div>
                            <div className='w-full flex justify-end'>
                                <DropDownSubCategory
                                    name={state.name}
                                    idCategory={idCategory}
                                    subCategory={subCategory}
                                    idSubCategory={state.idSubCategory}
                                    handleChangeSubCategory={handleChangeSubCategory}
                                    handleSelect={handleSelect}
                                    onNameChange={onNameChange}
                                    getData={getData}
                                />
                            </div>
                        </div>
                        {skeletonLoading && (
                            <Loading />
                        )}
                        {!skeletonLoading && (
                            <Table
                                rootClassName={`${products.length > 10 ? 'tableOrderWithPagination' : 'tableOrder'}`}
                                columns={columns}
                                dataSource={products}
                                pagination={{
                                    hideOnSinglePage: true,
                                    pageSize: 10
                                }}
                            />
                        )}
                    </>
            }
        </div>
    )
}

export default ProductList;