import { PlusOutlined } from "@ant-design/icons";
import { useRequestReturnOrder } from "@pages/OrderDetail/function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { handleUploadListImage, logAgain } from "@utils/function";
import { SUCCESS } from "@utils/message";
import { Image, message, Modal, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ModalRequestReturnOrder = (props) => {
    const { open, OrderId } = props;
    const { handleOpenModal, refetchOrderDetail, refetchOrderHistory } = props;

    const navigate = useNavigate();

    const [state, setState] = useState({
        note: '',
        previewOpen: false,
        previewImage: '',
        fileList: [],
    })

    const mutateRequestReturnOrder = useRequestReturnOrder();

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

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setState((prev) => ({ ...prev, previewImage: file.url || file.preview, previewOpen: true }));
    };
    const handleChange = ({ fileList: newFileList }) => {
        setState((prev) => ({ ...prev, fileList: newFileList }));
    };

    const onOk = () => {
        handleUploadListImage(state.fileList)
            .then(array_image => {
                const body = {
                    Order_id: OrderId,
                    description: state.note,
                    list_image: array_image.result
                }
                console.log({ body })
                mutateRequestReturnOrder.mutateAsync(body, {
                    onSuccess: () => {
                        handleOpenModal();
                        refetchOrderDetail();
                        refetchOrderHistory();
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
            })
            .catch(error => {
                message.error("Đã xảy ra lỗi khi xử lý ảnh.");
                console.error(error);
            });
    }

    return (
        <>
            <Modal
                title="Yêu cầu trả hàng"
                open={open}
                onCancel={handleOpenModal}
                onOk={onOk}
                okButtonProps={{
                    loading: mutateRequestReturnOrder.isPending
                }}
                okText="Gửi yêu cầu"
                cancelText="Huỷ"
            >
                <TextArea
                    rows={4}
                    placeholder="Ghi chú"
                    style={{
                        "margin-bottom": "10px",
                    }}
                    value={state.note}
                    onChange={(e) => setState((prev) => ({ ...prev, note: e.target.value }))}
                />
                <div>
                    Hình ảnh hư hại (6 hình)
                </div>
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={state.fileList}
                    maxCount={6}
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

export default ModalRequestReturnOrder;