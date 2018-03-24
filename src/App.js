import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Managing from "./pages/Managing/Managing.js";
import Sale from "./pages/Sale/Sale.js";

import {
	BrowserRouter,
	Route,
	Link
} from 'react-router-dom';

import "./App.css";
import "./pages/Managing/Managing.css";

class App extends Component {

	// componentDidMount() {
	// 	const { store } = this.context;

	// 	api.getProducts(products => {
	// 		store.dispatch(fromProducts.acGetProducts(products));
	// 	})

	// 	console.log(this.props.testProduct);
	// }

	render() {
		return (
			<BrowserRouter>
				<div className="root">
					{/* <Route exact path="/" component={Login} /> */}
					<Route path="/managing" component={Managing} />
					<Route path="/sale" component={Sale} />
				</div>
			</BrowserRouter>
		);
	}
}

export default (App);
