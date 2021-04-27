import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';


import { Provider } from 'react-redux';
import store from './src/redux/Store/index';
import firebase from "./src/config/firebaseConfig";
import { getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch,
    createFirestoreInstance,
    Stack
};

const app = () => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <App />
            </ReactReduxFirebaseProvider>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => app);