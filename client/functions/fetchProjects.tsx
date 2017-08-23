import config from '../config';

const access_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MmRmZDk4MDgwNzY3NzM2MGQ5YmU1MWNjYjY0OGIwMzVjZTNjMDgifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd2ViLXBvcnRhbC1mb3ItcGFydG5lcnMiLCJhdWQiOiJ3ZWItcG9ydGFsLWZvci1wYXJ0bmVycyIsImF1dGhfdGltZSI6MTUwMzUwMjQ3OCwidXNlcl9pZCI6IjhmOHJFZ0tSM3ZSNzVaSWtlNUJ3aXBReUNIeTEiLCJzdWIiOiI4ZjhyRWdLUjN2Ujc1WklrZTVCd2lwUXlDSHkxIiwiaWF0IjoxNTAzNTAyNDc4LCJleHAiOjE1MDM1MDYwNzgsImVtYWlsIjoiMHh5OWVuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjB4eTllbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.c4xGhTJdKX_AFnFi9vgMRg88ll_5BQDWgtdfo1j6f4wzWzlSt4AEDryY_9JWq6qe5Ydm6H_cfW0HHIOgU3MDHSwZUBJ-xZCc8ZkPTzM8NTF8nRburQGFcGT5AhHPTZQb76QZuAXrs2gWJLfRJXMwFfRSvYdTEvm8Qh6P89sZsUkSYoQjghiGx06Cg0tEF662tz8E85RMlKOyr3XxUV4hAl65LZ3CM_WwwKjq72b6nu5pwqjmMx1U7UAm31NDN5hINoq_ZN-ClRLjzq2r7pFDwosSrg4b340wgg_RQ2dEAtyc05Ph1mjDaoU3GxEmSEFq7gu83nmj5eG1JcX1wdZt-A';

const fetchProjects = () => {
	return fetch(config.host + '/portal/projects?access_token=' + access_token)
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