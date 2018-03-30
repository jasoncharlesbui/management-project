import { actionTypes } from '../reducers/cart'

// actions
const acAddToCartUnsafe = (productId) => ({
    type: actionTypes.ADD_TO_CART,
    productId
})


// thunks
export const acAddToCart = productId => (dispatch, getState) => {
    dispatch(acAddToCartUnsafe(productId));
}