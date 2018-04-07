/* global $ */
import React, { Component } from 'react';
import Paper from "material-ui/Paper";
import SearchIcon from "material-ui-icons/Search";
import ExpandIcon from "material-ui-icons/ExpandMore";
import CollapseIcon from "material-ui-icons/ExpandLess";
import DisplayIcon from "material-ui-icons/ChromeReaderMode";

import TextField from 'material-ui/TextField';
import {
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';




import "./ProductFilter.css";
import { removeAccents } from "../../../api/utils";

class ProductFilter extends Component {
    constructor() {
        super();
        this.state = {
            searchSection: true,
            displaySection: true
        }
    }

    handleExpandCollapseSection = (id, section, expand) => () => {
        $(`#${id}`).slideToggle(200);
        this.setState({
            [section]: expand
        });
    }

    handleSearchProduct = (property) => (event) => {
        this.props.handleSearchProduct(event.target.value, property);
    }


    render() {
        return (
            <Paper className="product-filter-container">
                <div className="section-container">
                    <div className="section-title-container">
                        <div className="section-expand-collapse-icon">
                            {
                                (this.state.searchSection) ?
                                    <CollapseIcon
                                        onClick={this.handleExpandCollapseSection("search-section-content", "searchSection", false)}
                                    /> :
                                    <ExpandIcon
                                        onClick={this.handleExpandCollapseSection("search-section-content", "searchSection", true)}
                                    />

                            }
                        </div>
                        <div className="section-title">
                            Tìm kiếm
                        </div>
                        <div className="section-icon">
                            <SearchIcon

                            />
                        </div>
                    </div>
                    <div id="search-section-content" className="section-content-container">
                        <TextField
                            label="Tìm theo tên hàng hóa"
                            style={{ width: "100%" }}
                            onChange={this.handleSearchProduct("name")}
                        />
                        <TextField
                            label="Tìm theo mã hàng hóa"
                            style={{ width: "100%" }}
                            onChange={this.handleSearchProduct("code")}
                        />
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-title-container">
                        <div className="section-expand-collapse-icon">
                            {
                                (this.state.displaySection) ?
                                    <CollapseIcon
                                        onClick={this.handleExpandCollapseSection("display-section-content", "displaySection", false)}
                                    /> :
                                    <ExpandIcon
                                        onClick={this.handleExpandCollapseSection("display-section-content", "displaySection", true)}
                                    />

                            }
                        </div>
                        <div className="section-title">
                            Lựa chọn hiển thị
                        </div>
                        <div className="section-icon">
                            <DisplayIcon />
                        </div>
                    </div>
                    <div id="display-section-content" className="section-content-container">
                        <div>
                            <FormControl >
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.gilad}
                                                value="gilad"
                                                color="primary"
                                            />
                                        }
                                        label="Hàng đang kinh doanh"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.jason}
                                                value="jason"
                                                color="primary"
                                            />
                                        }
                                        label="Hàng ngừng kinh doanh"
                                    />
                                </FormGroup>
                            </FormControl>
                        </div>
                        Số bản ghi&nbsp;&nbsp;&nbsp;&nbsp;
                        <Select
                            value={10}
                            inputProps={{
                                name: 'age',
                                id: 'age-simple',
                            }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>15</MenuItem>
                            <MenuItem value={30}>20</MenuItem>
                            <MenuItem value={30}>25</MenuItem>
                        </Select>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default ProductFilter;