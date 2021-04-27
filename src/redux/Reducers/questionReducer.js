import * as types from '../Actions/types';

const initialState = {
	settings: {
		countQuesthion: 0,
		name: "",
		haveImage: false,
		multyplyanswer: false,
		lenguge:[],
	},
	questhions: {
		Question:[],
		variant: [],
	}


}
const questionReducer = (state = initialState, action) => {
	console.log(action.type);
	switch (action.type) {

		case types.CREATE_QUESTIONS_SETTINGS:
			return {
				...state,
				settings: {
					...action.playoud
				}
			
			}
		case types.ADD_QUESTION:
			return {
				...state,
				questhions: {		
					Question: [...state.questhions.Question,action.playoud.Question],
					variant: [...state.questhions.variant,action.playoud.variant]
                }
            }
		default:
			return state;
	}
}

export default questionReducer;