import { NavigationActions } from 'react-navigation';

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

export const readQR = (event, credentials) => (
	(dispatch) => {
		const { type, data } = event;
		
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

		dispatch(getGistDetails(gistId, credentials));

		return dispatch({
			type: QR_READ_SUCCESS
		});	
	}
	
);

const getGistDetails = (gistId, credentials) => (
	(dispatch) => {
		dispatch({ type: FETCHING_GIST });
		
		const config = {
			headers: {
				'Authorization': credentials.authorizationHeader,
			}
		};

		fetch(`https://api.github.com/gists/${gistId}`, config)
			.then(res => {
				if (res.ok) {
					res.json().then(data => {
						dispatch({
							type: FETCH_GIST_SUCCESS,
							payload: data
						});
					})
				}
			}) 
	}
);