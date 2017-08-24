import config from '../config';

const fetchProjectItem = (id: string) => {
	const countries = fetch(config.host + 'portal/project/countries?access_token=' + config.firebaseToken+ '&publickey=' + id, {
		method: 'POST'
	}).then(function(response){
		return response.json()
	});

	const emails = fetch(config.host + 'portal/project/access?access_token=' + config.firebaseToken + '&publickey=' + id).then(function(response){
		return response.json()
	});

	const combinedData = {"countries":{},"emails":{}};

	return Promise.all([countries, emails]).then(result => {
		combinedData["countries"] = result[0];
		combinedData["emails"] = result[1];
		return combinedData;
	});
};

export default fetchProjectItem;


