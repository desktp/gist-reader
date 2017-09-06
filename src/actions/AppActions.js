import { NavigationActions } from 'react-navigation';

import { 
	AUTH_SUCCESS,
	AUTH_FAILED,
	QR_READ_SUCCESS, 
	QR_NOT_GIST, 
	INVALID_CODE 
} from './types';

export const login = (authResponse) => (
	(dispatch) => {
		if (authResponse.authorized && authResponse.status === 'ok') {
			dispatch(NavigationActions.navigate({ routeName: 'Reader' }));

			return dispatch({
				type: AUTH_SUCCESS,
				payload: authResponse.response.credentials
			});
		}

		return dispatch({ type: AUTH_FAILED });
	}
);

export const readQR = ({ type, data }) => (
	(dispatch) => {
		if (type != 'QR_CODE') {
			dispatch({ type: INVALID_CODE });
			return;
		}

		if (!data.includes('gist.github.com')) {
			dispatch({ type: QR_NOT_GIST });
			return;
		}

		const url = data.split('/');
		const gistId = url[url.length - 1];
		
		dispatch(NavigationActions.navigate({ routeName: 'Gist' }));

		return dispatch({
			type: QR_READ_SUCCESS,
			payload: gistId
		});	
	}
	
);
