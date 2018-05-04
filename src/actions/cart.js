import { actionTypes } from '../constants/ActionTypes'

// actions
const acAddToCartUnsafe = (productId, cartId) => ({
    type: actionTypes.ADD_TO_CART,
    productId,
    cartId
})

const acChangeQuantityUnsafe = (productId, cartId, value) => ({
    type: actionTypes.CHANGE_QUANTITY,
    productId,
    cartId,
    value
})

export const acRemoveFromCart = (productId) => ({
    type: actionTypes.REMOVE_FROM_CART,
    productId
})


// thunks
export const acAddToCart = (productId, billId) => (dispatch, getState) => {
    // if (getState().products.byIds[productId].inventory > 0) {
    dispatch(acAddToCartUnsafe(productId, billId));
    // }
}

export const acChangeQuantity = (productId, cartId, value) => (dispatch, getState) => {
    if (value >= 1) {
        dispatch(acChangeQuantityUnsafe(productId, cartId, value));
    }
}