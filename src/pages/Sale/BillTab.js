import React from "react";
import "./BillTab.css";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import {
    fromProducts,
    fromCart
} from '../../actions'
import * as fromReducers from '../../reducers'

import {
    Badge,
    withStyles,
    colors
} from "material-ui";
import {
    Add, Remove,
    Clear,
} from "material-ui-icons";

const BillItem = ({ product, index, billId, onActionChangeQuantityClicked, onActionRemoveFromCartClicked }) => {
    return (
        <div className="item">
            <div className="cell-order">{index + 1}</div>
            <div className="cell-action"><Clear
                onClick={() => onActionRemoveFromCartClicked(product.id, billId)}
                style={{ width: 16, height: 16 }} /></div>

            <div className="row-product">

                <div className="cell-name">
                    <h4>{product.name}</h4>
                    <div className="cell-code" title={product.code}>{product.code}</div>
                </div>

                <div className="cell-quantity">
                    <button className="plus-btn" type="button" name="button"
                        onClick={() => onActionChangeQuantityClicked(product.id, billId, product.quantity + 1)}>
                        <Add style={{ width: 14, height: 14 }} />
                    </button>
                    <input type="text" name="name" value={`${product.quantity}`}
                        onChange={() => null} />
                    <button className="minus-btn" type="button" name="button"
                        onClick={() => onActionChangeQuantityClicked(product.id, billId, product.quantity - 1)}>
                        < Remove style={{ width: 14, height: 14 }} />
                    </button>
                </div>
                <div className="cell-warning">
                    {product.inventory < product.quantity &&
                        <Badge badgeContent={'!'} color="error" className="badge-warning">
                            <span className="quantity-warning">Tồn: {product.inventory}</span>
                        </Badge>
                    }
                </div>
                <div className="cell-change-price">
                    <button>{Number(product.price).toLocaleString()}</button>
                </div>

                <div className="cell-price">{(product.price * product.quantity).toLocaleString()}</div>
            </div>
        </div >
    )
}


class BillTab extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { products, billId } = this.props;
        return (

            <span>
                {products.map((product, index) => {
                    return (
                        <BillItem
                            index={index}
                            billId={billId}
                            key={product.id}
                            product={product}
                            onActionChangeQuantityClicked={this.props.onActionChangeQuantity}
                            onActionRemoveFromCartClicked={this.props.onActionRemoveFromCart}
                        />
                    )
                })}
            </span>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: fromReducers.getCartProducts(state, ownProps.billId),
    }
}

const mapActionToProps = {
    onActionChangeQuantity: fromCart.acChangeQuantity,
    onActionRemoveFromCart: fromCart.acRemoveFromCart
}

export default connect(mapStateToProps, mapActionToProps)(BillTab);