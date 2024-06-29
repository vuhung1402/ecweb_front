import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Popover, Skeleton, Space, Switch, Table, Tag, message } from 'antd';
import DeleteIcon from "@icon/deleteIcon.svg"
import EditIcon from "@icon/edit.svg"
import DropDownSubCategory from '../DropDownSubCategory';
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { deleteProduct, productDetail, updateOnlShopStatus } from '@pages/admin/products/function';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyVN } from '@utils/function';
import { useDispatch } from 'react-redux';
import { clear } from '@redux/actions';
import { TOKEN_INVALID } from '@utils/error';

const ProductList = (props) => {
    const { idCategory, subCategory, products, skeletonLoading } = props;
    const { handleOpenModal, handleChangeSubCategory, getData, filterData } = props; // function

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        // if(subCategory?.length === 0){
        //     state.idSubCategory='';
        // }
        state.idSubCategory = '';
        state.data = products;
        const subIndex = subCategory.findIndex(item => item?.sub_category_id === state.idSubCategory);
        state.name = subCategory?.[subIndex]?.name;
        setState((prev) => ({ ...prev }))
    }, [subCategory?.length]);

    const handleDetail = async (product_id) => {
        navigate(
            {
                pathname: `/admin/product/edit`,
            },
            {
                state: {
                    product_id,
                }
            }
        );
        // call api get product detail
        // then, set state -> detailData
        // set modal open
    };

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
            title: 'Mã sản phẩm',
            dataIndex: 'code',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (_, record) => {
                return (
                    <div>{formatCurrencyVN(record?.price)}</div>
                )
            }
        },
        {
            title: 'Ngày thêm sản phẩm',
            dataIndex: 'createDate',
        },
        {
            title: 'Trạng thái số lượng',
            dataIndex: 'total_number',
        },
        {
            title: 'Trạng thái bán hàng',
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div
                        className='cursor-pointer'
                        onClick={() => handleDetail(record?.product_id)}
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
            if (isUpdateOnlShop?.message === "You're not authenticated") {
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
        <div>
            <div className='flex gap-3 items-center justify-between mb-3 px-2'>
                <div className=' flex items-center gap-3'>
                    <Button onClick={() => handleOpenModal('edit', idCategory)} icon={<EditOutlined />} type='primary' >
                        Sửa danh mục
                    </Button>

                    <Button onClick={() => navigate('/admin/product/new')} icon={<PlusOutlined />} type='primary' >
                        Thêm sản phẩm
                    </Button>
                </div>
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
            {
                !skeletonLoading &&
                <Table
                    columns={columns}
                    dataSource={products}
                    pagination={{
                        hideOnSinglePage: true,
                        pageSize: 30
                    }}
                />
            }
            <Skeleton loading={skeletonLoading} />
        </div>
    )
}

export default ProductList;