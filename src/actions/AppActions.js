import { NavigationActions } from 'react-navigation';

import { QR_READ_SUCCESS, QR_NOT_GIST, INVALID_CODE } from './types';

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
