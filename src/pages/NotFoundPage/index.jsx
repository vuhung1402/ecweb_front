import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate()

  const hanldeOnclick = () =>{
    navigate('/')
  }


  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={hanldeOnclick} type="primary">Back Home</Button>}
    />
  )
}
export default NotFoundPage;