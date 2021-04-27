import firestore from "@react-native-firebase/firestore";
import { strings } from '../utils/i18n';
import * as types from '../redux/Actions/types';
import storage from '@react-native-firebase/storage';

export const getUser = (uid) => {
    return (dispatch, getState, { getFirebase }) => {
        firestore().collection('users').doc(uid).get().then((doc) => {
            if (doc.exists) {
                dispatch({ type: "GET_INFO", playoud: doc.data() }, doc.data());
            } else {
                // doc.data() will be undefined in this case
                dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: strings("error.error_document") } },);
            }
        }).catch((error) => {
            dispatch({ type: types.SIGN_IN_ERR, playoud: { errorTitle: "Error", errorName: error + "" } },);
        });
    };
}

export const createQuestionSettings = (info) => {

   return (dispatch, getState, { getFirebase }) => {
         dispatch({ type: types.CREATE_QUESTIONS_SETTINGS, playoud: info });
    };
}

export const QuesthionFinish = (info) => {
    return  (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const objSetate = getState();
        let result = {
            questhions: {},
            variant: {}
        };
        objSetate.questionReducer.questhions.Question.map((el, index) => {
            result.questhions[index] = objSetate.questionReducer.questhions.Question[index]
        })
        if (objSetate.questionReducer.settings.haveImage) {
            objSetate.questionReducer.questhions.variant.map((el, index) => {
                el.map((element, i) => {
                    result.variant[i] = {
                        ...result.variant[i],
                        [index]: {
                            url: element[objSetate.questionReducer.settings.lenguge[0]].value.fileName,
                            point: element[objSetate.questionReducer.settings.lenguge[0]].point,
                            correctAnswer: element.correctAnswer
                        }
                    };
                })
            })
            uploadData(result, objSetate, firebase);
        } else {
            objSetate.questionReducer.questhions.variant.map((el, index) => {
                console.log(el);
                result.variant[index] = el
            })
            firebase.firestore().collection('tests').doc(objSetate.questionReducer.settings.name).set({
                questhions: result.questhions,
                variant: result.variant,
                settings: objSetate.questionReducer.settings
            });
        }
    
/*
    * for ios 
const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : element[objSetate.questionReducer.settings.lenguge[0]].value.uri;
*/
   

    };
}

const uploadData = (result, objSetate, firebase) => {
    objSetate.questionReducer.questhions.variant.map((el, index) => {
        el.map((element, i) => {
            let reference = storage().ref(element[objSetate.questionReducer.settings.lenguge[0]].value.fileName);
            let task = reference.putFile(element[objSetate.questionReducer.settings.lenguge[0]].value.uri);
            task.then(() => {
                firebase.firestore().collection('tests').doc(objSetate.questionReducer.settings.name).set({
                    questhions: result.questhions,
                    variant: result.variant,
                    settings: objSetate.questionReducer.settings
                });
            }).catch((e) => console.log('uploading image error => ', e));
        })
    })
}