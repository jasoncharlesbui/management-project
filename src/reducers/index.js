import { combineReducers } from 'redux'
import products, * as fromProducts from './products'
import cart, * as fromCart from './cart'
import { saveState } from '../localStorage'

// action types
// export const actionTypes = {
//     ...types
// }

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


const getAddedIds = state => fromCart.getAddedIds(state)
const getQuantity = (state, id) => fromCart.getQuantity(state, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

// thunks
export const getCartProducts = (state, cartId) =>
    getAddedIds(state.cart[cartId]).map(id => ({
        ...getProduct(state, id),
        quantity: getQuantity(state.cart[cartId], id)
    }))

export const getCarts = (state) => Object.keys(state.cart)