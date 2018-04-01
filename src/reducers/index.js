import { combineReducers } from 'redux'
import products, * as fromProducts from './products'
import cart, * as fromCart from './cart'

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


const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

export const getCartProducts = state =>
    getAddedIds(state).map(id => ({
        ...getProduct(state, id),
        quantity: getQuantity(state, id)
    }))