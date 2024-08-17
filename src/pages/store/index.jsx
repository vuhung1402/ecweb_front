import React from "react";

const Store = () => {
    return (
        <div className=" flex ">
            <div className=" w-1/2">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2329.945289836327!2d106.77102695963534!3d10.850646406864948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1723365549444!5m2!1svi!2s"
                    width="600"
                    height="520"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            <div className=" w-1/2">
                <div className=" p-12">
                    <div className=" text-3xl font-bold">Liên hệ</div>
                    <div>
                        <div>Địa chỉ chúng tôi</div>
                        <div>01 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Hồ Chí Minh</div>
                    </div>
                    <div>
                        <div>Email của chúng tôi</div>
                        <div>dinhquanfananime4@gmail.com</div>
                    </div>

                    <div>
                        <div>Thời gian làm việc</div>
                        <div>Thứ 2 đến Chủ Nhật từ 13h đến 21h</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Store