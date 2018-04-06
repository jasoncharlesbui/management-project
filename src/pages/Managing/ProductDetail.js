/* global $ */
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import SaveIcon from 'material-ui-icons/Save';
import CloseIcon from 'material-ui-icons/Close';
import DeleteIcon from 'material-ui-icons/Delete';
import { Z_FILTERED } from 'zlib';


class ProductDetail extends Component {
    constructor() {
        super();
        this.state = {
            productId: "3333",
            productCode: "",
            productName: "",
            productOriginalPrice: "",
            productPrice: "",
            productQuantity: "",
            productImage: "../images/add-image-icon.png"
        };
    }


    handleChangeValue = (property) => (event) => {
        this.setState({
            [property]: event.target.value
        });
    }

    handleSaveProduct = () => {
        console.log(this.state);
    }

    handleShowUploadImageDialog = () => {
        $("#product-image-selector").click();
    }

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
                                        src="../images/1.png"
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
                                onChange={this.handleChangeValue("productCode")}
                            />
                            <br />
                            <br />
                            <TextField
                                label="Tên hàng hoá"
                                placeholder="Tên hàng hoá"
                                style={{ width: 300 }}
                                value={this.state.productName}
                                onChange={this.handleChangeValue("productName")}
                            />
                            <br />
                            <br />
                            <TextField
                                label="Giá vốn"
                                placeholder="Giá vốn"
                                style={{ width: 300 }}
                                value={this.state.productOriginalPrice}
                                onChange={this.handleChangeValue("productOriginalPrice")}
                            />
                            <br />
                            <br />
                            <TextField
                                label="Giá bán"
                                placeholder="Giá bán"
                                style={{ width: 300 }}
                                value={this.state.productPrice}
                                onChange={this.handleChangeValue("productPrice")}
                            />
                            <br />
                            <br />
                            <TextField
                                label="Tồn kho"
                                placeholder="Tồn kho"
                                style={{ width: 300 }}
                                value={this.state.productQuantity}
                                onChange={this.handleChangeValue("productQuantity")}
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
                            }}>
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
