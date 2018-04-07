const numberWithThousands = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const replaceAll = (string, search, replacement) => {
    return string.replace(new RegExp(search, 'g'), replacement);
};

export {
    numberWithThousands,
    replaceAll
}