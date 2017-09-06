import { QR_READ_SUCCESS, QR_NOT_GIST, INVALID_CODE } from '../actions/types';

const INITIAL_STATE = {
	gist: ''
}

export default (state = INITIAL_STATE, action) => {
	console.log(action.type);
	console.log(action.payload);
	switch (action.type) {
		case QR_READ_SUCCESS:
			return { ...state, gist: action.payload };
		default: 
			return INITIAL_STATE;
	}
}
