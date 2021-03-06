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

export const acAddBill = () => ({
    type: actionTypes.ADD_BILL
})

export const acRemoveBill = (cartId) => ({
    type: actionTypes.REMOVE_BILL,
    cartId
})

export const acRemoveFromCart = (productId, cartId) => ({
    type: actionTypes.REMOVE_FROM_CART,
    productId,
    cartId
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