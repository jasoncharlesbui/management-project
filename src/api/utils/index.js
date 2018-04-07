//For adding thousands sperator
const numberWithThousands = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//For replacing all occurrences in a string
const replaceAll = (string, search, replacement) => {
    return string.replace(new RegExp(search, 'g'), replacement);
};

export {
    numberWithThousands,
    replaceAll
}