import fetch from 'node-fetch'
import { getAuthorizationHeader } from '../utils'

import { metaData } from './metaData'

import defaultConfig from './apiConfig'

const endPoint = [
    `optionSets/${metaData.PRODUCT}.json?paging=false`,
    "fields=options[id,name,code,attributeValues]"
].join("&");

const transfrom = data => {
    let output = [];
    data.options
        .map(d => {
            const o = {
                id: d.id,
                name: d.name,
                translations: 'not-yet',
                price: d.attributeValues.find(x => x.attribute.id == metaData.PRODUCT_PRICE).value,
                inventory: d.attributeValues.find(x => x.attribute.id == metaData.PRODUCT_INVENTORY).value,
                image_url: d.attributeValues.find(x => x.attribute.id == metaData.PRODUCT_IMAGE_URL).value
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
            "X-Requested-With": "XMLHttpRequest"
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