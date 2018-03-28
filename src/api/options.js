import fetch from 'node-fetch'
import { getAuthorizationHeader } from '../utils'

import defaultConfig from './apiConfig'

const endPoint = [
    "options.json",
    "fields=id,name"
].join("&");

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
        .then(data => {
            return data;
        });
}