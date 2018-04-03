import { actionTypes } from '../constants/ActionTypes'

// actions
const acAddToCartUnsafe = (productId) => ({
    type: actionTypes.ADD_TO_CART,
    productId
})

const acChangeQuantityUnsafe = (productId, value) => ({
    type: actionTypes.CHANGE_QUANTITY,
    productId,
    value
})


// thunks
export const acAddToCart = productId => (dispatch, getState) => {
    dispatch(acAddToCartUnsafe(productId));
}

export const acChangeQuantity = (productId, value) => (dispatch, getState) => {
    dispatch(acChangeQuantityUnsafe(productId, value));
}