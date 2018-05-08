/* global $ */
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Paper from "material-ui/Paper";
import Table, {
    TableHead,
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import SaveIcon from 'material-ui-icons/Save';
import CloseIcon from 'material-ui-icons/Close';
import DeleteIcon from 'material-ui-icons/Delete';
import moment from "moment";
import _ from "lodash";


import { numberWithThousands } from "../../../api/utils";
import { getCustomerList } from "../../../api/dhis2/customer.js";


class TransactionDetail extends Component {
    constructor() {
        super();
    };



    render() {
        return (
            <div className={`detail-dialog-container ${(this.props.showed) ? " show" : " hide"}`} >
                <div className="detail-dialog transaction">
                    <div className="detail-dialog-title">
                        Chi tiết giao dịch
                    </div>
                    <div className="detail-dialog-content">
                        <div style={{ height: "100%", width: "100%", textAlign: "left" }}>
                            <div className="transaction-detail-table-container">
                                <table className="transaction-detail-table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Mã hóa đơn:
                                            </td>
                                            <td>
                                                {this.props.transaction.transactionId}
                                            </td>
                                            <td>
                                                Trạng thái hóa đơn:
                                            </td>
                                            <td>
                                                {
                                                    (this.props.transaction.transactionStatus === "1") ?
                                                        <span className="transaction-status done">Hoàn thành</span> :
                                                        <span className="transaction-status pending">Chưa hoàn thành</span>
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Thời gian:
                                            </td>
                                            <td>
                                                {moment(this.props.transaction.transactionTime).format("DD/MM/YYYY HH:mm")}
                                            </td>
                                            <td>
                                                Khách hàng:
                                            </td>
                                            <td>
                                                {this.props.transaction.transactionCustomer}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <strong style={{ padding: 10 }}>Chi tiết đơn hàng:</strong>
                            <br />
                            <br />
                            <div className="transaction-items-table-container">
                                <Paper>
                                    <Table id="transaction-table">
                                        <TableHead>
                                            <TableRow className="transaction-table-header">
                                                <TableCell>Mã hàng hóa</TableCell>
                                                <TableCell>Tên hàng hóa</TableCell>
                                                <TableCell>Số lượng</TableCell>
                                                <TableCell>Đơn giá (VNĐ)</TableCell>
                                                <TableCell>Giảm giá (VNĐ)</TableCell>
                                                <TableCell>Giá bán (VNĐ)</TableCell>
                                                <TableCell>Thành tiền (VNĐ)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                (this.props.transaction.transactionItems) ?
                                                    this.props.transaction.transactionItems.map(item => {
                                                        return <TableRow >
                                                            <TableCell>{item.productId}</TableCell>
                                                            <TableCell>{item.productName}</TableCell>
                                                            <TableCell>{item.quantity}</TableCell>
                                                            <TableCell>{numberWithThousands(item.productPrice)}</TableCell>
                                                            <TableCell>{numberWithThousands(item.discount)}</TableCell>
                                                            <TableCell>{numberWithThousands(item.sellingPrice)}</TableCell>
                                                            <TableCell>{numberWithThousands(item.total)}</TableCell>
                                                        </TableRow>
                                                    }) : <TableRow >
                                                        <TableCell></TableCell>
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
                        </div>
                    </div>
                    <div className="detail-dialog-buttons">
                        <Button
                            variant="raised"
                            onClick={this.props.handleHideTransactionDetail}
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

export default TransactionDetail;
