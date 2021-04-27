import * as types from '../Actions/types';

const initialState = {
	authUser: {
		emailVerified: "",
		uid: "",
	},
	error: {

	}

}
const authReducer = (state = initialState, action) => {

	switch (action.type) {

		case types.SING_IN:
			return {
				authUser: {
					emailVerified: action.playoud.user.emailVerified,
					uid: action.playoud.user.uid
				}
			}
		case types.SIGN_IN_GOOGLE:
			return {
				authUser: {
					emailVerified: action.playoud.additionalUserInfo.profile.email_verified,
					uid: action.playoud.additionalUserInfo.user.uid
				}
			}

		case types.SIGN_IN_ERR:
			return {
				...state,
				error: { ...action.playoud }
			}
		case "SIGN_OUT":
			return initialState;
		case types.SIGN_UP:
			return {
				authUser: {
					emailVerified: action.playoud.user.emailVerified,
					uid: action.playoud.user.uid
				}

			};
		case types.SIGN_UP_ERR:
			return {
				error: action.playoud
			}
		default:
			return state;
	}
}

export default authReducer;