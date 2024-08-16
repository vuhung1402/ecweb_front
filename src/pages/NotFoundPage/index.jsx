import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const hanldeOnclick = () => {
        navigate("/");
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Result
                status="404"
                title="404"
                className="font-bold"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button className="font-bold" onClick={hanldeOnclick} type="primary">
                        Back Home
                    </Button>
                }
            />
        </div>
    );
};
export default NotFoundPage;
