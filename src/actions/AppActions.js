import { NavigationActions } from 'react-navigation';

import { 
	LOGGING_IN,
	AUTH_SUCCESS,
	AUTH_FAILED,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAIL,
	QR_READ_SUCCESS, 
	QR_NOT_GIST, 
	INVALID_CODE 
} from './types';

export const login = (authResponse) => (
	(dispatch) => {
		dispatch({ type: LOGGING_IN });

		if (authResponse.authorized && authResponse.status === 'ok') {
			dispatch(getUserInfo(authResponse.response.credentials));

			return dispatch({
				type: AUTH_SUCCESS,
				payload: authResponse.response.credentials
			});
		}

		return dispatch({ type: AUTH_FAILED });
	}
);

const getUserInfo = (credentials) => (
	(dispatch) => {
		const config = {
			headers: {
				'Authorization': credentials.authorizationHeader,
			}
		};

		fetch('https://api.github.com/user', config)
			.then(res => {
				if (res.ok) {
					res.json().then(data => {
						dispatch({
							type: GET_USER_INFO_SUCCESS,
							payload: data
						});	
						
						dispatch(NavigationActions.navigate({ routeName: 'Reader' }));	
					});
				} else {
					dispatch({
						type: GET_USER_INFO_FAIL
					})
				}
			});
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
