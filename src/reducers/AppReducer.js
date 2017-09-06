import { 
	LOGGING_IN,
	AUTH_SUCCESS,
	AUTH_FAILED,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAIL,
	QR_READ_SUCCESS, 
	QR_NOT_GIST, 
	INVALID_CODE,
	FETCHING_GIST,
	FETCH_GIST_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	gist: '',
	credentials: '',
	user: '',
	loading: false,
	error: ''
}

export default (state = INITIAL_STATE, action) => {
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
			return { ...state, error: '' };
		case QR_NOT_GIST:
			return { ...state, error: 'Scanned QRCode is not a Gist URL.'};
		case INVALID_CODE:
			return { ...state, error: 'Scanned code is not a QR Code.'};
		case FETCHING_GIST:
			return { ...state, loading: true };
		case FETCH_GIST_SUCCESS:
			return { ...state, error: '', gist: action.payload, loading: false };
		default: 
			return state;
	}
}
