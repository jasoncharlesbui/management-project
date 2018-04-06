import { combineReducers } from 'redux'
import { actionTypes } from '../constants/ActionTypes'

const products = (state, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                inventory: state.inventory - 1
            }
        default:
            return state;
    }
}

const byIds = (state = {}, action, demoConflict) => {
    switch (action.type) {
        case actionTypes.RECEIVE_PRODUCTS:
            return {
                ...action.products.reduce((obj, product) => {
                    obj[product.id] = product;
                    return obj;
                }, {})
            }
        default:
            const { productId } = action;
            if (productId) {
                return {
                    ...state,
                    [productId]: products(state[productId], action)
                }
            }
            return state;
    }
}

const visibleIds = (state = [], action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_PRODUCTS:
            return action.products.map(product => product.id);
        default:
            return state;
    }
}

export default combineReducers({
    byIds,
    visibleIds
});

// selector

export const getProduct = (state, id) => {
    return state.byIds[id];
}

export const getVisibleProducts = (state) => {
    return state.visibleIds.map(id => getProduct(state, id));
}