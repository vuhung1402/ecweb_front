import React from "react";
import UserIcon from "@icon/iconUser.svg"
import MoneyIcon from "@icon/money.svg"
import ProductIcon from "@icon/iconProduct.svg"
import HomeAdminContainer from "./HomeContainer";
import { TitleTotalRevenue, TitleTotalUser, TotalWrapper, TitleTotalProduct, TotalItemWrapper, IconWrraper, ChartWrapper, ChartTitle, TitleTotalOrder } from "./Home";
import { DatePicker } from "antd";
import { formatCurrencyVN } from "@utils/function";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const HomeAdmin = (props) => {

    const { statistical, reveneuStatistical, isGetStatistical, isGetReveneuStatiscal } = props;
    const { handleChangeInfor } = props;

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]

    return (
        <HomeAdminContainer isGetReveneuStatiscal={isGetReveneuStatiscal} isGetStatistical={isGetStatistical}>
            <TotalWrapper>
                <div className="flex p-[1.6em] ">
                    <TotalItemWrapper>
                        <TitleTotalUser />
                        <h2 className="text-[20px] font-bold leading-5 ">{statistical?.totalUser}</h2>
                    </TotalItemWrapper>

                    <IconWrraper>
                        <UserIcon />
                    </IconWrraper>
                </div>
                <div className="flex p-[1.6em] ">
                    <TotalItemWrapper>
                        <TitleTotalRevenue />
                        <h2 className="text-[20px] font-bold leading-5 ">{formatCurrencyVN(statistical?.totalRevenue)}</h2>
                    </TotalItemWrapper>

                    <IconWrraper>
                        <MoneyIcon />
                    </IconWrraper>
                </div>
                <div className="flex p-[1.6em] ">
                    <TotalItemWrapper>
                        <TitleTotalProduct />
                        <h2 className="text-[20px] font-bold leading-5 ">{statistical?.totalProduct}</h2>
                    </TotalItemWrapper>

                    <IconWrraper>
                        <ProductIcon />
                    </IconWrraper>
                </div>
                <div className="flex p-[1.6em] ">
                    <TotalItemWrapper>
                        <TitleTotalOrder />
                        <h2 className="text-[20px] font-bold leading-5 ">{statistical?.totalTransaction}</h2>
                    </TotalItemWrapper>

                    <IconWrraper>
                        <ProductIcon />
                    </IconWrraper>
                </div>
            </TotalWrapper>
            <ChartWrapper>
                <ChartTitle />
                <DatePicker
                    picker="year"
                    className=" w-96 mb-5"
                    onChange={(date, dateString) => handleChangeInfor(dateString, 'year')}
                />
                <LineChart
                    className="!w-full"
                    width={730}
                    height={250}
                    data={reveneuStatistical?.data}
                    margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis width={100} />

                    <Tooltip />

                    <Legend />

                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />

                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ChartWrapper>
        </HomeAdminContainer>
    )
}

export default HomeAdmin;