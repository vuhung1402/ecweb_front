import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { message } from "antd";

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
        console.error('Error handling upload:', error);
        throw error;
    }
};

export const handleUploadListImage = async (list, color, idImgHover, idPrimaryImg) => {
    const imgReview = {};
    const result = [];
    const newColor = [];

    list?.map(async (item) => {
        let url;
        await Promise.all([handleUploadToFirebase(item?.originFileObj)]).then((values) => { url = values?.[0] });

        const data = {
            uid: item?.uid,
            url
        };

        result.push(data);

        if (data?.url?.length > 0) {
            if(item?.uid === idImgHover) imgReview.image_hover = data;

            if(item?.uid === idPrimaryImg) imgReview.primary_image = data;

            color?.map((value) => {
                if (value?.image?.uid === item?.uid) {
                    console.log({value})
                    const colorModified = {
                        ...value,
                        image: data,
                    };
                    console.log({colorModified})
                    newColor.push(colorModified);
                }
                // else{
                //     newColor.push(value)
                // }

            });

        };

    });

    return { result, newColor, imgReview };
};
