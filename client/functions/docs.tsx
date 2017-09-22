import axios from 'axios';

export const getDocsList = () => {
	let request = 'https://web-portal-for-partners.firebaseio.com/docs.json';
	return axios(request, { method: 'GET' }).then(response => response.data);
};

export const getArticle = (url: string) => {
	return axios(url, { method: 'GET' }).then(response => response.data);
}