import { Modal, Tabs, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import AddProduct from "../AddProduct";
import { handleUploadListImage, handleUploadToFirebase, uuid } from "@utils/function";

import "./style.scss"
import { category } from "@pages/admin/products/mock";
import { useNavigate } from "react-router-dom";
import { addProduct } from "@pages/admin/products/function";
import { TOKEN_INVALID } from "@utils/error";
import { LOGIN_AGAIN } from "@utils/message";

const NewProduct = (props) => {

    const { open, type, idCategory, idSubCategory, detailData } = props;
    const { handleCloseModalProduct } = props;

    const uploadImageRef = useRef(null);
    const navigate = useNavigate();

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
        colorUid:'',
        
    });

    useEffect(() => {
        // state.category = category;
        state.idCategory = idCategory;
        state.idSubCategory = idSubCategory;
        setState((prev) => ({ ...prev }))
    }, [])

    // mode edit
    useEffect(() => {
        if (type === 'edit' && Object.keys(detailData).length > 0) {
            // state.color = detailData?.color;
        };
    }, [type, detailData]);

    useEffect(() => {
        const element = document.getElementsByClassName('ant-modal-content');
        const modalBodyElement = document.getElementsByClassName('ant-modal-body');

        if (element?.[0]) {
            const parentNode = element?.[0]?.parentElement;
            parentNode.style.height = '100%';
        };

        if (modalBodyElement?.[0]) modalBodyElement?.[0]?.classList.add('scrollbar-hide');
    }, [open]);

    const title = {
        'delete': 'Bạn có chắc chắn muốn xoá!!',
        'edit': 'Chỉnh sửa sản phẩm',
        'create': 'Tạo mới sản phẩm',
    }[type];

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
        setState(prev => ({...prev, addLoading: true}));
        const { description, nameProduct, codeProduct, price, fileList, color, mainImage, hoverImage, idCategory, idSubCategory, total } = state;

        if(fileList?.length === 0){
            setState(prev => ({...prev, addLoading: false}));
            message.error("Vui Lòng thêm ảnh cho sản phẩm");
            return;
        }
        if(description.length === 0){
            setState(prev => ({...prev, addLoading: false}));
            message.error("Vui Lòng thêm mô tả cho sản phẩm");
            return;
        }
        if(nameProduct.length === 0){
            setState(prev => ({...prev, addLoading: false}));
            message.error("Vui Lòng thêm tên cho sản phẩm");
            return;
        }
        if(codeProduct.length === 0){
            setState(prev => ({...prev, addLoading: false}));
            message.error("Vui Lòng thêm mã cho sản phẩm");
            return;
        }
        if(price.length === 0){
            setState(prev => ({...prev, addLoading: false}));
            message.error("Vui Lòng thêm giá cho sản phẩm");
            return;
        }
        if(mainImage.length === 0){
            setState(prev => ({...prev, addLoading: false}));
            message.error("Vui Lòng chọn ảnh chính cho sản phẩm");
            return;
        }
        if(hoverImage.length === 0){
            setState(prev => ({...prev, addLoading: false}));
            message.error("Vui Lòng chọn ảnh reivew cho sản phẩm");
            return;
        }
        if(idCategory.length === 0){
            setState(prev => ({...prev, addLoading: false}));
            message.error("Vui Lòng chọn danh mục cho sản phẩm");
            return;
        }
        if(idSubCategory.length === 0){
            setState(prev => ({...prev, addLoading: false}));
            message.error("Vui Lòng chọn danh mục phụ cho sản phẩm");
            return;
        }
        if(total.length === 0){
            setState(prev => ({...prev, addLoading: false}));
            message.error("Vui Lòng thêm số lượng trong kho hàng cho sản phẩm");
            return;
        }

        handleUploadListImage(fileList, color, hoverImage, mainImage)
            .then(array_image => {
                console.log({array_image});
                const body = {
                    name: nameProduct,
                    total,
                    codeProduct: codeProduct,
                    price: price,
                    array_color: array_image.newColor,
                    category_id: idCategory,
                    sub_category_id: idSubCategory,
                    array_image: array_image.result,
                    description,
                    imagePrimaryAndHover: array_image.imgReview,
                };
        
                return addProduct(body);
            })
            .then(result => {
                if(result?.success){
                    setState(prev => ({...prev, addLoading: false}));
                    message.success("Thành công!");
                } else {
                    if(result?.message === TOKEN_INVALID){
                        navigate("/login");
                        message?.info(LOGIN_AGAIN);
                    } else {
                        setState(prev => ({...prev, addLoading: false}));
                        message.error(result?.message);
                    }
                }
            })
            .catch(error => {
                setState(prev => ({...prev, addLoading: false}));
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
        }));
        navigate({
            pathname:'/admin',
            search: `?url=${0}`
        });
    };

    const okText = {
        'edit': 'Xác nhận',
        'create': 'Thêm mới',
    }[type];

    return (
        <div className="px-10 py-3 h-screen">
            <Tabs
                type="card"
                items={[
                    {
                        label: `Sản phẩm mới`,
                        key: 'addNewProduct',
                        children: (
                            <AddProduct
                                // category={state.category}
                                addLoading={state.addLoading}
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
                        ),
                    }
                ]}
            />
        </div>
    )
}

export default NewProduct