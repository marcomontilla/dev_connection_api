import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

// eslint-disable-next-line
import classnames from 'classnames';

export class PostItem extends Component {
	onDeleteHandler = id => {
		this.props.deletePost(id);
	};

	onLikeHandler = (id, likes) => {
		if (this.findUserLike(likes)) {
			this.props.removeLike(id);
		} else {
			this.props.addLike(id);
		}
	};

	// onLikeHandler = id => {
	// 	this.props.addLike(id);
	// };
	// onUnlikeHandler = id => {
	// 	this.props.removeLike(id);
	// };

	findUserLike(likes) {
		const { auth } = this.props;

		if (likes.filter(like => like.user === auth.user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const { post, auth } = this.props;

		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<Link to="/profiles/handle">
							<img
								className="rounded-circle d-none d-md-block"
								src={post.avatar}
								alt=""
							/>
						</Link>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						<button
							// onClick={e => this.onLikeHandler(post._id)}
							onClick={e => this.onLikeHandler(post._id, post.likes)}
							type="button"
							className="btn btn-light mr-1"
						>
							<i
								className={classnames('fas fa-heart', {
									'text-danger': this.findUserLike(post.likes),
								})}
							/>{' '}
							<span className="badge badge-light"> {post.likes.length}</span>
						</button>
						{/* <button
							onClick={e => this.onUnlikeHandler(post._id)}
							type="button"
							className="btn btn-light mr-1"
						>
							<i className="text-secondary fas fa-thumbs-down" />
						</button> */}
						<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
							Comments
						</Link>
						{post.user === auth.user.id ? (
							<button
								onClick={e => this.onDeleteHandler(post._id)}
								type="button"
								className="btn btn-outline-danger mr-1 text-center"
							>
								<i className="fas fa-trash" />
							</button>
						) : null}
						{/* */}
					</div>
				</div>
			</div>
		);
	}
}

PostItem.propTypes = {
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ deletePost, addLike, removeLike }
)(PostItem);
