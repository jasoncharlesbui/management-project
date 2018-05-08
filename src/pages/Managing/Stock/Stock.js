/* global $ */
import React, { Component } from 'react';
import Paper from "material-ui/Paper";
import Table, {
    TableHead,
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Tooltip from 'material-ui/Tooltip';
import Snackbar from 'material-ui/Snackbar';



import ProductIcon from "material-ui-icons/ShoppingBasket";
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import FirstPageIcon from 'material-ui-icons/FirstPage';
import NextPageIcon from 'material-ui-icons/KeyboardArrowRight';
import PreviousPageIcon from 'material-ui-icons/KeyboardArrowLeft';
import LastPageIcon from 'material-ui-icons/LastPage';
import { LinearProgress } from 'material-ui/Progress';

import { getProduct, addUpdateProduct } from "../../../api/dhis2/product.js";
import { numberWithThousands, replaceAll, isNumber } from "../../../api/utils";


import ProductDetail from "./ProductDetail.js";
import ProductFilter from "./ProductFilter.js";

import "./Stock.css";



class Stock extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            pageCount: 0,
            loading: 1,
            showProductDetail: false,
            productDetailMode: "add",
            products: [],
            numberOfRecords: 15,
            selectedProduct: {},
            filters: {},
            snackbar: false
        };
        getProduct(this.state.filters, this.state.currentPage, this.state.numberOfRecords)
            .then(result => {
                this.setState({
                    loading: 0,
                    pageCount: result.pageCount,
                    products: result.products,
                    filters: {}
                })
                $("#total-products-info").html(`Tổng cộng: ${result.total}`);
                $("#paging-info").html(`Trang ${this.state.currentPage} / ${this.state.pageCount}`);
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
        getProduct(this.state.filters, this.state.currentPage, this.state.numberOfRecords)
            .then(result => {
                this.setState({
                    loading: 0,
                    products: result.products,
                    pageCount: result.pageCount
                })
                $("#total-products-info").html(`Tổng cộng: ${result.total}`);
                $("#paging-info").html(`Trang ${this.state.currentPage} / ${this.state.pageCount}`);
            })
    }

    handlePaging = (action) => () => {

        let currentPage;
        switch (action) {
            case "first": currentPage = 1; break;
            case "last": currentPage = this.state.pageCount; break;
            case "next": currentPage = this.state.currentPage + 1; break;
            case "previous": currentPage = this.state.currentPage - 1; break;
        }

        if (currentPage < 1) {
            currentPage = 1;
            return;
        }
        if (currentPage > this.state.pageCount) {
            currentPage = this.state.pageCount;
            return;
        }
        this.setState({
            loading: 1,
        });
        getProduct(this.state.filters, currentPage, this.state.numberOfRecords)
            .then(result => {
                this.setState({
                    currentPage: currentPage,
                    loading: 0,
                    products: result.products,
                    pageCount: result.pageCount
                })
                $("#total-products-info").html(`Tổng cộng: ${result.total}`);
                $("#paging-info").html(`Trang ${this.state.currentPage} / ${this.state.pageCount}`);
            });

    }

    handleFilterProduct = (value, property, operator, type) => {
        let filters = this.state.filters;
        if (type === "property") {
            filters[property] = {
                type: "property",
                property: property,
                operator: operator,
                value: value
            }
        } else {
            filters[property] = {
                type: "attribute",
                operator: operator,
                value: value
            }
        }
        this.setState({
            loading: 1,
            filters: filters
        });
        getProduct(filters, 1, this.state.numberOfRecords)
            .then(result => {
                this.setState({
                    loading: 0,
                    currentPage: 1,
                    pageCount: result.pageCount,
                    products: result.products,
                })
                $("#total-products-info").html(`Tổng cộng: ${result.total}`);
                $("#paging-info").html(`Trang ${this.state.currentPage} / ${this.state.pageCount}`);
            })
    }

    handleChangeNumberOfRecords = (numberOfRecords) => {
        this.setState({
            loading: 1,
            currentPage: 1,
            numberOfRecords: numberOfRecords
        });
        getProduct(this.state.filters, 1, numberOfRecords)
            .then(result => {
                this.setState({
                    loading: 0,
                    pageCount: result.pageCount,
                    products: result.products,
                })
                $("#total-products-info").html(`Tổng cộng: ${result.total}`);
                $("#paging-info").html(`Trang ${this.state.currentPage} / ${this.state.pageCount}`);
            });
    }

    handleQuickEditPrice = (index) => (event) => {
        let products = this.state.products;
        if (!isNumber(replaceAll(event.target.value, ",", ""))) {
            return;
        }
        products[index].productPrice = replaceAll(event.target.value, ",", "");
        this.setState({
            products: products
        });
    }

    handleSaveQuickEditPrice = (index) => (event) => {
        let keyCode = event.which || event.keyCode;
        if (keyCode === 13) {
            addUpdateProduct(this.state.products[index], "edit")
                .then(result => {
                    this.setState({
                        snackbar: true
                    })
                })
        }

    }

    handleCloseSnackbar = () => {
        this.setState({
            snackbar: false
        })
    }

    render() {
        return (
            <div className="stock-page-container">
                <ProductDetail showed={this.state.showProductDetail} mode={this.state.productDetailMode} product={this.state.selectedProduct} handleHideProductDetail={this.handleHideProductDetail} />
                <Snackbar
                    style={{ textAlign: "center" }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbar}
                    autoHideDuration={3000}
                    onClose={this.handleCloseSnackbar}
                    message={<span>Lưu thành công</span>}
                />
                <div className="left-bar">
                    <ProductFilter
                        handleFilterProduct={this.handleFilterProduct}
                        handleChangeNumberOfRecords={this.handleChangeNumberOfRecords}
                    />
                </div>
                <div className="right-bar">
                    <Paper style={{ width: "100%", height: "100%" }}>
                        <div className="page-title-container">
                            <div>
                                <ProductIcon style={{ width: 30, height: 30 }} />
                            </div>
                            <div className="page-title">
                                Quản lý hàng hóa
                            </div>
                        </div>
                        <LinearProgress style={{ opacity: this.state.loading }} />
                        <div className="page-content-container">
                            <div className="add-product-button">
                                <Button variant="fab" color="primary" onClick={this.handleShowProductDetail("add", {})}>
                                    <AddIcon />
                                </Button>
                            </div>
                            <Paper>
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
                                            <TableCell>Giá vốn (VNĐ)</TableCell>
                                            <TableCell>Trạng thái</TableCell>
                                            <TableCell>Tồn kho</TableCell>
                                            <TableCell>Giá bán (VNĐ)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            (this.state.products.length != 0) ?
                                                this.state.products.map((product, index) => {
                                                    return <TableRow>
                                                        <TableCell
                                                            onMouseMove={this.handleShowProductImage(product)}
                                                            onMouseOut={this.handleHideProductImage}
                                                            onClick={this.handleShowProductDetail("edit", product)}
                                                        >
                                                            {product.productId}
                                                        </TableCell>
                                                        <TableCell onMouseMove={this.handleShowProductImage(product)}
                                                            onMouseOut={this.handleHideProductImage}
                                                            onClick={this.handleShowProductDetail("edit", product)}>
                                                            {product.productCode}
                                                        </TableCell>
                                                        <TableCell onMouseMove={this.handleShowProductImage(product)}
                                                            onMouseOut={this.handleHideProductImage}
                                                            onClick={this.handleShowProductDetail("edit", product)}>
                                                            {product.productName}
                                                        </TableCell>
                                                        <TableCell onMouseMove={this.handleShowProductImage(product)}
                                                            onMouseOut={this.handleHideProductImage}
                                                            onClick={this.handleShowProductDetail("edit", product)}>
                                                        </TableCell>
                                                        <TableCell onMouseMove={this.handleShowProductImage(product)}
                                                            onMouseOut={this.handleHideProductImage}
                                                            onClick={this.handleShowProductDetail("edit", product)}>
                                                            {
                                                                (product.productActive) ?
                                                                    <span className="product-active">Đang kinh doanh</span> :
                                                                    <span className="product-inactive">Ngừng kinh doanh</span>
                                                            }
                                                        </TableCell>
                                                        <TableCell onMouseMove={this.handleShowProductImage(product)}
                                                            onMouseOut={this.handleHideProductImage}
                                                            onClick={this.handleShowProductDetail("edit", product)}>
                                                            {product.productInventory}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Tooltip title="Nhấn enter để lưu">
                                                                <TextField
                                                                    value={numberWithThousands(this.state.products[index].productPrice)}
                                                                    onChange={this.handleQuickEditPrice(index)}
                                                                    onKeyUp={this.handleSaveQuickEditPrice(index)}
                                                                />
                                                            </Tooltip>
                                                        </TableCell>
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
                            <div className="paging-container">
                                <span id="total-products-info"></span>
                                <IconButton>
                                    <FirstPageIcon onClick={this.handlePaging("first")} />
                                </IconButton>
                                <IconButton>
                                    <PreviousPageIcon onClick={this.handlePaging("previous")} />
                                </IconButton>
                                <span id="paging-info"></span>
                                <IconButton>
                                    <NextPageIcon onClick={this.handlePaging("next")} />
                                </IconButton>
                                <IconButton>
                                    <LastPageIcon onClick={this.handlePaging("last")} />
                                </IconButton>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Stock;
