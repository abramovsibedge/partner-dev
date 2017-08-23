const access_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MmRmZDk4MDgwNzY3NzM2MGQ5YmU1MWNjYjY0OGIwMzVjZTNjMDgifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd2ViLXBvcnRhbC1mb3ItcGFydG5lcnMiLCJhdWQiOiJ3ZWItcG9ydGFsLWZvci1wYXJ0bmVycyIsImF1dGhfdGltZSI6MTUwMzQ2Nzk1NywidXNlcl9pZCI6IjhmOHJFZ0tSM3ZSNzVaSWtlNUJ3aXBReUNIeTEiLCJzdWIiOiI4ZjhyRWdLUjN2Ujc1WklrZTVCd2lwUXlDSHkxIiwiaWF0IjoxNTAzNDg5MDU3LCJleHAiOjE1MDM0OTI2NTcsImVtYWlsIjoiMHh5OWVuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjB4eTllbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.RW1Uk_LyCVO02PMweiEsc5St_0QGrshvpbgQLccAmKHXFraho326ozKUDQesErRQM8N9rgHlmebsYGe5Kfj-7SXAvDg945-ceyjIdHxlGLQSNDFQt17Wv0oCRA_y3F5QgwkI4MEkN8Y0L91KKiygGLYMSkH0-qLISOL1WVZ0OuqqV1JJRCaEDb4iZIDCJEIHij32W9lY0_8dZGwDnyW1KSs4oAgKbaR_SgOE20d5zO3yG9YeE2H84zVGBoOWrNG4z4vqRWrlJEvW_wlltPpZ2JN-1KJ5N6icK9yV-cwICefeX8qt_5cgYk50nKXxnK4Z69ovEP8OtjbR8HmYGbMcbQ';

const fetchProjects = () => {
	return fetch('http://vpn-backend.northghost.com/portal/projects?access_token=' + access_token)
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