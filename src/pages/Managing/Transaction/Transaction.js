/* global $ */
import React, { Component } from 'react';
import moment from "moment";
import Paper from "material-ui/Paper";
import { LinearProgress } from 'material-ui/Progress';
import TransactionIcon from "material-ui-icons/SwapVert";
import Table, {
	TableHead,
	TableBody,
	TableCell,
	TableRow,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FirstPageIcon from 'material-ui-icons/FirstPage';
import NextPageIcon from 'material-ui-icons/KeyboardArrowRight';
import PreviousPageIcon from 'material-ui-icons/KeyboardArrowLeft';
import LastPageIcon from 'material-ui-icons/LastPage';
import _ from "lodash";

import { getTransaction } from "../../../api/dhis2/transaction.js";
import { getCustomerList } from "../../../api/dhis2/customer.js";
import { getProduct } from "../../../api/dhis2/product.js";
import { numberWithThousands, replaceAll, isNumber } from "../../../api/utils";

import "./Transaction.css";
import TransactionFilter from "./TransactionFilter";
import TransactionDetail from "./TransactionDetail";


class Transaction extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 1,
			pageCount: 0,
			loading: 1,
			filters: {},
			transactions: [],
			numberOfRecords: 15,
			showTransactionDetail: false,
			selectedTransaction: {}
		};
		this.getData(this.state.filters, this.state.currentPage, this.state.numberOfRecords);
	}

	getData = (filters, currentPage, numberOfRecords) => {
		getTransaction(filters, currentPage, numberOfRecords)
			.then(result => {
				let productMapping = {};
				let customerMapping = {};
				let productFilters = {
					id: {
						type: "property",
						property: "id",
						operator: "in",
						value: ""
					}
				};
				let productIds = [];
				let customerIds = "";
				result.transactions.forEach(transaction => {
					transaction.transactionItems.forEach(item => {
						productIds.push(item.productId);
					});
					customerIds += transaction.transactionCustomer + ";";
				});
				productIds = _.uniq(productIds);
				productFilters.id.value = replaceAll(JSON.stringify(productIds), `"`, ``);

				Promise.all([
					getProduct(productFilters, 1, 2000),
					getCustomerList(customerIds)
				])
					.then(results => {
						results[0].products.forEach(product => {
							productMapping[product.productId] = product;
						});

						results[1].forEach(customer => {
							customerMapping[customer.customerId] = customer;
						});


						result.transactions.forEach(transaction => {
							transaction.transactionItems.forEach(item => {
								item.productName = productMapping[item.productId].productName;
								item.productPrice = productMapping[item.productId].productPrice;
							});
							transaction.transactionCustomer = customerMapping[transaction.transactionCustomer].customerName;
						});
						this.setState({
							loading: 0,
							transactions: result.transactions,
							pageCount: result.pageCount
						});
						$("#total-products-info").html(`Tổng cộng: ${result.total}`);
						$("#paging-info").html(`Trang ${this.state.currentPage} / ${this.state.pageCount}`);
					})
			});
	};

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

		this.getData(this.state.filters, currentPage, this.state.numberOfRecords);
	}

	handleShowTransactionDetail = (transaction) => () => {
		this.setState({
			showTransactionDetail: true,
			selectedTransaction: transaction
		});
	}

	handleHideTransactionDetail = () => {
		this.setState({
			showTransactionDetail: false
		});
	}

	render() {
		return (
			<div className="transaction-page-container">
				<TransactionDetail showed={this.state.showTransactionDetail} transaction={this.state.selectedTransaction} handleHideTransactionDetail={this.handleHideTransactionDetail} />
				<div className="left-bar">
					<TransactionFilter />
				</div>
				<div className="right-bar">
					<Paper style={{ width: "100%", height: "100%" }}>
						<div className="page-title-container">
							<div>
								<TransactionIcon style={{ width: 30, height: 30 }} />
							</div>
							<div className="page-title">
								Quản lý giao dịch
                            </div>
						</div>
						<LinearProgress style={{ opacity: this.state.loading }} />
						<div className="page-content-container">
							<Paper>
								<Table id="transaction-table">
									<TableHead>
										<TableRow className="transaction-table-header">
											<TableCell>ID Giao dịch</TableCell>
											<TableCell>Thời gian</TableCell>
											<TableCell>Tên khách hàng</TableCell>
											<TableCell>Tổng cộng (VNĐ)</TableCell>
											<TableCell>Giảm giá (VNĐ)</TableCell>
											<TableCell>Thành tiền (VNĐ)</TableCell>
											<TableCell>Khách đã trả (VNĐ)</TableCell>
											<TableCell>Trạng thái</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											(this.state.transactions.length != 0) ?
												this.state.transactions.map(transaction => {
													return <TableRow onClick={this.handleShowTransactionDetail(transaction)}>
														<TableCell>{transaction.transactionId}</TableCell>
														<TableCell>{moment(transaction.transactionTime).format("DD/MM/YYYY HH:mm")}</TableCell>
														<TableCell>{transaction.transactionCustomer}</TableCell>
														<TableCell>{numberWithThousands(transaction.transactionTotal)}</TableCell>
														<TableCell>{numberWithThousands(transaction.transactionDiscount)}</TableCell>
														<TableCell>{numberWithThousands(transaction.transactionAmount)}</TableCell>
														<TableCell>{numberWithThousands(transaction.transactionPayedAmount)}</TableCell>
														<TableCell>
															{
																(transaction.transactionStatus === "1") ?
																	<span className="transaction-status done">Hoàn thành</span> :
																	<span className="transaction-status pending">Chưa hoàn thành</span>
															}
														</TableCell>
													</TableRow>
												})
												:
												<TableRow>
													<TableCell></TableCell>
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

export default Transaction;
