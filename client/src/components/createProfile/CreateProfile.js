import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

/* 
	<TextFieldGroup
		name="email"
		placeholder="Email Address"
		value={this.state.email}
		type="email"
		info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
		error={errors.email}
		onChange={this.onChangeHandler}
	/> 
*/

class CreateProfile extends Component {
	state = {
		displaySocialImputs: false,
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		youtube: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		instagram: '',
		errors: {},
	};

	onChangeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmitHandler = e => {
		e.preventDefault();

		console.log('submitted');
	};

	render() {
		const { errors } = this.state;
		const options = [
			{ lable: '* Select Professional Status', value: 0 },
			{ lable: 'Developer', value: 'Developer' },
			{ lable: 'Junior Developer', value: 'Junior Developer' },
			{ lable: 'Senior Developer', value: 'Senior Developer' },
			{ lable: 'Manager', value: 'Manager' },
			{ lable: 'Student or Learning', value: 'Student or Learning' },
			{ lable: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{ lable: 'Intern', value: 'Intern' },
			{ lable: 'Other', value: 'Other' },
		];
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p className="lead text-center">
								Let's get some information to make your profile stand out
							</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmitHandler}>
								<TextFieldGroup
									name="handle"
									placeholder="* Profile Handle"
									value={this.state.handle}
									onChange={this.onChangeHandler}
									error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nickname"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors,
});

export default connect(mapStateToProps)(CreateProfile);
