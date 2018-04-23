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

export const acRemoveFromCart = (productId) => ({
    type: actionTypes.REMOVE_FROM_CART,
    productId
})


// thunks
export const acAddToCart = productId => (dispatch, getState) => {
    // if (getState().products.byIds[productId].inventory > 0) {
    dispatch(acAddToCartUnsafe(productId));
    // }
}

export const acChangeQuantity = (productId, value) => (dispatch, getState) => {
    if (value >= 1) {
        dispatch(acChangeQuantityUnsafe(productId, value));
    }
}