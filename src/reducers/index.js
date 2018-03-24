import { combineReducers } from 'redux'
import products, * as fromProducts from './products'

// action types
export const actionTypes = {
    ...fromProducts.actionTypes
}

// reducers
export default combineReducers({
    products
})

// selectors

export {
    fromProducts
}