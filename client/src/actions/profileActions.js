import axios from 'axios';
import swal from 'sweetalert';
import { clearErrors } from './commonActions';

import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER,
	GET_PROFILES,
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
	// eslint-disable-next-line
	dispatch(setProfileLoading());
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
		);
};

// Get Profile by hanlde
export const getProfileByHandle = handle => dispatch => {
	// eslint-disable-next-line
	dispatch(setProfileLoading());
	axios
		.get(`/api/profile/handle/${handle}`)
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
				payload: null,
			})
		);
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/profile', profileData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/profile/experience', expData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Add Education
export const addEducation = (eduData, history) => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/profile/education', eduData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Delete Experience
export const deleteExperience = id => dispatch => {
	dispatch(clearErrors());
	axios
		.delete(`/api/profile/experience/${id}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Delete Education
export const deleteEducation = id => dispatch => {
	axios
		.delete(`/api/profile/education/${id}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Get All Profiles
export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile/all')
		.then(res =>
			dispatch({
				type: GET_PROFILES,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: null,
			})
		);
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
	swal({
		title: 'Are you sure?',
		text: 'Once deleted, This can NOT be undone!',
		icon: 'warning',
		buttons: true,
		dangerMode: true,
	}).then(willDelete => {
		if (willDelete) {
			swal('Poof! Your Post has been deleted!', {
				buttons: false,
				icon: 'success',
				closeOnClickOutside: true,
				closeOnEsc: true,
				timer: 500,
			});
			dispatch(clearErrors());
			axios
				.delete('/api/profile')
				.then(res =>
					dispatch({
						type: SET_CURRENT_USER,
						payload: {},
					})
				)
				.catch(err =>
					dispatch({
						type: GET_ERRORS,
						payload: err.response.data,
					})
				);
		}
	});
};

// Profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	};
};

// Clear Profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE,
	};
};
