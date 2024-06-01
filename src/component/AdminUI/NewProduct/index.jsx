import { Modal, Tabs, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import AddProduct from "../AddProduct";
import { handleUploadListImage, handleUploadToFirebase, uuid } from "@utils/function";

import "./style.scss"
import { category } from "@pages/admin/products/mock";
import { useNavigate } from "react-router-dom";

const NewProduct = (props) => {

    const { open, type, idCategory, idSubCategory, detailData } = props;
    const { handleCloseModalProduct } = props;

    const uploadImageRef = useRef(null);
    const navigate = useNavigate();

    const [state, setState] = useState({
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
            totalColor: "",
            image: {
                uid: '',
                url: '',
            },
            size: [],
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
                const updateSize = item?.size;
                return {
                    ...item,
                    size: updateSize?.push(newSize),
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
                const result = item?.size?.map((itemSize) => {
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
                    size: result,
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
                const updateSize = [...item?.size]
                return {
                    ...item,
                    size: updateSize?.filter((itemSize) => itemSize?._id !== idSize),
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

        if(fileList?.length === 0){
            message.error("Vui Lòng thêm ảnh cho sản phẩm");
            return;
        }

        const array_image = await handleUploadListImage(fileList, color, hoverImage, mainImage);

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
        }
        console.log("body", body);
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