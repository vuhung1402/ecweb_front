import React from 'react';
import { Alert, Flex, Spin } from 'antd';
import "./Style.scss"

const Loading = () => {
    return (
        <div className = " h-[100px]" >
            <Spin className='w-full h-full' tip="Đang tải dữ liệu">
                <div></div>
            </Spin>
        </div>
    )
}

export default Loading