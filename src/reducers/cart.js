import { actionTypes } from '../constants/ActionTypes'
import { saveState, loadState } from '../localStorage';
import _ from 'lodash';
// console.log(JSON.parse(localStorage.getItem('cart')));
const initialState = (JSON.parse(localStorage.getItem('cart')) ||
    {
        addedIds: [],
        quantityByIds: {}
    });
// JSON.parse(localStorage.getItem('cart')) ||
localStorage.removeItem('cart');
// localStorage.getItem('cart') ||
const addedIds = (state = initialState.addedIds, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            if (state.indexOf(action.productId) !== -1) {
                return state;
            }
            let result = [...state, action.productId];
            return result;
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
            let result = {
                ...state,
                [productId]: (state[productId] || 0) + 1
            };
            return result;
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
            let cart = {
                addedIds: addedIds(state.addedIds, action),
                quantityByIds: quantityByIds(state.quantityByIds, action)
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            return cart;
    }
}

export default cart;


// selectors
export const getAddedIds = state => state.addedIds;
export const getQuantity = (state, productId) =>
    state.quantityByIds[productId] || 0;