import React, { useState } from 'react';
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
import { errorMessage, signIn, forgotPassword } from "../../redux/Actions/authActions";

import Error from "../../utils/Error";
import { strings } from '../../utils/i18n';

function ForgotPassword(props) {
    const [email, setEmail] = useState(false);
    const onChangePaswword = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) !== false) {
            props.forgotPassword(email);
            props.navigation.goBack();
        } else {
            setEmail(true);
            props.errorMessage(strings("frgotpassword.error_email_valid"));

        }

    }
    return (
        <>
            {email ? null : <Error />}
            <TextInput placeholder={strings("frgotpassword.email_textinput")} type="email" onChangeText={(val) => { setEmail(val) }} />
            <Button title={strings("frgotpassword.Frgotpassword_button")} onPress={() => onChangePaswword()} />
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
        signIn: (creds) => dispatch(signIn(creds)),
        forgotPassword: (email) => dispatch(forgotPassword(email)),
        errorMessage: (errMessage) => dispatch(errorMessage(errMessage))

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);