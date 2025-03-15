import React from "react";
import UserIcon from "@icon/iconUser.svg"
import MoneyIcon from "@icon/money.svg"
import ProductIcon from "@icon/iconProduct.svg"
import HomeAdminContainer from "./HomeContainer";
import { TitleTotalRevenue, TitleTotalUser, TotalWrapper, TitleTotalProduct, TotalItemWrapper, IconWrraper, ChartWrapper, ChartTitle, TitleTotalOrder } from "./Home";
import { LineChart } from "@mui/x-charts";
import { DatePicker } from "antd";
import { formatCurrencyVN } from "@utils/function";

const HomeAdmin = (props) => {

    const { statistical, reveneuStatistical, isGetStatistical, isGetReveneuStatiscal } = props;
    const { handleChangeInfor } = props;

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
                    className=" w-96"
                    onChange={(date, dateString) => handleChangeInfor(dateString, 'year')}
                />
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10, 11, 12] }]}
                    series={[
                        {
                            data: reveneuStatistical?.data,
                            area: true,
                        },
                    ]}
                    width={600}
                    height={400}
                />
            </ChartWrapper>
        </HomeAdminContainer>
    )
}

export default HomeAdmin;