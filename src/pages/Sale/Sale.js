import React from "react";
import "./Sale.css";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {
    AppBar,
    Toolbar,
    Grid,
    InputAdornment,
    IconButton,
    Tabs, Tab,
    withStyles
} from "material-ui";
import {
    Search, KeyboardArrowUp
} from "material-ui-icons";
import MenuIcon from "material-ui-icons/Menu";
import Menu, { MenuItem } from "material-ui/Menu";
import FormControl from "material-ui/Form/FormControl";
import Input from "material-ui/Input/Input";

import Products from "./Products.js";
import BillTab from "./BillTab.js";

import Loader from '../../commons/Loader'
import * as fromReducers from '../../reducers'

const styles = {
    root: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden"
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    drawerPaper: {
        width: "74.5%",
        backgroundColor: "#e0e0e0"
    },
    gridList: {
        height: 350
    },
    card: {
        maxWidth: 345
    },
    media: {
        height: 200
    }
};

class TopBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className="header-bar">
                <Toolbar>
                    <FormControl className="App-input-form">
                        <Input
                            type="text"
                            placeholder="Search"
                            color="inherit"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <div className="App-menu-btn">
                        <IconButton aria-haspopup="true" onClick={this.handleMenu}>
                            <MenuIcon style={{ fontSize: 30 }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </div>
        );
    }
}

class LeftPager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            currentBillId: this.props.bills[0],
            drawerActive: true,
            isLoading: true
        };
    }

    handleChangeTab = (event, value) => {
        this.setState({
            value: value,
            currentBillId: `b${value}`
        })
    }

    handleAddBill = () => {
        this.state.listBills.push({
            title: "Hóa đơn",
        })
        this.setState(prevState => ({
            listBills: this.state.listBills
        }));
    }

    expandShoppingCart = (e) => {
        this.setState(prevState => ({
            drawerActive: !prevState.drawerActive
        }));
    }

    setLoadingStatus = (value) => {
        this.setState({
            isLoading: value
        })
    }

    render() {
        const { styles, bills } = this.props;
        const { listBills, value, isLoading, currentBillId } = this.state;
        let shoppingCartClassName = this.state.drawerActive ? "shopping-cart" : "shopping-cart shopping-cart-expand";
        return (
            <div className="left-content">
                <Tabs
                    value={value}
                    onChange={this.handleChangeTab}
                    className="App-Tabs"
                    scrollable
                    scrollButtons="on"
                    style={{
                        flexWrap: "nowrap",
                        transform: "translateZ(0)"
                    }}
                >
                    {bills.map((bill, idex) => (
                        <Tab key={idex} label={`Hóa Đơn ${idex + 1}`} className="App-Tab" />
                    ))}
                    <Tab
                        label="+"
                        onClick={this.handleAddBill}
                        style={{
                            backgroundColor: "#FFFFFF",
                            maxWidth: 40,
                            minWidth: 0
                        }}
                    />
                </Tabs>
                {isLoading == false && <div className={shoppingCartClassName}>
                    {bills.map((bill, idex) => {
                        return (
                            <span key={idex}>
                                {value == idex &&
                                    <BillTab
                                        key={idex}
                                        billId={bill}
                                    > Bill {`${idex + 1}`}</BillTab>}
                            </span>
                        )
                    })}
                </div>}
                <Loader open={isLoading} size={80} />
                <Products
                    onRef={ref => (this.child = ref)}
                    onExpandCart={this.expandShoppingCart}
                    onSetLoadingStatus={this.setLoadingStatus}
                    currentBillId={currentBillId}
                >
                </Products>

                <IconButton
                    onClick={() => this.child.handleDrawerToggle()}
                    className="products-button"
                >
                    <KeyboardArrowUp />
                </IconButton>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        bills: fromReducers.getCarts(state)
    }
}
LeftPager = connect(mapStateToProps)(LeftPager);

class RightPager extends React.Component {
    render() {
        return <div className="right-content" />;
    }
}

class Sale extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <TopBar props={this.props} />
                <div className="wrap-content">
                    <LeftPager styles={this.props.classes} />
                    <RightPager />
                </div>
            </Grid>
        );
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Sale));
