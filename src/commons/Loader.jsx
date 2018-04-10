import React, { Component, PropTypes } from "react";
import { CircularProgress, LinearProgress } from 'material-ui/Progress';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

const style = {
    root: {
        display: "flex",
        flex: 1,
        backgroundColor: "#eee"
    },
    loader: {
        margin: "auto"
    }
}


export default class Loader extends Component {
    static defaultProps = {
        type: "circular",
        size: 50
    };

    render() {
        let element;
        let { open, size } = this.props;

        switch (this.props.type) {
            case "circular":
                element = <CircularProgress size={size} style={style.loader} />;
        }

        return (
            <Dialog
                fullScreen
                open={open}
            >
                <div style={style.root}>
                    {element}
                </div>
            </Dialog>
        )

    }
}