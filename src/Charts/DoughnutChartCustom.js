import React from 'react';
import styles from './Css/DoughnutChartCustom.css';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function DoughnutChartCustom(props) {
	let data = [
		{ name: 'Group A', value: 400 },
		{ name: 'Group B', value: 300 },
		{ name: 'Group C', value: 300 }
	];

	if (props.data) {
		data = props.data;
	}
	const COLORS = ['#404a56', '#2bc156', '#ff5d5a'];

	return (
		<div className={styles.base}>
			<PieChart width={500} height={250}>
				<Pie
					data={data}
					key={Math.random()}
					innerRadius={60}
					outerRadius={110}
					fill="#8884d8"
					paddingAngle={5}
					dataKey={props.dataKey ? props.dataKey : 'value'}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>

			<div className={styles.labelWrapper}>
				{props.showTotal && (
					<div className={styles.labelRow}>
						<div
							className={styles.colorBox}
							style={{ background: '#b519ec' }}
						/>
						<div className={styles.label}>
							Total: {data.reduce((x, y) => x + y.value, 0)}
						</div>
					</div>
				)}
				{data.map((item, id) => {
					return (
						<div className={styles.labelRow} key={id}>
							<div
								className={styles.colorBox}
								style={{ background: COLORS[id] }}
							/>
							<div className={styles.label}>
								{item.country}: {item.value}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
