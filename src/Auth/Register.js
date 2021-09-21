import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../utils/apiRequest';
import { ACCESS_TOKEN, PUBLIC_IMAGE_PATH } from '../utils/Constants';
import { createCookie } from '../utils/Cookies';
import { DASHBOARD_PATH, GITHUB_REPO, LOGIN_PATH } from '../utils/routeUrls';
import './Css/Login.css';

function Login(props) {
	const [authCred, setAuthCred] = useState({
		name: '',
		email: '',
		password: ''
	});

	async function handleSubmit() {
		const payload = {
			name: authCred.name,
			email: authCred.email,
			password: authCred.password
		};

		if (!authCred.name || !authCred.email || !authCred.password) return false;

		try {
			const response = await post('register', payload);
			const responseJson = await response.json();

			if (responseJson.status) {
				createCookie(ACCESS_TOKEN, responseJson.data);
				props.history.push(DASHBOARD_PATH);
			} else {
				throw new Error(responseJson.message);
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="authBase">
			<div className="authHeader">
				<img
					className="logo"
					src={`${PUBLIC_IMAGE_PATH}/logo.png`}
					alt="GitHub"
					onClick={() => window.open(GITHUB_REPO, '_blank').focus()}
				/>
			</div>

			<div className="contentContainer">
				<div className="authHeading">Register</div>
				<div className="formContainer">
					<div className="formGroup">
						<label htmlFor="email" className="inputLabel">
							Name
						</label>
						<input
							className="authInput"
							type="text"
							value={authCred.name}
							onChange={e => setAuthCred({ ...authCred, name: e.target.value })}
							placeholder="Mike Doe"
						/>
					</div>

					<div className="formGroup">
						<label htmlFor="email" className="inputLabel">
							Email Address
						</label>
						<input
							className="authInput"
							type="email"
							value={authCred.email}
							onChange={e =>
								setAuthCred({ ...authCred, email: e.target.value })
							}
							placeholder="mike@gmail.com"
						/>
					</div>

					<div className="formGroup">
						<label htmlFor="password" className="inputLabel">
							Password
						</label>
						<input
							className="authInput"
							type="password"
							value={authCred.password}
							onChange={e =>
								setAuthCred({ ...authCred, password: e.target.value })
							}
							placeholder="Enter your password"
						/>
					</div>

					<div className="authButtonContainer">
						<button
							className="authButton"
							onClick={() => {
								handleSubmit();
							}}
						>
							Register
						</button>
					</div>

					<div className="authPageSwitch">
						<p>
							Already have an account?
							<span
								onClick={() => {
									props.history.push(LOGIN_PATH);
								}}
							>
								{' '}
								Sign In{' '}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(Login);
