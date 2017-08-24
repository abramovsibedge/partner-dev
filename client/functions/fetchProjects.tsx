import config from '../config';

const fetchProjects = () => {
	return fetch(config.host + 'portal/projects?access_token=' + config.firebaseToken)
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
		});
};

export default fetchProjects;