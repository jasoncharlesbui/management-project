import React, { Component } from 'react';
import Paper from "material-ui/Paper";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ProductIcon from "material-ui-icons/ShoppingBasket";
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';


import ProductDetail from "./ProductDetail.js";
import "./Stock.css";

class Stock extends Component {
    constructor() {
        super();
        this.state = {
            showProductDetail: false,
            productDetailMode: "add"
        };
    }

    handleShowProductDetail = (mode) => () => {
        this.setState({
            showProductDetail: true,
            productDetailMode: mode
        })
    }

    handleHideProductDetail = () => {
        this.setState({
            showProductDetail: false
        })
    }


    render() {
        return (
            <div className="stock-page-container">
                <ProductDetail showed={this.state.showProductDetail} mode={this.state.productDetailMode} handleHideProductDetail={this.handleHideProductDetail} />
                <div className="left-bar">
                    <Paper style={{ width: "100%", height: "100%" }}>
                        eeeee
                    </Paper>
                </div>
                <div className="right-bar">
                    <Paper style={{ width: "100%", height: "100%" }}>
                        <div className="managing-page-title-container">
                            <div>
                                <ProductIcon style={{ width: 30, height: 30 }} />
                            </div>
                            <div className="managing-page-title">
                                Quản lý hàng hóa
                            </div>
                        </div>
                        <div className="managing-page-content-container">
                            <div className="add-product-button">
                                <Button variant="fab" color="primary" onClick={this.handleShowProductDetail("add")}>
                                    <AddIcon />
                                </Button>
                            </div>
                            <Paper>
                                <Table id="stock-table">
                                    <TableHead>
                                        <TableRow className="stock-table-header">
                                            <TableCell>ID hàng hóa</TableCell>
                                            <TableCell>Mã hàng hóa</TableCell>
                                            <TableCell>Tên</TableCell>
                                            <TableCell>Giá vốn</TableCell>
                                            <TableCell>Giá bán</TableCell>
                                            <TableCell>Tồn kho</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow onClick={this.handleShowProductDetail("edit")}>
                                            <TableCell>aa</TableCell>
                                            <TableCell>bb</TableCell>
                                            <TableCell>cc</TableCell>
                                            <TableCell>dd</TableCell>
                                            <TableCell>ee</TableCell>
                                            <TableCell>ee</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Stock;
