import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Image, Upload, Button, Popover, Switch } from 'antd';

import './style.scss';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UploadImage = () => {
    const [state, setState] = useState({
        previewOpen: false,
        previewImage: '',
        fileList: [],
        mainImage: '',
        hoverImage: '',
    })

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
        {
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            url: 'https://thethaovanhoa.mediacdn.vn/372676912336973824/2023/10/3/alchemy-of-souls-16963118894912050652322.jpg'
        }
    ]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = (infor) => {
        setFileList(infor?.fileList)
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
            setChildState(prev => ({...prev}));
        },[parentState]);

        const style = {
            display: 'inline-block',
            width: '102px',
            height: '102px',
            verticalAlign: 'top',
        };

        const handleSelectImage = (type, uid) => {
            const value = childState[type] === uid ? '' : uid;
            setChildState(prev => ({...prev, [type] : value}));
        };

        const handleUpdate = () => {
            const { mainImage, hoverImage } = childState;
            state.mainImage = mainImage;
            state.hoverImage = hoverImage;
            setState(prev => ({...prev}));
        };

        return (
            <div className='flex flex-col items-center gap-2'>
                <div
                    style={style}
                    {...attributes}
                    {...listeners}
                >
                    {file.status === 'error' && isDragging ? originNode.props.children : originNode}
                </div>
                <Popover
                    trigger={"click"}
                    arrow={false}
                    id='popover-select-image'
                    title="Chọn ảnh hiển thị"
                    rootClassName='popover-upload-image'
                    content={
                        <div className='flex flex-col gap-3 text-xs font-medium'>
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
                        className='w-[102px]'
                        // onClick={() => setOpen(!open)}
                    >
                        Tùy chỉnh
                    </Button>
                </Popover>
            </div>
        );
    };

    return (
        <div className=' flex items-center gap-3 mt-3'>
            <div className=' w-28'>
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
                    <DraggableUploadListItem originNode={originNode} file={file} parentState={state}/>
                )}
            >
                {fileList.length >= 8 ? null : uploadButton}
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
};
export default UploadImage;