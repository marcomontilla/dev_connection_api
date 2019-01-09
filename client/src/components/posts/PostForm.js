import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
	state = {
		text: '',
		errors: {},
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	};

	onChangeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmitHandler = e => {
		e.preventDefault();
		console.log('submitted');

		const { user } = this.props.auth;

		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};

		this.props.addPost(newPost);
		this.setState({ text: '' });
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Something...</div>
					<div className="card-body">
						<form onSubmit={this.onSubmitHandler}>
							<div className="form-group">
								<TextAreaFieldGroup
									className="form-control form-control-lg"
									placeholder="Create a post"
									name="text"
									value={this.state.text}
									onChange={this.onChangeHandler}
									error={errors.text}
								/>
							</div>

							<input type="submit" value="Submit" className="btn btn-dark" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ addPost }
)(PostForm);
