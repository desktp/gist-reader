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
	FETCH_GIST_SUCCESS,
	INPUT_CHANGED,
	SUBMITTING_COMMENT,
	SUBMIT_COMMENT_SUCCESS,
	SUBMIT_COMMENT_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	gist: '',
	credentials: '',
	user: '',
	comment: '',
	loading: false,
	error: '',
	isScanActive: true,
}

export default (state = INITIAL_STATE, action) => {
	console.log(action.type);
	console.log(action.payload);
	switch (action.type) {
		case FETCHING_GIST:
		case SUBMITTING_COMMENT:
		case LOGGING_IN:
			return { ...state, loading: true };
		case AUTH_SUCCESS:
			return { ...state, credentials: action.payload, error: '' };
		case AUTH_FAILED:
			return { ...state, error: 'Authentication failed, try again.', loading: false  };
		case GET_USER_INFO_SUCCESS:
			return { ...state, user: action.payload, loading: false };
		case GET_USER_INFO_FAIL:
			return { ...state, error: 'Get user info failed, try again.', loading: false  };
		case QR_READ_SUCCESS:
			return { ...state, error: '', isScanActive: false };
		case QR_NOT_GIST:
			return { ...state, error: 'Scanned QRCode is not a Gist URL.', isScanActive: true };
		case INVALID_CODE:
			return { ...state, error: 'Scanned code is not a QR Code.', isScanActive: true };
		case SUBMIT_COMMENT_SUCCESS:
			return { ...state, loading: false, comment: '' };
		case SUBMIT_COMMENT_FAIL:
			return { ...state, loading: false };
		case FETCH_GIST_SUCCESS:
			return { ...state, error: '', gist: action.payload, loading: false };
		case INPUT_CHANGED:
			return { ...state, comment: action.payload };
		default: 
			return state;
	}
}
