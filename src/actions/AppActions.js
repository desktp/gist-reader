import { ToastAndroid } from 'react-native';
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
	FETCH_GIST_SUCCESS,
	INPUT_CHANGED,
	SUBMITTING_COMMENT,
	SUBMIT_COMMENT_SUCCESS,
	SUBMIT_COMMENT_FAIL
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

export const inputChanged = (text) => {
	return ({
		type: INPUT_CHANGED,
		payload: text
	})
};

export const submitComment = (comment, credentials, gistId, url) => (
	(dispatch) => {
		dispatch({ type: SUBMITTING_COMMENT });
		
		const body = { body: comment }

		const config = {
			method: 'POST',
			headers: {
				'Authorization': credentials.authorizationHeader,
				'Content-Type': 'application/vnd.github.v3.text+json'
			},
			body: JSON.stringify(body)
		};

		fetch(url, config)
			.then(res => {
				console.log(res);
				if (res.ok) {
					dispatch(getGistDetails(gistId, credentials));

					dispatch({ type: SUBMIT_COMMENT_SUCCESS });
				} else {
					ToastAndroid.show('An error ocurred, please try again.', ToastAndroid.SHORT);

					dispatch({ type: SUBMIT_COMMENT_FAIL });
				}
			})
			.catch(err => console.log(err));
	}
);

