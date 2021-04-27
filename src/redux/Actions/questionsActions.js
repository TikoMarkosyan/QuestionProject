import * as types from './types';
import firestore, { firebase } from "@react-native-firebase/firestore";
import { result } from 'lodash';
import { strings } from '../../utils/i18n';



export const AddQuesthion = (questhion) => {
    return (dispatch, getState, { getFirebase }) => {
        console.log(questhion);
        dispatch({ type: types.ADD_QUESTION, playoud: questhion  });
    };
};

