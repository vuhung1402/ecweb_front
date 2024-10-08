import React, { useState, useEffect } from "react";

import { Popover, Image, Checkbox } from "antd";

const SelectImage = (props) => {

    const { imageList, onSelectImage, colorId, imageUid } = props;

    const [state, setState] = useState({
        selectedImage: '',
        open: false,
    });

    useEffect(() => {
        state.selectedImage = imageUid;
        setState(prev => ({...prev}));
    },[imageList])

    const handleClick = () => {
        state.open = !state.open;
        setState(prev => ({...prev}));
    };

    const handleSelectImage = (event, value) => {
        state.selectedImage = event?.target?.checked ? value?.uid : '';
        if (typeof onSelectImage === 'function') onSelectImage(event?.target?.checked ? value?.uid : '', colorId, 'image');
        setState(prev => ({...prev}));
    };

    return (
        <div>
            <Popover
                trigger={"click"}
                arrow={false}
                // open={state.open}
                id="select-image-popover"
                title="Chọn ảnh đại diện cho màu"
                content={
                    <div className="border-t w-96 max-w-[30vw] h-auto py-2 max-h-[30vh] flex justify-center flex-wrap gap-3 overflow-y-auto scrollbar-hide">
                        {imageList.map((item, index) => {
                            return (
                                <div className="flex flex-col items-center gap-2" key={`img-select-${index}`}>
                                    <Image
                                        id="test-123"
                                        src={item?.url || item?.thumbUrl}
                                        width={100}
                                        height={100}
                                    />
                                    <Checkbox
                                        checked={state.selectedImage === item?.uid}
                                        onChange={(event) => handleSelectImage(event, item)}
                                    ></Checkbox>
                                </div>
                            )
                        })}
                    </div>
                }
            >
                <div
                    className="hover:text-blue-500 font-medium truncate cursor-pointer max-w-[150px] select-none"
                    onClick={handleClick}
                    id="select-image-text"
                >
                    {state.selectedImage.length > 0 ? state.selectedImage : 'Chọn ảnh đại diện cho màu'}
                </div>
            </Popover>
        </div>
    );
};

export default SelectImage;