import { combineReducers } from 'redux'

export const actionTypes = {
    RECEIVED_PRODUCTS: 'RECEIVED_PRODUCTS'
}

const byIds = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.RECEIVED_PRODUCTS:
            return {
                ...action.products.reduce((obj, product) => {
                    obj[product.id] = product;
                    return obj;
                }, {})
            }
        default:
            return state;
    }
}

const visibleIds = (state = [], action) => {
    switch (action.type) {
        case actionTypes.RECEIVED_PRODUCTS:
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