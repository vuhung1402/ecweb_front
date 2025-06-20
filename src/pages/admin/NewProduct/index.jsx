import React, { useEffect, useRef, useState } from "react";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import AddProduct from "@_components/Admin/NewProduct";

import { handleUploadListImage, uuid } from "@utils/function";
import useWindowSize from "@hooks/useWindowSize";
import { useAddProduct, useGetProductDetail, useUpdateProduct } from "@pages/admin/products/function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { SUCCESS } from "@utils/message";
import { LeftOutlined } from "@ant-design/icons";

import "./style.scss";
import { NewProductActionWrapper, NewProductWrapper } from "@pages/admin/products/Products";

const NewProduct = (props) => {

    const { open, type, idCategory, idSubCategory, productId } = props;
    const { handleBack, refetchProducts } = props;

    const params = useParams();
    const uploadImageRef = useRef(null);
    const navigate = useNavigate();
    const iw = useWindowSize().width;

    const [state, setState] = useState({
        addLoading: false,
        color: [],
        codeProduct: '',
        nameProduct: '',
        price: '',
        description: '',
        fileList: [],
        mainImage: '',
        hoverImage: '',
        category: [],
        idCategory: '',
        idSubCategory: '',
        total: '',
        colorUid: '',
    });

    const { isLoading: isGetProductDetail, data: productDetail, refetch: refetchProductDetail, isRefetching: isRefetchProductDetail } = useGetProductDetail(productId);

    const mutateAddProduct = useAddProduct();

    const mutateUpdateProduct = useUpdateProduct();

    useEffect(() => {
        state.idCategory = idCategory;
        state.idSubCategory = idSubCategory;
        setState((prev) => ({ ...prev }))
    }, []);

    // mode edit
    useEffect(() => {
        if (type === 'edit') {
            setState(prev => ({ ...prev }));
            // refetchProductDetail();
            getDetail();
        };

        if (type === 'new') {
            setState(prev => ({ ...prev }));
            onCancel();
        };
    }, [productId, type, isGetProductDetail, isRefetchProductDetail]);

    const getDetail = async () => {
        const product = productDetail?.product;
        setState(prev => ({
            ...prev,
            color: product?.array_color,
            fileList: product?.array_image,
            idCategory: product?.category_id,
            codeProduct: product?.code,
            description: product?.description,
            hoverImage: product?.image_hover?.uid,
            nameProduct: product?.name,
            price: product?.price,
            mainImage: product?.primary_image?.uid,
            idSubCategory: product?.sub_category_id,
            total: product?.total_number,
        }));
    }

    useEffect(() => {
        const element = document.getElementsByClassName('ant-modal-content');
        const modalBodyElement = document.getElementsByClassName('ant-modal-body');

        if (element?.[0]) {
            const parentNode = element?.[0]?.parentElement;
            parentNode.style.height = '100%';
        };

        if (modalBodyElement?.[0]) modalBodyElement?.[0]?.classList.add('scrollbar-hide');
    }, [open]);

    const handleAddColor = () => {
        const { color } = state;

        const newColor = {
            _id: uuid(),
            code_color: '#000000',
            name_color: 'Đen',
            total_number_with_color: "",
            image: {
                uid: '',
                url: '',
            },
            array_sizes: [],
        };

        const updateColor = color;
        updateColor.push(newColor);

        state.color = updateColor;
        setState(prev => ({ ...prev }));
    };

    const handleEditColor = (value, id, typeInfo) => {
        let image;
        if (typeInfo === 'image' && value !== '') {
            image = state.fileList.find((item) => item?.uid === value)
        }
        const obj = state.color?.map((item) => {
            if (item?._id === id) {
                return {
                    ...item,
                    [typeInfo]: typeInfo === 'image' ? image : value,
                }
            };
            return item;
        })
        setState((prev) => ({ ...prev, color: obj }))
    }

    const handleDeleteColor = (id) => {
        const { color } = state;

        const updateColor = [...color];

        const result = updateColor.filter((item) => item?._id !== id);

        state.color = result;
        setState((prev) => ({ ...prev }))
    }

    const handleAddSize = (colorUuid) => {
        const { color } = state;

        const newSize = {
            _id: uuid(),
            name_size: '',
            total_number_with_size: 0,
        };

        const updateColor = [...color];

        updateColor.map((item, index) => {
            if (item?._id === colorUuid) {
                state.colorUid = index;
                const updateSize = item?.array_sizes;
                return {
                    ...item,
                    array_sizes: updateSize?.push(newSize),
                };
            };

            return item;
        });

        state.color = updateColor;
        setState(prev => ({ ...prev }));
    };

    const handleEditSize = (value, colorId, idSize, typeInfo) => {
        const { color } = state;

        const updateColor = [...color];

        const obj = updateColor?.map((item) => {
            if (item?._id === colorId) {
                const result = item?.array_sizes?.map((itemSize) => {
                    if (itemSize?._id === idSize) {
                        return {
                            ...itemSize,
                            [typeInfo]: value,
                        }
                    }
                    return itemSize;
                })
                return {
                    ...item,
                    array_sizes: result,
                }
            }
            return item;
        })

        setState((prev) => ({ ...prev, color: obj }));
    }

    const handleDeleteSize = (id, idSize) => {
        const { color } = state;

        const updateColor = [...color];

        const result = updateColor.map((item, index) => {
            if (item?._id === id) {
                const updateSize = [...item?.array_sizes]
                return {
                    ...item,
                    array_sizes: updateSize?.filter((itemSize) => itemSize?._id !== idSize),
                };
            };
            return item;
        });

        setState(prev => ({ ...prev, color: result }));
    }

    const handleChangeInfo = (e, type) => {
        if (type === 'description' || type === 'price') {
            state[type] = e;
        } else {
            state[type] = e.target.value;
        };

        setState((prev) => ({ ...prev }));
    };

    const handleExportData = (type, data) => {
        if (type === 'list') state.fileList = data;
        if (type === 'image') {
            state.hoverImage = data?.hoverImage;
            state.mainImage = data?.mainImage;
        };

        setState(prev => ({ ...prev }));
    };

    const handleSelectCategory = (id, type) => {
        if (type === 'category_id') {
            state.idCategory = id;
            state.idSubCategory = '';
        }
        if (type === 'sub_category_id') {
            state.idSubCategory = id;
        }
        setState((prev) => ({ ...prev }))
    }

    const onOk = async () => {
        const { description, nameProduct, codeProduct, price, fileList, color, mainImage, hoverImage, idCategory, idSubCategory, total } = state;

        if (fileList?.length === 0) {
            setState(prev => ({ ...prev, addLoading: false }));
            message.error("Vui Lòng thêm ảnh cho sản phẩm");
            return;
        }
        if (description.length === 0) {
            setState(prev => ({ ...prev, addLoading: false }));
            message.error("Vui Lòng thêm mô tả cho sản phẩm");
            return;
        }
        if (nameProduct.length === 0) {
            setState(prev => ({ ...prev, addLoading: false }));
            message.error("Vui Lòng thêm tên cho sản phẩm");
            return;
        }
        if (codeProduct.length === 0) {
            setState(prev => ({ ...prev, addLoading: false }));
            message.error("Vui Lòng thêm mã cho sản phẩm");
            return;
        }
        if (price.length === 0) {
            setState(prev => ({ ...prev, addLoading: false }));
            message.error("Vui Lòng thêm giá cho sản phẩm");
            return;
        }
        if (mainImage.length === 0) {
            setState(prev => ({ ...prev, addLoading: false }));
            message.error("Vui Lòng chọn ảnh chính cho sản phẩm");
            return;
        }
        if (hoverImage.length === 0) {
            setState(prev => ({ ...prev, addLoading: false }));
            message.error("Vui Lòng chọn ảnh reivew cho sản phẩm");
            return;
        }
        if (idCategory.length === 0) {
            setState(prev => ({ ...prev, addLoading: false }));
            message.error("Vui Lòng chọn danh mục cho sản phẩm");
            return;
        }
        if (idSubCategory.length === 0) {
            setState(prev => ({ ...prev, addLoading: false }));
            message.error("Vui Lòng chọn danh mục phụ cho sản phẩm");
            return;
        }
        if (total.length === 0) {
            setState(prev => ({ ...prev, addLoading: false }));
            message.error("Vui Lòng thêm số lượng trong kho hàng cho sản phẩm");
            return;
        }

        handleUploadListImage(fileList, color, hoverImage, mainImage, params?.type)
            .then(array_image => {
                const body = {
                    product_id: productId,
                    name: nameProduct,
                    total: total.toString(),
                    codeProduct: codeProduct,
                    price: price,
                    array_color: array_image.newColor,
                    category_id: idCategory,
                    sub_category_id: idSubCategory,
                    array_image: array_image.result,
                    description,
                    imagePrimaryAndHover: array_image.imgReview,
                };
                if (type === 'edit') {
                    mutateUpdateProduct.mutateAsync(body, {
                        onSuccess: () => {
                            setState(prev => ({ ...prev, addLoading: false }));
                            refetchProductDetail();
                            refetchProducts();
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
                }else{
                    mutateAddProduct.mutateAsync(body, {
                        onSuccess: () => {
                            setState(prev => ({ ...prev, addLoading: false }));
                            // handleModifiedProduct();
                            refetchProducts();
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
                }
            })
            .catch(error => {
                setState(prev => ({ ...prev, addLoading: false }));
                message.error("Đã xảy ra lỗi khi xử lý ảnh.");
                console.error(error);
            });
    }

    const onCancel = () => {
        uploadImageRef.current?.clearData();
        setState((prev) => ({
            ...prev,
            color: [],
            codeProduct: '',
            nameProduct: '',
            price: '',
            description: '',
            fileList: [],
            mainImage: '',
            hoverImage: '',
            category: [],
            idCategory: '',
            idSubCategory: '',
            total: '',
        }));
    };

    if (!productId && type !== 'new') return <div>Chi tiết sản phẩm sẽ hiển thị ở đây</div>

    return (
        <NewProductWrapper isGetProductDetail={isGetProductDetail}>
            <NewProductActionWrapper>
                <div>
                    {iw < 960 && (
                        <div
                            className="w-fit px-4 py-1 flex items-center gap-3 font-bold hover:bg-[rgb(219,219,219)] rounded-md transition-colors duration-200 cursor-pointer"
                            onClick={handleBack}
                        >
                            <LeftOutlined />
                            <div>Trở về</div>
                        </div>
                    )}
                </div>
                <AddProduct
                    mainImage={state.mainImage}
                    hoverImage={state.hoverImage}
                    pendingAddProduct={mutateAddProduct.isPending}
                    pendingUpdateProduct={mutateUpdateProduct.isPending}
                    colorUid={state.colorUid}
                    ref={uploadImageRef}
                    description={state.description}
                    total={state.total}
                    price={state.price}
                    code={state.codeProduct}
                    name={state.nameProduct}
                    idCategory={state.idCategory}
                    idSubCategory={state.idSubCategory}
                    imageList={state.fileList}
                    color={state.color}
                    productId={productId}
                    handleAddColor={handleAddColor}
                    handleAddSize={handleAddSize}
                    handleDeleteColor={handleDeleteColor}
                    handleDeleteSize={handleDeleteSize}
                    handleChangeInfo={handleChangeInfo}
                    handleExportData={handleExportData}
                    handleEditColor={handleEditColor}
                    handleEditSize={handleEditSize}
                    handleSelectCategory={handleSelectCategory}
                    onOk={onOk}
                    onCancel={onCancel}
                />
            </NewProductActionWrapper>
        </NewProductWrapper>
    )
}

export default NewProduct