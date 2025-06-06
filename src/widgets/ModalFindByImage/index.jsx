import { PlusOutlined } from "@ant-design/icons";
import { useFindProductByImage } from "@pages/Product/function";
import { handleUploadListImage } from "@utils/function";
import { message, Modal, Upload } from "antd";
import React, { useState } from "react";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ModalFindByImage = (props) => {

    const { openModalFindByImage } = props;
    const { handleOpenModalFindByImage, handleDataFindByImage } = props;

    const [state, setState] = useState({
        note: '',
        previewOpen: false,
        previewImage: '',
        fileList: [],
    })

    const mutateFindProductByImage = useFindProductByImage();

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setState((prev) => ({ ...prev, previewImage: file.url || file.preview, previewOpen: true }));
    };
    const handleChange = ({ fileList: newFileList }) => {
        setState((prev) => ({ ...prev, fileList: newFileList }));
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const onOk = () => {
        handleUploadListImage(state.fileList)
            .then(array_image => {
                const body = {
                    image_path: array_image.result?.[0]?.url
                }
                console.log({ body })
                mutateFindProductByImage.mutateAsync(body, {
                    onSuccess: (data) => {
                        handleDataFindByImage(data?.productListAll_DataFormat);
                        handleOpenModalFindByImage();
                    },
                    onError: (error) => {
                        const response = error?.response?.data;
                        message.error(response?.message);
                    }
                })
            })
            .catch(error => {
                message.error("Đã xảy ra lỗi khi xử lý ảnh.");
                console.error(error);
            });
    }

    return (
        <>
            <Modal
                open={openModalFindByImage}
                onCancel={handleOpenModalFindByImage}
                title="Tìm kiếm bằng hình ảnh"
                okText="Tìm kiếm"
                cancelText="Huỷ"
                okButtonProps={{
                    loading: mutateFindProductByImage.isPending
                }}
                onOk={onOk}
            >
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={state.fileList}
                    maxCount={1}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {state.fileList.length >= 8 ? null : uploadButton}
                </Upload>
            </Modal>

            {state.previewImage && (
                <div>
                    <Image
                        wrapperStyle={{
                            display: 'none',
                        }}
                        preview={{
                            visible: state.previewOpen,
                            onVisibleChange: (visible) => setState((prev) => ({ ...prev, previewOpen: visible })),
                            afterOpenChange: (visible) => !visible && setState((prev) => ({ ...prev, previewImage: '' })),
                        }}
                        src={state.previewImage}
                    />
                </div>
            )}
        </>
    )
}

export default ModalFindByImage