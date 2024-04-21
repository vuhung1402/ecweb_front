import React from 'react';
import { Alert, Flex, Spin } from 'antd';

const Loading = () => {
    return(
        <Spin className='w-full' tip="Loading...">
            <Alert
                message="Đang tải dữ liệu"
                description="Further details about the context of this alert."
                type="info"
            />
        </Spin>
    )
}

export default Loading