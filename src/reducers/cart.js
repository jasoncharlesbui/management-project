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
            return [...state, action.productId];
        case actionTypes.REMOVE_FROM_CART:
            return state.filter(id => id !== action.productId);
        default:
            return state;
    }
}

const quantityByIds = (state = initialState.quantityByIds, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART: {
            const { productId } = action;
            return {
                ...state,
                [productId]: (state[productId] || 0) + 1
            };
        }
        case actionTypes.CHANGE_QUANTITY: {
            const { productId, value } = action;
            return {
                ...state,
                [productId]: value
            };
        }
        case actionTypes.REMOVE_FROM_CART: {
            delete state[action.productId];
            return { ...state }
        }
        default:
            return state;
    }
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