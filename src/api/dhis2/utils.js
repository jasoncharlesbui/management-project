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

const getAttribute = (object, attributeId) => {
    let attributeValue = object.attributeValues.find(attr => attr.attribute.id == attributeId);
    if (attributeValue) {
        return attributeValue.value;
    } else {
        return "";
    }
}

const getTrackedEntityAttribute = (object, attributeId) => {
    let attributeValue = object.attributes.find(attr => attr.attribute == attributeId);
    if (attributeValue) {
        return attributeValue.value;
    } else {
        return "";
    }
}


const getDataValue = (object, dataElementId) => {
    let dataValue = object.dataValues.find(dv => dv.dataElement == dataElementId);
    if (dataValue) {
        return dataValue.value;
    } else {
        return "";
    }
}

export {
    getAuthorizationHeader,
    pullData,
    pushData,
    generateUid,
    filterGenerator,
    getAttribute,
    getTrackedEntityAttribute,
    getDataValue
}