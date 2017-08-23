const access_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjEzM2VhOTIzM2IyZDI2OTkwMTBjNDlkYTA2NDJiZTZmOGM5NDY4ODQifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd2ViLXBvcnRhbC1mb3ItcGFydG5lcnMiLCJhdWQiOiJ3ZWItcG9ydGFsLWZvci1wYXJ0bmVycyIsImF1dGhfdGltZSI6MTUwMzQ2NzkwMiwidXNlcl9pZCI6IjhmOHJFZ0tSM3ZSNzVaSWtlNUJ3aXBReUNIeTEiLCJzdWIiOiI4ZjhyRWdLUjN2Ujc1WklrZTVCd2lwUXlDSHkxIiwiaWF0IjoxNTAzNDY3OTAyLCJleHAiOjE1MDM0NzE1MDIsImVtYWlsIjoiMHh5OWVuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjB4eTllbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.jJCzey1cym6SNh65mTuTrU_qqtXZumhN9nnb_LyfW0EaURIHzOBxU2nYZuPwhU0pmEinR8eS7sGoQk8yI268r7-nxAeAHrJixc4XZkEyu8IM8R9SjA9VIwCkaPOwXe3H87jjhnUslv1feBSf70l4_wr-Jd8VoBEMOnGll72-_37_O6gQLXp0zi7ePSUIU8QofblBzIMoEMEmR7blVbon6vYn4273ehLhSZNA7za9Ey8hf652A0oGb2tj6zurIKJQT81aTz28x2aB5Jy3DP5RuF2zDHrCFl7W8emfdOwVCYxKMQlA4c6OoOnCmyPRv3Mhbmhlruhi_sKoGynMDg_VJQ';

const fetchProjects = () => {
	return fetch('https://backend.northghost.com/portal/projects?access_token=' + access_token)
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
		});
};

export default fetchProjects;


// var apiRequest1 = fetch('api.example1.com/search').then(function(response){
// 	return response.json()
// });
// var apiRequest2 = fetch('api.example2.com/search').then(function(response){
// 	return response.json()
// });
// var combinedData = {"apiRequest1":{},"apiRequest2:{}};
// 	Promise.all([apiRequest1,apiRequest2]).then(function(values){
// 		combinedData["apiRequest1"] = values[0];
// 		combinedData["apiRequest2"] = values[1];
// 		return combinedData;
// 	});