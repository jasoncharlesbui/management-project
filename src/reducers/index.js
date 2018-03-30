import { combineReducers } from 'redux'
import products, * as fromProducts from './products'
import cart, * as fromCart from './cart'

// action types
export const actionTypes = {
    ...fromProducts.actionTypes,
    ...fromCart.actionTypes
}

// reducers
export default combineReducers({
    cart,
    products
})

// selectors

export {
    fromCart,
    fromProducts
}