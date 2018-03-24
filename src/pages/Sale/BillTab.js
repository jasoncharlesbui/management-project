import React from "react";
import "./BillTab.css";
import PropTypes from "prop-types";
import {
    withStyles,
    colors
} from "material-ui";
import {
    Add, Remove,
    Clear,
} from "material-ui-icons";

const tempData = [
    {
        "code": "MBP",
        "name": "MacBook Pro 15-inch with Touch Bar 2017",
        "id": "M3nqwbHRLq7",
        "translations": [],
        "stock": 10,
        "price": 40000000,
        "image": "http://via.placeholder.com/150x150",
        "sumup": {
            "quantity": 1,
            "customPrice": 0,
            "total": 0
        }
    }, {
        "code": "MBP",
        "name": "MacBook Pro 15-inch with Touch Bar 2017",
        "id": "M3nqwbHRLq7",
        "translations": [],
        "stock": 10,
        "price": 40000000,
        "image": "http://via.placeholder.com/150x150",
        "sumup": {
            "quantity": 1,
            "customPrice": 0,
            "total": 0
        }
    }

];

class BillItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.item,
            currentPrice: this.props.item.price,
            quantity: this.props.item.sumup.quantity,
            total: this.props.item.sumup.quantity * this.props.item.price
        }
    }

    componentDidMount = () => {

    }

    handlePlusButton = () => {
        this.setState((prevState) => {
            return { quantity: prevState.quantity + 1 };
        })
        console.log(this.state.quantity);
    }

    render() {
        const { idex, item } = this.props;
        const { currentPrice, quantity, total } = this.state;
        return (
            <div className="item">
                <div className="cell-order">{idex + 1}</div>
                <div className="cell-action"><Clear style={{ width: 16, height: 16 }} /></div>

                <div className="row-product">

                    <div className="cell-name">
                        <h4>{item.name}</h4>
                        <div className="cell-code" title={item.code}>{item.code}</div>
                    </div>

                    <div className="cell-quantity">
                        <button className="plus-btn" type="button" name="button"
                            onClick={() => {
                                this.handlePlusButton();
                            }}
                        >
                            <Add style={{ width: 14, height: 14 }} />
                        </button>
                        <input type="text" name="name" value={`${quantity}`} />
                        <button className="minus-btn" type="button" name="button">
                            <Remove style={{ width: 14, height: 14 }} />
                        </button>
                    </div>
                    <div className="cell-change-price">
                        <button>{currentPrice}</button>
                    </div>
                    <div className="cell-price">{total}</div>
                </div>
            </div>
        )
    }
}


class BillTab extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="shopping-cart">
                {tempData.map((item, idex) => {
                    return (
                        <BillItem idex={idex} key={idex} item={item} />
                    )
                })}
            </div>
        )
    }
}

export default BillTab;