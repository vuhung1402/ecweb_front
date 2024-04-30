export const formatCurrencyVN = (number) => {
    if (isNaN(number)) return "";

    let formattedNumber = Math.ceil(number / 1000) * 1000;
    let numberStr = formattedNumber.toString();
    let [wholeNumber, decimal] = numberStr.split(",");

    wholeNumber = wholeNumber.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    formattedNumber = `${wholeNumber}`;

    return `${formattedNumber}₫`;
};