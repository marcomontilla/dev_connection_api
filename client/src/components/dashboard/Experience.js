import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

export class Experience extends Component {
	/**
	 * To bind a function without state in a Class Component
	 *
	 * onClick={this.onDeleteClickHandler.bind(this, exp._id)}
	 * or
	 * onClick={e => this.onDeleteClickHandler(exp._id)}
	 */
	onDeleteClickHandler = id => {
		this.props.deleteExperience(id);
	};

	render() {
		const experience = this.props.experience.map(exp => (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
					{exp.to === null ? (
						'Now'
					) : (
						<Moment format="YYYY/MM/DD">{exp.to}</Moment>
					)}
				</td>
				<td>
					<button
						onClick={e => this.onDeleteClickHandler(exp._id)}
						className="btn btn-danger"
					>
						Delete
					</button>
				</td>
			</tr>
		));

		return (
			<div className="">
				<h4 className="mb-4">Experience Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{experience}</tbody>
				</table>
			</div>
		);
	}
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired,
};

export default connect(
	null,
	{ deleteExperience }
)(Experience);
