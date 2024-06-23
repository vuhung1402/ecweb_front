import { endpoint } from "@api/api";

export const getAddressInfo = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${endpoint}/users/get_address/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}