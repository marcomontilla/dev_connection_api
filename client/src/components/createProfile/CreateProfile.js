import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

{
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
}

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

	render() {
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
