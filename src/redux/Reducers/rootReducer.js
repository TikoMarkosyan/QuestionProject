import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import questionReducer from "./questionReducer"
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    auth: authReducer,
    questionReducer: questionReducer,
})

export default rootReducer;