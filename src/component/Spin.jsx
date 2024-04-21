
import React from 'react';
import { Alert, Flex, Spin } from 'antd';

const Loading = () => {
    return(
        // <Spin tip={
        //     (
        //         <div>Đang tải dữ liệu</div>
        //     )
        // }>
        //     <Alert
        //         message="Đang tải dữ liệu"
        //         description="   "
        //         type="info"
        //     />
        // </Spin>
        <Spin tip ="Loading"/>
    )
}

export default Loading