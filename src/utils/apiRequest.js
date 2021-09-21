// const LOCAL_API_URL = 'http://localhost:9000';
const API_URL = process.env.REACT_APP_API_KEY;

export const get = url => {
	const headers = {
		'Content-Type': 'application/json'
	};

	return fetch(`${API_URL}/${url}`, {
		method: 'get',
		headers
	});
};

export const post = (url, data = []) => {
	const headers = {
		'Content-Type': 'application/json',
		'Cache-Control': 'no-cache'
	};

	return fetch(`${API_URL}/${url}`, {
		method: 'post',
		body: JSON.stringify(data),
		headers
	});
};
