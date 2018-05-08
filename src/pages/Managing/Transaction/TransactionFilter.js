/* global $ */
import React, { Component } from 'react';
import Paper from "material-ui/Paper";





import { removeAccents, replaceAll } from "../../../api/utils";

class TransactionFilter extends Component {
    constructor() {
        super();

    }

    handleExpandCollapseSection = (id, section, expand) => () => {
        $(`#${id}`).slideToggle(200);
        this.setState({
            [section]: expand
        });
    }



    handleChangeNumberOfRecords = (event) => {

    }

    render() {
        return (
            <Paper className="filter-container">
                <div className="section-container">

                </div>
            </Paper>
        );
    }
}

export default TransactionFilter;
