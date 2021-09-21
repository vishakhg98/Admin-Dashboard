import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { post } from '../utils/apiRequest';
import { ACCESS_TOKEN, PUBLIC_IMAGE_PATH } from '../utils/Constants';
import { createCookie, getCookie } from '../utils/Cookies';
import {
	DASHBOARD_PATH,
	FORGOT_PASSWORD_PATH,
	GITHUB_REPO,
	REGISTER_PATH
} from '../utils/routeUrls';
import './Css/Login.css';

function Login(props) {
	const userAccessToken = getCookie(ACCESS_TOKEN);

	const [authCred, setAuthCred] = useState({ email: '', password: '' });

	if (userAccessToken) {
		return <Redirect to={DASHBOARD_PATH} />;
	}

	async function handleSubmit() {
		const payload = {
			email: authCred.email,
			password: authCred.password
		};

		if (!authCred.email || !authCred.password) return false;

		try {
			const response = await post('login', payload);

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
				<div className="authHeading">Log in</div>
				<div className="formContainer">
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
						<p
							className="forgotPassword"
							onClick={() => {
								props.history.push(FORGOT_PASSWORD_PATH);
							}}
						>
							Forgot Password?
						</p>
					</div>

					<div className="authButtonContainer">
						<button
							className="authButton"
							onClick={() => {
								handleSubmit();
							}}
						>
							Log In
						</button>
					</div>

					<div className="authPageSwitch">
						<p>
							Don't have an account?
							<span
								onClick={() => {
									props.history.push(REGISTER_PATH);
								}}
							>
								{' '}
								Sign up{' '}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(Login);
