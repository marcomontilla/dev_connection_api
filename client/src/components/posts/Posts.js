import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';

class Posts extends Component {
	render() {
		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col">
							<PostForm />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	post: state.post,
});

export default connect(mapStateToProps)(Posts);
