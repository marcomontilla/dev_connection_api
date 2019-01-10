import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';
import Moment from 'react-moment';

class CommentItem extends Component {
	onDeleteClickHandler = (postId, commentId) => {
		this.props.deleteComment(postId, commentId);
	};

	render() {
		const { comment, postId, auth } = this.props;

		return (
			<div className="card mb-3">
				<div className="card-header">
					<div className="row">
						<div className="col text-left">
							<Moment format="YYYY/MM/DD hh:mm:ss A">{comment.date}</Moment>
						</div>
						<div className="col text-right">
							{comment.user === auth.user.id ? (
								<button
									onClick={e => this.onDeleteClickHandler(postId, comment._id)}
									type="button"
									className="close"
									aria-label="Close"
								>
									<span aria-hidden="true">&times;</span>
								</button>
							) : null}
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-md-2">
							<a href="profile.html">
								<img
									className="rounded-circle d-none d-md-block"
									src={comment.avatar}
									alt=""
								/>
							</a>
							<br />
						</div>
						<div className="col-md-10">
							<blockquote className="blockquote">
								<p className="mb-0">{comment.text}</p>
								<footer className="blockquote-footer text-right">
									{comment.name}
								</footer>
							</blockquote>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CommentItem.propTypes = {
	deleteComment: PropTypes.func.isRequired,
	comment: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ deleteComment }
)(CommentItem);
