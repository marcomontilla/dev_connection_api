import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

export class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	onDeleteClickHandler = e => {
		this.props.deleteAccount();
	};

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;

		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			// Check if logged in user has profile data
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Wellcome{' '}
							<Link to={`/profile/${profile.handle}`}>{user.name}</Link>
						</p>

						<ProfileActions />

						<Experience experience={profile.experience} />

						<Education education={profile.education} />

						{/* TODO: edu */}

						<div style={{ marginBottom: '60px' }}>
							<button
								onClick={this.onDeleteClickHandler}
								className="btn btn-danger"
							>
								Delete Account
							</button>
						</div>
					</div>
				);
			}
			// Check if logged in but has no profile
			else {
				dashboardContent = (
					<div>
						<p className="lead text-muted">Wellcome {user.name}</p>
						<p>You have not setup a profile yet, please add some info</p>
						<Link to="create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}

		return (
			<div className="Dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard);
