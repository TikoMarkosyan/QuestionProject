import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SingUp from "../container/Auth/SignUp";
import SignIn from "../container/Auth/SignIn";
import FrgotPassword from '../container/Auth/FrgotPassword';

import Home from "../container/Main/Home";
import QuestionFill from "../container/Main/QuestionsFill";
import CreateQuestion from "../container/Main/CreateQuestion";
const Stack = createStackNavigator();

export function Auth() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SingUp" component={SingUp} />
                <Stack.Screen name="FrgotPassword" component={FrgotPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export function LogIn() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CreateQuestion" component={CreateQuestion} />
                <Stack.Screen name="QuestionFill" component={QuestionFill} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}