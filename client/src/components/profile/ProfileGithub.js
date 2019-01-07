import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ProfileGithub extends Component {
	state = {
		clientId: 'c8dbbeaf473d1ef14b77',
		clientSecret: '25f4520795086268f8e9f811f29fdb500bacfd0b',
		count: 3,
		sort: 'created: des',
		repos: [],
	};

	componentDidMount() {
		const { username } = this.props;
		const { clientId, clientSecret, count, sort } = this.state;

		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
		)
			.then(res => {
				if (res.status === 200) return res.json();
				else return null;
			})
			.then(data => {
				if (this.refs.myRef) this.setState({ repos: data });
			})
			.catch(err => console.log(err));
	}

	render() {
		const { repos } = this.state;
		let repoItems;

		if (repos) {
			repoItems = repos.map(repo => (
				<div key={repo.id} className="card card-body mb-2">
					<div className="row">
						<div className="col-md-8">
							<h4>
								<a
									href={repo.html_url}
									rel="noopener noreferrer"
									className="text-info"
									target="_blank"
								>
									<img
										src={repo.owner.avatar_url}
										style={{ width: '25px', height: '25px' }}
										className="rounded-circle"
										alt={repo.name}
									/>{' '}
									{repo.name}
								</a>
							</h4>
							<p>{repo.description}</p>
						</div>
						<div className="col-md-4">
							<span className="badge badge-info mr-1">
								Stars: {repo.stargazers_count}
							</span>
							<span className="badge badge-secondary mr-1">
								Watchers: {repo.watchers_count}
							</span>
							<span className="badge badge-success">
								Forks: {repo.forks_count}
							</span>
						</div>
					</div>
				</div>
			));
		} else {
			repoItems = '';
		}

		return (
			<div ref="myRef">
				{repoItems === '' ? null : (
					<span>
						<hr />
						<h3 className="mb-4">Latest Github Repos</h3>
						{repoItems}
					</span>
				)}
			</div>
		);
	}
}

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired,
};

export default ProfileGithub;
