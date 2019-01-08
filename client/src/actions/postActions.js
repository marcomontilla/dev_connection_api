import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POST, POST_LOADING } from './types';

// Add Post
export const addPost = postData => dispatch => {
	axios
		.post('api/posts', postData)
		.then(res =>
			dispatch({
				type: ADD_POST,
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

// Get Posts
export const getPosts = () => dispatch => {
	axios
		.get('api/posts', postData)
		.then(res =>
			dispatch({
				type: ADD_POST,
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

// Post loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING,
	};
};
