import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    TextInput,
    Text,
    useColorScheme,
    View,
    Button,
} from 'react-native';

import { connect } from "react-redux";
import { errorMessage, signUp } from "../../redux/Actions/authActions";

import Error from "../../utils/Error";
import { strings } from '../../utils/i18n';

function SignUp(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reapeatPassword, setReapeatPassword] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if (props.uid) {
            setEmail("");
            setPassword("");
            setReapeatPassword("");
            setError("")
            props.navigation.goBack();
        }
    }, [props])

    const onReg = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) !== false && password === reapeatPassword && password.length >= 6) {
            const obj = {
                email: email,
                password: password
            }
            props.signUp(obj);
        } else if (reg.test(email) === false) {
            setError(true);
            props.errorMessage(strings("signup.error_email_valid"));
        } else if (password !== reapeatPassword) {
            setError(true);
            props.errorMessage(strings("signup.error_password_not_same"));
        } else if (password.length <= 6) {
            setError(true);
            props.errorMessage(strings("signup.error_password_short"));
        } else if (email === "" || password === "" || reapeatPassword === "") {
            setError(true);
            props.errorMessage(strings("signup.error_fill_all_fileds"));
        }
    }

    return (
        <>
            { error ? < Error /> : null}
            <TextInput placeholder={strings("signup.email_textinput")} onChangeText={(val) => { setEmail(val) }} />
            <TextInput placeholder={strings("signup.password_textinput")} onChangeText={(val) => { setPassword(val) }} />
            <TextInput placeholder={strings("signup.repeatPassword_textinput")} onChangeText={(val) => { setReapeatPassword(val) }} />
            <Button title={strings("signup.reg_button")} onPress={() => onReg()} />
        </>

    )
}

const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    return {
        uid: uid,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds)),
        errorMessage: (errMessage) => dispatch(errorMessage(errMessage))

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);