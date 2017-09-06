import { 
	LOGGING_IN,
	AUTH_SUCCESS,
	AUTH_FAILED,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAIL,
	QR_READ_SUCCESS, 
	QR_NOT_GIST, 
	INVALID_CODE 
} from '../actions/types';

const INITIAL_STATE = {
	gist: '',
	credentials: '',
	user: '',
	loading: false,
	error: ''
}

export default (state = INITIAL_STATE, action) => {
	// console.log(action.type);
	// console.log(action.payload);
	switch (action.type) {
		case LOGGING_IN:
			return { ...state, loading: true };
		case AUTH_SUCCESS:
			return { ...state, credentials: action.payload, error: '', loading: false };
		case AUTH_FAILED:
			return { ...state, error: 'Authentication failed, try again.', loading: false  };
		case GET_USER_INFO_SUCCESS:
			return { ...state, user: action.payload, loading: false };
		case GET_USER_INFO_FAIL:
			return { ...state, error: 'Get user info failed, try again.', loading: false  };
		case QR_READ_SUCCESS:
			return { ...state, gist: action.payload, error: '' };
		case QR_NOT_GIST:
			return { ...state, error: 'Scanned QRCode is not a Gist URL.'};
		case INVALID_CODE:
			return { ...state, error: 'Scanned code is not a QR Code.'};
		default: 
			return state;
	}
}
