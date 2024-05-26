import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const formatCurrencyVN = (number) => {
    if (isNaN(number)) return "";

    let formattedNumber = Math.ceil(number / 1000) * 1000;
    let numberStr = formattedNumber.toString();
    let [wholeNumber, decimal] = numberStr.split(",");

    wholeNumber = wholeNumber.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    formattedNumber = `${wholeNumber}`;

    return `${formattedNumber}₫`;
};

export const getNotInvalidColor = (colorArray) =>{
    for(let i = 0; i < colorArray?.length; i++){
        if(!colorArray[i]?.invalid){
            return colorArray[i];
        }
    }
}

export const addKeyToArraySize = (sizeArray) => {
    return sizeArray?.map((item) => {
        return{
            ...item,
            invalid: item?.total_number_with_size === 0
        };
    });
}


export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const handleUploadToFirebase = async (url) => {
    const imageRef = ref(storage, `images/${url.uid}`);
    try {
        const snapshot = await uploadBytes(imageRef, url);
        const downloadUrl = await getDownloadURL(imageRef);
        return downloadUrl;
    } catch (error) {
        console.error('Error handling CCCD upload:', error);
        throw error;
    }
};
