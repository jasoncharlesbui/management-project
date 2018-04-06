import fetch from 'node-fetch'
import { getAuthorizationHeader } from './utils.js'

import { metaData } from './metadata'

import defaultConfig from './config'

const endPoint = [
    `optionSets/${metaData.PRODUCT.id}.json?paging=false`,
    "fields=options[id,name,code,attributeValues]"
].join("&");

const transfrom = data => {
    let output = [];
    data.options
        .map(d => {
            const o = {
                id: d.id,
                name: d.name,
                code: d.code,
                translations: 'not-yet',
                price: d.attributeValues.find(x => x.attribute.id == metaData.PRODUCT_PRICE.id).value,
                inventory: d.attributeValues.find(x => x.attribute.id == metaData.PRODUCT_INVENTORY.id).value,
                image: d.attributeValues.find(x => x.attribute.id == metaData.PRODUCT_IMAGE.id).value
            }
            return o;
        })
        .forEach(d => (output.push(d)));
    return output;
}

export const apiFetchOptions = (config = defaultConfig) => {
    return fetch(`${config.baseURL}/api/${endPoint}`, {
        headers: {
            Authorization: getAuthorizationHeader(config.username, config.password),
            "X-Requested-With": "XMLHttpRequest",
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(result => {
            if (result.status === 200) {
                return result.json()
            }
            return new Error(result.statusText);
        })
        .then(data => transfrom(data))
        .then(data => {
            return data;
        });
}