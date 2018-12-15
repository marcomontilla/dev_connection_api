import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';

class CreateProfile extends Component {
	state = {
		displaySocialInputs: false,
		githubusername: '',
		instagram: '',
		facebook: '',
		linkedin: '',
		location: '',
		company: '',
		twitter: '',
		website: '',
		youtube: '',
		handle: '',
		status: '',
		skills: '',
		bio: '',
		errors: {},
	};

	componentDidMount = () => {
		this.props.getCurrentProfile();
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;

			// Bring skills array to CSV
			const skillsCVS = profile.skills.join(',');

			// If profile field does not exist, make empty string
			profile.company = !isEmpty(profile.company) ? profile.company : '';
			profile.website = !isEmpty(profile.website) ? profile.website : '';
			profile.location = !isEmpty(profile.location) ? profile.location : '';
			profile.githubusername = !isEmpty(profile.githubusername)
				? profile.githubusername
				: '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.social.twitter = !isEmpty(profile.social.twitter)
				? profile.social.twitter
				: '';
			profile.social.facebook = !isEmpty(profile.social.facebook)
				? profile.social.facebook
				: '';
			profile.social.linkedin = !isEmpty(profile.social.linkedin)
				? profile.social.linkedin
				: '';
			profile.social.youtube = !isEmpty(profile.social.youtube)
				? profile.social.youtube
				: '';
			profile.social.instagram = !isEmpty(profile.social.instagram)
				? profile.social.instagram
				: '';

			// Set Component fields state
			this.setState({
				handle: profile.handle,
				company: profile.company,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				skills: skillsCVS,
				githubusername: profile.githubusername,
				bio: profile.bio,
				youtube: profile.youtube,
				twitter: profile.twitter,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				instagram: profile.instagram,
			});
		}
	};

	onChangeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmitHandler = e => {
		e.preventDefault();

		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			youtube: this.state.youtube,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			instagram: this.state.instagram,
		};

		this.props.createProfile(profileData, this.props.history);
	};

	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChangeHandler}
						error={errors.twitter}
					/>

					<InputGroup
						placeholder="Facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChangeHandler}
						error={errors.facebook}
					/>

					<InputGroup
						placeholder="Linkedin Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChangeHandler}
						error={errors.linkedin}
					/>

					<InputGroup
						placeholder="Youtube Channel URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChangeHandler}
						error={errors.youtube}
					/>

					<InputGroup
						placeholder="Instagram Page URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChangeHandler}
						error={errors.instagram}
					/>
				</div>
			);
		}
		const options = [
			{ label: '* Select Professional Status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Learning', value: 'Student or Learning' },
			{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' },
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
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									onChange={this.onChangeHandler}
									options={options}
									error={errors.status}
									info="Give us an idea of where you are at in your career"
								/>
								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									onChange={this.onChangeHandler}
									error={errors.company}
									info="Could be your own company or one you work for"
								/>
								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									onChange={this.onChangeHandler}
									error={errors.website}
									info="Could be your own website or a company one"
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChangeHandler}
									error={errors.location}
									info="City or city & state suggested (eg. Boston, MA)"
								/>
								<TextFieldGroup
									placeholder="Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.onChangeHandler}
									error={errors.skills}
									info="Please use comma separated values (eg.
										HTML,CSS,JavaScript,PHP"
								/>
								<TextFieldGroup
									placeholder="Github Username"
									name="githubusername"
									value={this.state.githubusername}
									onChange={this.onChangeHandler}
									error={errors.githubusername}
									info="If you want your latest repos and github link,
										include your username"
								/>
								<TextAreaFieldGroup
									placeholder="Short Bio"
									name="bio"
									value={this.state.bio}
									onChange={this.onChangeHandler}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>

								<div className="mb-3">
									<button
										type="button"
										onClick={Event => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs,
											}));
										}}
										className="btn btn-light"
									>
										Add Social Networks Links
									</button>
									<span className="text-muted">Optional</span>
								</div>

								{socialInputs}

								<input
									type="submit"
									value="Submit"
									className="btn btn-info btn-block mt-4"
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
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
