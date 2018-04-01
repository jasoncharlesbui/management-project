import { actionTypes } from '../constants/ActionTypes'

const initialState = {
    addedIds: [],
    quantityByIds: {}
}

const addedIds = (state = initialState.addedIds, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            if (state.indexOf(action.productId) !== -1) {
                return state;
            }
            return [...state, action.productId]
    }
    return state;
}

const quantityByIds = (state = initialState.quantityByIds, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const { productId } = action;
            return {
                ...state,
                [productId]: (state[productId] || 0) + 1
            };
    }
    return state;
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'not-yet':
            return state;
        default:
            return {
                addedIds: addedIds(state.addedIds, action),
                quantityByIds: quantityByIds(state.quantityByIds, action)
            }
    }
}

export default cart;


// selectors
export const getAddedIds = state => state.addedIds;
export const getQuantity = (state, productId) =>
    state.quantityByIds[productId] || 0;