/* global $ */
import React, { Component } from 'react';
import Paper from "material-ui/Paper";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ProductIcon from "material-ui-icons/ShoppingBasket";
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import { getProduct } from "../../api/dhis2/product.js";

import ProductDetail from "./ProductDetail.js";
import "./Stock.css";

class Stock extends Component {
    constructor() {
        super();
        this.state = {
            loading: 1,
            showProductDetail: false,
            productDetailMode: "add",
            products: [],
            selectedProduct: {}
        };
        getProduct(1)
            .then(products => {
                this.setState({
                    loading: 0,
                    products: products
                })
            })
    }

    handleShowProductDetail = (mode, product) => () => {
        this.setState({
            showProductDetail: true,
            productDetailMode: mode,
            selectedProduct: product
        })
    }



    handleShowProductImage = (product) => (event) => {
        let height = $(window).height();
        let width = $(window).width();
        $("#small-product-image").prop("src", product.productImage);
        $("#small-product-name").html(product.productName);
        let left = event.clientX + 20;
        let top = (event.clientY < (height / 2)) ? event.clientY + 20 : event.clientY - ($("#small-product-image").height() + 100);
        $("#small-product-image-container").css("opacity", 1);
        $("#small-product-image-container").css("z-index", 9999);
        $("#small-product-image-container").css("top", top);
        $("#small-product-image-container").css("left", left);


    }

    handleHideProductImage = () => {
        $("#small-product-image-container").css("opacity", 0);
        $("#small-product-image-container").css("top", -9999);
    }

    handleHideProductDetail = () => {
        this.setState({
            loading: 1,
            showProductDetail: false
        })
        getProduct(1)
            .then(products => {
                this.setState({
                    loading: 0,
                    products: products
                })
            })
    }


    render() {
        return (
            <div className="stock-page-container">
                <ProductDetail showed={this.state.showProductDetail} mode={this.state.productDetailMode} product={this.state.selectedProduct} handleHideProductDetail={this.handleHideProductDetail} />
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
                                <Button variant="fab" color="primary" onClick={this.handleShowProductDetail("add", {})}>
                                    <AddIcon />
                                </Button>
                            </div>
                            <Paper>
                                <LinearProgress style={{ opacity: this.state.loading }} />
                                <div id="small-product-image-container">
                                    <div id="small-product-name"></div>
                                    <img id="small-product-image" src="" />
                                </div>
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
                                        {
                                            (this.state.products.length != 0) ?
                                                this.state.products.map(product => {
                                                    return <TableRow
                                                        onClick={this.handleShowProductDetail("edit", product)}
                                                        onMouseMove={this.handleShowProductImage(product)}
                                                        onMouseOut={this.handleHideProductImage}
                                                    >
                                                        <TableCell>{product.productId}</TableCell>
                                                        <TableCell>{product.productCode}</TableCell>
                                                        <TableCell>{product.productName}</TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell>{product.productPrice}</TableCell>
                                                        <TableCell>{product.productInventory}</TableCell>
                                                    </TableRow>
                                                }) : <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                        }
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
