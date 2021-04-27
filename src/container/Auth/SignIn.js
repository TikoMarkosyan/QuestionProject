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

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import { connect } from "react-redux";
import { errorMessage, signInGoogle, signIn, forgotPassword } from "../../redux/Actions/authActions";

import Error from "../../utils/Error";
import { strings } from '../../utils/i18n';

function SingIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const onLog = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) !== false && password !== "") {
            const obj = {
                email: email,
                password: password
            }
            props.signIn(obj);
        } else if (email === "" || password === "") {
            setError(true);
            props.errorMessage(strings('signin.error_email_password_isEmpty'));
        }
        else if (reg.test(email) === false) {
            setError(true);
            props.errorMessage(strings('signin.erro_check_your_email'));
        }
    }

    const onRegistrathion = () => {
        props.navigation.navigate('SingUp');
    }

    const onChangePaswword = () => {
        props.navigation.navigate('FrgotPassword');
    }

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '102139724666-2oiedhfv7glb3s0603ut4disk3ro2tt6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            //  hostedDomain: '', // specifies a hosted domain restriction
            //   loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            //   accountName: '', // [Android] specifies an account name on the device that should be used
            //   iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
            googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
        });
    }, [])

    return (
        <>
            {error ? <Error /> : null}
            <TextInput placeholder={strings('signin.email_textinput')} type="email" onChangeText={(val) => { setEmail(val) }} />
            <TextInput placeholder={strings('signin.password_textinput')} onChangeText={(val) => { setPassword(val) }} />
            <Button title={strings('signin.Signin_button')} onPress={() => onLog()} />
            <Button title={strings('signin.frogotpassword_button')} onPress={() => onChangePaswword()} />
            <Button title={strings('signin.signup_button')} onPress={() => onRegistrathion()} />
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => { props.signInGoogle() }}
            />
        </>

    )
}

const mapStateToProps = (state) => {

    const uid = state.auth.authUser.uid;

    return {
        uid: uid,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
        forgotPassword: (email) => dispatch(forgotPassword(email)),
        signInGoogle: () => dispatch(signInGoogle()),
        errorMessage: (errMessage) => dispatch(errorMessage(errMessage))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingIn);