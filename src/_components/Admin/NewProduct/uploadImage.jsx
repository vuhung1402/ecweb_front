import React, { useEffect, useState, useImperativeHandle } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Image, Upload, Button, Popover } from 'antd';

import './style.scss';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UploadImage = React.forwardRef((props, ref) => {

    const { handleExportData, imageList, mainImage, hoverImage } = props;

    const [state, setState] = useState({
        mainImage: '',
        hoverImage: '',
    });

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        setFileList(imageList);
        setState(prev => ({...prev, mainImage: mainImage, hoverImage: hoverImage}))
    },[imageList])

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = (infor) => {
        handleExportData('list', infor?.fileList);
        setFileList(infor?.fileList)
    };

    const clearData = () => {
        setFileList([]);
        setPreviewImage('');
        setState((prev) => ({
            ...prev,
            mainImage: '',
            hoverImage: '',
        }))
    };
    useImperativeHandle(ref, () => ({
        clearData
    }));

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

    const DraggableUploadListItem = ({ originNode, file, parentState }) => {
        const { attributes, listeners, isDragging } = file;
        const { mainImage, hoverImage } = parentState;

        const [childState, setChildState] = useState({
            mainImage: '',
            hoverImage: '',
        });

        useEffect(() => {
            childState.mainImage = mainImage;
            childState.hoverImage = hoverImage;
            setChildState(prev => ({ ...prev }));
        }, [parentState]);

        const handleSelectImage = (type, uid) => {
            const value = childState[type] === uid ? '' : uid;
            setChildState(prev => ({ ...prev, [type]: value }));
        };

        const handleUpdate = () => {
            const { mainImage, hoverImage } = childState;
            state.mainImage = mainImage;
            state.hoverImage = hoverImage;
            const data = {
                'mainImage': mainImage,
                'hoverImage': hoverImage
            }
            handleExportData('image', data);
            setState(prev => ({ ...prev }));
        };

        return (
            <div
                className='flex flex-col items-center gap-2'
            >
                <div
                    {...attributes}
                    {...listeners}
                >
                    {file.status === 'error' && isDragging ? originNode.props.children : originNode}
                    <Popover
                        trigger={"click"}
                        arrow={false}
                        id='popover-select-image'
                        title="Chọn ảnh hiển thị"
                        rootClassName='popover-upload-image'
                        content={
                            <div className='flex flex-col gap-3 text-xs font-bold'>
                                <Checkbox
                                    checked={file?.uid === childState.mainImage}
                                    onChange={() => handleSelectImage('mainImage', file?.uid)}
                                >
                                    Ảnh chính
                                </Checkbox>
                                <Checkbox
                                    checked={file?.uid === childState.hoverImage}
                                    onChange={() => handleSelectImage('hoverImage', file?.uid)}
                                >
                                    Ảnh preview
                                </Checkbox>
                                <div className='w-full flex justify-end'>
                                    <Button
                                        type='primary'
                                        onClick={handleUpdate}
                                    >
                                        Cập nhật
                                    </Button>
                                </div>
                            </div>
                        }
                    >
                        <Button
                            className='w-[102px] mt-2 font-bold'
                        >
                            Tùy chỉnh
                        </Button>
                    </Popover>
                </div>
            </div>
        );
    };

    return (
        <div
            id='upload-image'
            className='flex flex-col sm:flex-row sm:items-center gap-3 mt-3'
        >
            <div className='w-32 min-w-32 font-bold'>
                Ảnh
            </div>

            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                rootClassName='upload-image-product'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                itemRender={(originNode, file) => (
                    <DraggableUploadListItem originNode={originNode} file={file} parentState={state} />
                )}
            >
                {uploadButton}
            </Upload>
            {previewImage && (
                <div>
                    <Image
                        wrapperStyle={{
                            display: 'none',
                        }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                </div>
            )}
        </div>
    );
});
export default UploadImage;