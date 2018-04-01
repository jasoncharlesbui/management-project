import { actionTypes } from '../constants/ActionTypes'

export const acGetProducts = (products) => ({
    type: actionTypes.RECEIVE_PRODUCTS,
    products
})