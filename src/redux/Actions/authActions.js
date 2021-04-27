import * as types from './types';
import firestore, { firebase } from "@react-native-firebase/firestore";

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { result } from 'lodash';
import { strings } from '../../utils/i18n';
// get auth in google
export const signInGoogle = () => {
    return async (dispatch, getState, { getFirebase }) => {
        try {
            const firebase = getFirebase();
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            console.log(firebaseUserCredential + "   tiko   ");
            dispatch({ type: types.SING_IN, playoud: firebaseUserCredential });
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: strings("error.error_cancled") } },);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated

                dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: strings("error.error_serices_available_outdated") } },);
            } else {
                // some other error happened
                dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: strings("error.error_somthing_wrong") } },);
            }
        }
    }
};

export const signIn = creds => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .signInWithEmailAndPassword(creds.email, creds.password)
            .then((res) => {
                if (res.user.emailVerified) {
                    dispatch({ type: types.SING_IN, playoud: res });
                } else {
                    dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: strings("error.error_email_valid") } },);
                }
            })
            .catch(err => {

                dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: err + "" } },);
            });
    };
};

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({
                    type: types.SIGN_OUT
                });
            });
    };
};

export const signUp = creds => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .createUserWithEmailAndPassword(creds.email, creds.password)
            .then((res) => {

                const user = firebase.auth().currentUser;
                user.sendEmailVerification();
                // need to change for real db
                firestore()
                    .collection('users')
                    .doc(res.user.uid)
                    .set({
                        firstname: "Tigran2",
                        secondename: "Markosyan3",
                    });
                dispatch({ type: types.SIGN_UP, playoud: res }, res);
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: types.SIGN_UP_ERR }, err);
            });
    };
};

export const forgotPassword = (email) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Success", errorName: strings("notifications.change_password") } },);
            })
            .catch(error => {
                dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: error + "" } },);
            });
    };
}

export const errorMessage = (errMessage) => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: errMessage } },);
    }
}