import { actionTypes } from '../constants/ActionTypes'
import { saveState, loadState } from '../localStorage';
import _ from 'lodash';
// console.log(JSON.parse(localStorage.getItem('cart')));
// localStorage.removeItem('cart');
const initialState =
    {
        addedIds: [],
        quantityByIds: {}
    };
const initialStateCart = JSON.parse(localStorage.getItem('cart')) || {
    b0: {
        addedIds: [],
        quantityByIds: {}
    },
    b1: {
        addedIds: [],
        quantityByIds: {}
    }
};
// JSON.parse(localStorage.getItem('cart')) ||

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

const cart = (state = initialStateCart, action) => {
    switch (action.type) {
        case 'not-yet':
            return state;
        case actionTypes.ADD_BILL:
            let listBill = Object.keys(state);
            let billId = "b" + (Number(listBill[listBill.length - 1].replace("b", "")) + 1);
            return {
                ...state,
                [billId]: initialState
            };
        case actionTypes.REMOVE_BILL:
            delete state[action.cartId];
            return { ...state }
        default:
            const { cartId } = action;
            if (cartId) {
                let cart = {
                    ...state,
                    [cartId]:
                        {
                            addedIds: addedIds(state[cartId].addedIds, action),
                            quantityByIds: quantityByIds(state[cartId].quantityByIds, action)
                        }
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                return cart;
            }
            return state;
    }
}

export default cart;

// selectors
export const getAddedIds = state => state.addedIds;
export const getQuantity = (state, productId) =>
    state.quantityByIds[productId] || 0;