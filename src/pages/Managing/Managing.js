import React, { Component } from 'react';
import ManagingHeaderBar from "./ManagingHeaderBar.js";
import ReportIcon from "material-ui-icons/InsertChart";

import Stock from "./Stock.js";
import Transaction from "./Transaction.js";
import Partner from "./Partner.js";
import Finance from "./Finance.js";
import Report from "./Report.js";

import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom';

import "../Managing/Managing.css";

class Managing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <ManagingHeaderBar />
                <div className="body">
                    <Route exact path="/managing" component={Stock} />
                    {/* <Route path="/managing/stock" component={Stock} />
                    <Route path="/managing/transaction" component={Transaction} />
                    <Route path="/managing/partner" component={Partner} />
                    <Route path="/managing/finance" component={Finance} />
                    <Route path="/managing/report" component={Report} /> */}
                </div>
            </div>
        );
    }
}

export default Managing;
