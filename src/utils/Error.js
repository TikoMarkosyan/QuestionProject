import React, { useState, useEffect } from 'react';

import Toaster, { ToastStyles } from 'react-native-toaster';
import { connect } from "react-redux";
import * as _ from 'lodash';

function Error(props) {

    const res = () => {
        switch (props.error.errorTitle) {
            case "Error":
                return <Toaster message={{ text: props.error.errorName, styles: ToastStyles.error }} />
            case "Success":
                return <Toaster message={{ text: props.error.errorName, styles: ToastStyles.success }} />
        }
    }
    return (
        <>
            { _.isEmpty(props.error) ? null : res()}
        </>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    const error = state.auth.error;
    return {
        error: error
    };
};


export default connect(mapStateToProps, null)(Error);