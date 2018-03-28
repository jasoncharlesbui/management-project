/**
 * Mocking client-server processing
 */
import config from './apiConfig'

import _products from './products.json'
import * as fromOption from './options'



const TIMEOUT = 100


export const getProducts = (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT);

export {
    fromOption
}
