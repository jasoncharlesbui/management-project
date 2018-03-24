import { actionTypes } from '../reducers'

export const acGetProducts = (products) => ({
    type: actionTypes.RECEIVED_PRODUCTS,
    products
})