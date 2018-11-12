import axios from 'axios'

import { GET_ERRORS, GET_PROFILE, PROFILE_LOADING } from './types'

// Get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading())
	axios
		.get('/api/profile')
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		// it is because there may be users without PROFILE
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: {},
			})
		)
}

// Profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	}
}
