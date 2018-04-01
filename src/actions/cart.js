import { actionTypes } from '../constants/ActionTypes'

// actions
const acAddToCartUnsafe = (productId) => ({
    type: actionTypes.ADD_TO_CART,
    productId
})


// thunks
export const acAddToCart = productId => (dispatch, getState) => {
    dispatch(acAddToCartUnsafe(productId));
}