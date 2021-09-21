import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import BarChartCustom from '../Charts/BarChartCustom';
import DoughnutChartCustom from '../Charts/DoughnutChartCustom';
import { get } from '../utils/apiRequest';
import { ACCESS_TOKEN } from '../utils/Constants';
import { deleteCookie, getCookie } from '../utils/Cookies';
import { LOGIN_PATH } from '../utils/routeUrls';
import './Css/Dashboard.css';

function Dashboard(props) {
	const userAccessToken = getCookie(ACCESS_TOKEN);

	const [userData, setuserData] = useState({});
	const [graphData, setGraphData] = useState([]);

	useEffect(() => {
		getInitialData();
		// eslint-disable-next-line
	}, []);

	async function getInitialData() {
		if (!userAccessToken) {
			return <Redirect to={LOGIN_PATH} />;
		}

		const response = await get(`userdata/${userAccessToken}`);
		const responseJson = await response.json();

		if (responseJson.status) {
			let tempGraphData = [
				{ country: 'India', value: responseJson.data.india },
				{ country: 'Oman', value: responseJson.data.oman },
				{ country: 'US', value: responseJson.data.unitedStates }
			];

			let userDataTemp = { ...responseJson.data };
			let totalSum = tempGraphData.reduce((a, b) => a + b.value, 0);
			userDataTemp.totalSum = totalSum;

			setGraphData(tempGraphData);
			setuserData(userDataTemp);
		} else {
			throw new Error(responseJson.message);
		}
	}

	return (
		<div className="dashboardBase">
			<div className="dashTopContainer">
				Welcome <span className="userName">{userData.name}</span>
				<div className="logout">
					<button
						className="authButton"
						onClick={() => {
							deleteCookie(ACCESS_TOKEN);
							props.history.push(LOGIN_PATH);
						}}
					>
						Logout
					</button>
				</div>
			</div>
			<div className="whiteLine" />
			<div className="bottomContainer">
				<div className="leftContainer">
					<div className="barChartContainer">
						<BarChartCustom data={graphData} headKey="name" dataKey="value" />
					</div>
					<div className="countPercentage">
						India : {((userData.india / userData.totalSum) * 100).toFixed(2)}{' '}
						<br />
						Oman : {((userData.oman / userData.totalSum) * 100).toFixed(2)}
						<br />
						US :{' '}
						{((userData.unitedStates / userData.totalSum) * 100).toFixed(2)}
					</div>
				</div>
				<div className="rightContainer">
					<div className="doughnutChartContainer">
						<DoughnutChartCustom data={graphData} labelBottom={false} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(Dashboard);
