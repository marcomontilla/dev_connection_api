import axios from 'axios';
import swal from 'sweetalert';

import {
	ADD_POST,
	GET_ERRORS,
	POST_LOADING,
	GET_POSTS,
	DELETE_POST,
} from './types';

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
	dispatch(setPostLoading());
	axios
		.get('api/posts')
		.then(res =>
			dispatch({
				type: GET_POSTS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null,
			})
		);
};

// Delete Post
export const deletePost = id => dispatch => {
	swal({
		title: 'Are you sure?',
		text: 'Once deleted, This can NOT be undone!',
		icon: 'warning',
		buttons: true,
		dangerMode: true,
	}).then(willDelete => {
		if (willDelete) {
			swal('Poof! Your Post has been deleted!', {
				icon: 'success',
			});
			axios
				.delete(`/api/posts/${id}`)
				.then(res =>
					dispatch({
						type: DELETE_POST,
						payload: id,
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

	// if (window.confirm('Are you sure? This can NOT be undone!')) {
	// 	axios
	// 		.delete(`/api/posts/${id}`)
	// 		.then(res =>
	// 			dispatch({
	// 				type: DELETE_POST,
	// 				payload: id,
	// 			})
	// 		)
	// 		.catch(err =>
	// 			dispatch({
	// 				type: GET_ERRORS,
	// 				payload: err.response.data,
	// 			})
	// 		);
	// }
};

// Add Like
export const addLike = id => dispatch => {
	axios
		.post(`/api/posts/like/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Remove Like
export const removeLike = id => dispatch => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then(res => dispatch(getPosts()))
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
