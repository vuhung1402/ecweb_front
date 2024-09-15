import React from "react";
import { Input, Button } from "antd";
import { MailOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Newsletter Section */}
                <div className="py-8 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <MailOutlined className="text-2xl mr-2" />
                            <h3 className="text-lg font-semibold">Đăng ký nhận tin</h3>
                        </div>
                        <div className="flex w-full sm:w-auto">
                            <Input
                                type=""                            
                                className="w-full sm:w-64"
                                placeholder="Nhập email của bạn"
                            />
                            <Button type="primary" className="ml-2">Đăng ký</Button>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Us */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Về chúng tôi</h2>
                        <h3 className="text-2xl font-semibold mb-2">QH SHOP</h3>
                        <p className="text-sm">Hộ kinh doanh QH SHOP</p>
                        <p className="text-sm">Trụ sở: 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, HCM</p>
                        <p className="text-sm">Mã số thuế: 8376984599-001</p>
                        <p className="text-sm">Ngày cấp: 08/08/2022</p>
                    </div>

                    {/* Support */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Hỗ trợ</h2>
                        <ul className="space-y-2">
                            {["Chính sách đổi trả", "Chính sách bảo mật", "Chính sách giao hàng", "Chính sách thanh toán", "Hướng dẫn mua hàng", "Cửa hàng"].map((item, index) => (
                                <li key={index}><a href="#" className="hover:text-blue-500 transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Kết nối</h2>
                        <div className="flex space-x-4">
                            <a href="#" className="text-2xl hover:text-blue-500 transition-colors"><FacebookOutlined /></a>
                            <a href="#" className="text-2xl hover:text-blue-400 transition-colors"><TwitterOutlined /></a>
                            <a href="#" className="text-2xl hover:text-pink-500 transition-colors"><InstagramOutlined /></a>
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Pháp lý</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Điều khoản sử dụng</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Chính sách bảo mật</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="py-6 border-t border-gray-200 text-center">
                    <p>&copy; 2024 QH SHOP. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;