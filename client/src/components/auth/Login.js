import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {},
	}

	onChangeHandler = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	onSubmitHandler = event => {
		event.preventDefault()

		const User = {
			email: this.state.email,
			password: this.state.password,
		}

		axios
			.post('/api/user/login', User)
			.then(res => console.log(res.data))
			.catch(err => this.setState({ errors: err.response.data }))
	}
	render() {
		const { errors } = this.state

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">
								Sign in to your DevConnector account
							</p>
							<form action="dashboard.html" onSubmit={this.onSubmitHandler}>
								<div className="form-group">
									<input
										type="email"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.email,
										})}
										placeholder="Email Address"
										name="email"
										value={this.state.email}
										onChange={this.onChangeHandler}
									/>
									{errors.email && (
										<div className="invalid-feedback	"> {errors.email}</div>
									)}
								</div>
								<div className="form-group">
									<input
										type="password"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.password,
										})}
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.onChangeHandler}
									/>
									{errors.password && (
										<div className="invalid-feedback	"> {errors.password}</div>
									)}
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login
