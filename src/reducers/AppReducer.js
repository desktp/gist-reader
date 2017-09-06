import { 
	AUTH_SUCCESS,
	AUTH_FAILED,
	QR_READ_SUCCESS, 
	QR_NOT_GIST, 
	INVALID_CODE 
} from '../actions/types';

const INITIAL_STATE = {
	gist: '',
	credentials: '',
	error: ''
}

export default (state = INITIAL_STATE, action) => {
	console.log(action.type);
	console.log(action.payload);
	switch (action.type) {
		case AUTH_SUCCESS:
			return { ...state, credentials: action.payload, error: '' };
		case AUTH_FAILED:
			return { ...state, error: 'Authentication failed, try again.' };
		case QR_READ_SUCCESS:
			return { ...state, gist: action.payload, error: '' };
		case QR_NOT_GIST:
			return { ...state, error: 'Scanned QRCode is not a Gist URL.'};
		case INVALID_CODE:
			return { ...state, error: 'Scanned code is not a QR Code.'};
		default: 
			return INITIAL_STATE;
	}
}
