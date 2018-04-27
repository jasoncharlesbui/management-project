/* global $ */
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SaveIcon from 'material-ui-icons/Save';
import CloseIcon from 'material-ui-icons/Close';
import DeleteIcon from 'material-ui-icons/Delete';

import { addUpdateProduct, deleteProduct } from "../../../api/dhis2/product.js";
import { generateUid } from "../../../api/dhis2/utils.js";
import { numberWithThousands, replaceAll } from "../../../api/utils";

import "./ProductDetail.css";

class ProductDetail extends Component {
    constructor() {
        super();
        this.state = {
            productId: "",
            productCode: "",
            productName: "",
            productOriginalPrice: "",
            productPrice: "",
            productActive: "",
            productInventory: "",
            productImage: "../images/add-image-icon.png"
        };
    };


    handleChangeValue = (property, valueType) => (event) => {
        let value = "";
        switch (valueType) {
            case "TEXT":
            case "NUMBER":
                value = "value";
                break;
            case "BOOLEAN":
                value = "checked";
                break;
        }
        if (property === "productPrice" || property === "productStockPrice") {
            this.setState({
                [property]: numberWithThousands(replaceAll(event.target[value], ",", ""))
            });
        } else {
            this.setState({
                [property]: event.target[value]
            });
        }

    };

    handleSaveProduct = () => {
        addUpdateProduct(this.state)
            .then(result => {
                console.log(result);
                if (this.props.mode === "edit") {
                    this.props.handleHideProductDetail();
                } else {
                    this.setState({
                        productId: generateUid(),
                        productCode: "",
                        productName: "",
                        productOriginalPrice: "",
                        productPrice: "",
                        productActive: "",
                        productInventory: "",
                        productImage: "../images/add-image-icon.png"
                    });
                }
            })
    };

    handleDeleteProduct = () => {
        deleteProduct(this.state)
            .then(result => {
                console.log(result);
                this.props.handleHideProductDetail();
            })
    };

    handleShowUploadImageDialog = () => {
        $("#product-image-selector").click();
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.mode === "add") {
            this.setState({
                productId: generateUid(),
                productCode: "",
                productName: "",
                productOriginalPrice: "",
                productPrice: "",
                productActive: "",
                productInventory: "",
                productImage: "../images/add-image-icon.png"
            });
        } else {
            this.setState({
                productId: nextProps.product.productId,
                productCode: nextProps.product.productCode,
                productName: nextProps.product.productName,
                productPrice: nextProps.product.productPrice,
                productActive: nextProps.product.productActive,
                productInventory: nextProps.product.productInventory,
                productImage: nextProps.product.productImage
            });
        }
    };

    handleUploadImage = (event) => {
        let valid = ["image/gif", "image/jpeg", "image/png"];
        if (event.target.files && event.target.files[0]) {
            if (valid.includes(event.target.files[0].type)) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.setState({
                        productImage: e.target.result
                    })
                }
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    }

    render() {
        return (
            <div className={`product-detail-dialog-container ${(this.props.showed) ? " show" : " hide"}`} >
                <div className="product-detail-dialog">
                    <div className="product-detail-dialog-title">
                        {(this.props.mode === "add") ? "Thêm hàng hóa" : "Chi tiết hàng hóa"}
                    </div>
                    <div className="product-detail-dialog-content">
                        <div className="product-image-container">
                            <input
                                id="product-image-selector"
                                type="file"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={this.handleUploadImage}
                            />
                            {
                                (this.props.mode === "add") ?
                                    <img
                                        id="product-image"
                                        alt="Chưa có hình"
                                        src={this.state.productImage}
                                        className="product-image"
                                        onClick={this.handleShowUploadImageDialog}
                                    /> :
                                    <img
                                        id="product-image"
                                        alt="Chưa có hình"
                                        src={(this.state.productImage !== "") ? this.state.productImage : "../images/add-image-icon.png"}
                                        className="product-image"
                                        onClick={this.handleShowUploadImageDialog}
                                    />

                            }
                        </div>
                        <div className="product-fields-container">
                            <TextField
                                label="ID hàng hoá"
                                placeholder="ID Hàng hóa"
                                style={{ width: 300 }}
                                value={this.state.productId}
                                disabled
                            />
                            <br />
                            <br />
                            <TextField
                                label="Mã hàng hoá"
                                placeholder="Mã hàng hoá"
                                style={{ width: 300 }}
                                value={this.state.productCode}
                                onChange={this.handleChangeValue("productCode", "TEXT")}
                            />
                            <br />
                            <br />
                            <TextField
                                label="Tên hàng hoá"
                                placeholder="Tên hàng hoá"
                                style={{ width: 300 }}
                                value={this.state.productName}
                                onChange={this.handleChangeValue("productName", "TEXT")}
                            />
                            <br />
                            <br />
                            <TextField
                                label="Giá vốn"
                                placeholder="Giá vốn"
                                style={{ width: 300 }}
                                value={this.state.productOriginalPrice}
                                onChange={this.handleChangeValue("productOriginalPrice", "NUMBER")}
                            />
                            <br />
                            <br />
                            <TextField
                                label="Giá bán"
                                placeholder="Giá bán"
                                style={{ width: 300 }}
                                value={numberWithThousands(this.state.productPrice)}
                                onChange={this.handleChangeValue("productPrice", "NUMBER")}
                            />
                            <br />
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.productActive}
                                        onChange={this.handleChangeValue("productActive", "BOOLEAN")}
                                    />
                                }
                                label="Hàng đang kinh doanh"
                            />
                            <br />
                            <br />
                            <TextField
                                label="Tồn kho"
                                placeholder="Tồn kho"
                                style={{ width: 300 }}
                                value={this.state.productInventory}
                                onChange={this.handleChangeValue("productInventory", "NUMBER")}
                            />
                        </div>
                    </div>
                    <div className="product-detail-dialog-buttons">
                        <Button
                            variant="raised"
                            style={{
                                marginRight: 20,
                                width: 100,
                                color: "#FFFFFF",
                                backgroundColor: "#f44336"
                            }}
                            onClick={this.handleDeleteProduct}
                        >
                            <DeleteIcon style={{ marginRight: 5 }} />
                            Xóa
                        </Button>
                        <Button
                            variant="raised"
                            style={{
                                marginRight: 20,
                                width: 100,
                                color: "#FFFFFF",
                                backgroundColor: "#4bac4d"
                            }}
                            onClick={this.handleSaveProduct}
                        >
                            <SaveIcon style={{ marginRight: 5 }}
                            />
                            Lưu
                        </Button>
                        <Button
                            variant="raised"
                            onClick={this.props.handleHideProductDetail}
                            style={{
                                width: 100
                            }}>
                            <CloseIcon style={{ marginRight: 5 }} />
                            Đóng
                        </Button>
                    </div>
                </div>
            </ div >
        );
    }
}

export default ProductDetail;
