import React from "react";
import Footer from "@core/Footer";

import './style.scss';

const Store = () => {
    return (
        <div className="store-page w-full h-fit me:h-full flex flex-col">
            <div className="w-full flex flex-col me:flex-row h-full sm:px-[15px]">
                <div className="w-full h-[50vh] me:w-1/2 me:h-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2329.945289836327!2d106.77102695963534!3d10.850646406864948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1723365549444!5m2!1svi!2s"
                        className="w-full h-full p-4 me:px-12"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
                <div className="w-full me:w-1/2 me:border-l">
                    <div className="p-4 me:p-12">
                        <div className="title-contact text-3xl font-bold opacity-80">Liên hệ</div>
                        <div className="flex flex-col gap-7">
                            <div className="text-sm">
                                <p className="font-semibold opacity-80">Địa chỉ chúng tôi</p>
                                <p className="font-bold">01 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Hồ Chí Minh</p>
                            </div>
                            <div className="text-sm">
                                <div className="font-semibold opacity-80">Email của chúng tôi</div>
                                <div className="font-bold">dinhquanfananime4@gmail.com</div>
                            </div>
                            <div className="text-sm">
                                <div className="font-semibold opacity-80">Thời gian làm việc</div>
                                <div className="font-bold">Thứ 2 đến Chủ Nhật từ 13h đến 21h</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <Footer />
            </div>
        </div>
    )
}

export default Store