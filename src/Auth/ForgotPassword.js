import React from 'react';
import { withRouter } from 'react-router';
import { LOGIN_PATH } from '../utils/routeUrls';
import './Css/ForgotPassword.css';

function ForgotPassword(props) {
	return (
		<div className="forgotPassBase">
			<div className="forgotPassBox">
				<h4>Forgot Password</h4>
				<p>Sorry, this page isn't ready yet!</p>
				<div className="authButtonContainer" style={{ width: 400 }}>
					<button
						className="authButton"
						onClick={() => {
							props.history.push(LOGIN_PATH);
						}}
					>
						Go back to Login
					</button>
				</div>
			</div>
		</div>
	);
}

export default withRouter(ForgotPassword);
