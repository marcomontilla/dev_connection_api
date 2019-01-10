import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import Moment from 'react-moment';

class PostItem extends Component {
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

	findUserLike(likes) {
		const { auth } = this.props;

		if (likes.filter(like => like.user === auth.user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const { post, auth, showActions } = this.props;

		return (
			<div className="card mb-3">
				{!showActions ? (
					<span>
						<div className="card-header">
							<div className="row">
								<div className="col text-left">
									<Moment format="YYYY/MM/DD hh:mm:ss A">{post.date}</Moment>
								</div>
								<div className="col text-right">
									<i
										className={classnames('fas fa-heart', {
											'text-danger': this.findUserLike(post.likes),
										})}
									/>{' '}
									<span className="badge badge-light">
										{' '}
										{post.likes.length}
									</span>
								</div>
							</div>
						</div>
					</span>
				) : null}
				<div className="card-body">
					<div className="row">
						<div className="col-md-2">
							<Link to="/profiles">
								<img
									className="rounded-circle d-none d-md-block"
									src={post.avatar}
									alt=""
								/>
							</Link>
						</div>
						<div className="col-md-10">
							<blockquote className="blockquote">
								<p className="mb-0">{post.text}</p>
								<footer className="blockquote-footer text-right">
									{post.name}
								</footer>
							</blockquote>

							{showActions ? (
								<span>
									<div className="btn-group" role="group" aria-label="ACTIONS">
										<button
											onClick={e => this.onLikeHandler(post._id, post.likes)}
											type="button"
											className="btn btn-light"
										>
											<i
												className={classnames('fas fa-heart', {
													'text-danger': this.findUserLike(post.likes),
												})}
											/>{' '}
											<span className="badge badge-light">
												{' '}
												{post.likes.length}
											</span>
										</button>
										<Link to={`/post/${post._id}`} className="btn btn-info">
											Comments
										</Link>
										{post.user === auth.user.id ? (
											<button
												onClick={e => this.onDeleteHandler(post._id)}
												type="button"
												className="btn btn-danger text-center"
											>
												<i className="fas fa-trash" />
											</button>
										) : null}
									</div>
								</span>
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PostItem.defaultProps = {
	showActions: true,
};

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
