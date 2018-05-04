import config from "./config.js";

const getAuthorizationHeader = (username, password) => {
    const encoded = new Buffer(username + ":" + password).toString("base64");
    return `Basic ${encoded}`;
};

const sample = (d = [], fn = Math.random) => {
    if (d.length === 0) return;
    return d[Math.round(fn() * (d.length - 1))];
};

const generateUid = (limit = 11, fn = Math.random) => {
    const allowedLetters = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"].join('');
    const allowedChars = ['0123456789', allowedLetters].join('');

    const arr = [sample(allowedLetters, fn)];

    for (let i = 0; i < limit - 1; i++) {
        arr.push(sample(allowedChars, fn));
    }

    return arr.join('');
};

const pullData = (endPoint) => {
    return fetch(config.baseURL + endPoint, {
        headers: {
            Authorization: getAuthorizationHeader(config.username, config.password)
        }
    })
        .then(res => res.json())
        .then(json => json);
};

const pushData = (endPoint, payload) => {
    return fetch(config.baseURL + endPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: getAuthorizationHeader(config.username, config.password)
        },
        body: JSON.stringify(payload)
    })
        .then(res => {
            if (res.status === 204) {
                return {};
            } else {
                return res.json();
            }
        })
        .then(json => json);
};

const filterGenerator = (filters) => {
    let filterString = "";
    Object.keys(filters).forEach(filterProperty => {
        if (filters[filterProperty].value) {
            if (filters[filterProperty].type === "property") {
                filterString += `&filter=${filters[filterProperty].property}:${filters[filterProperty].operator}:${filters[filterProperty].value}`;
            } else {
                filterString += `&filter=attributeValues.value:${filters[filterProperty].operator}:${filters[filterProperty].value}`;
            }
        }
    });

    return filterString;
};

export {
    getAuthorizationHeader,
    pullData,
    pushData,
    generateUid,
    filterGenerator
}