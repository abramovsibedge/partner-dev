"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const config_1 = require("../config");
exports.loadProjects = () => {
    const request = config_1.default.host + 'portal/projects?access_token=' + config_1.default.firebaseToken;
    return axios_1.default(request)
        .then(response => response.data)
        .catch(error => error);
};
exports.loadProjectItem = (id) => {
    const countriesRequest = config_1.default.host + 'portal/project/countries?access_token=' + config_1.default.firebaseToken + '&publickey=' + id;
    const countries = axios_1.default(countriesRequest, { method: 'POST' }).then(response => response.data);
    const emailsRequest = config_1.default.host + 'portal/project/access?access_token=' + config_1.default.firebaseToken + '&publickey=' + id;
    const emails = axios_1.default(emailsRequest).then(response => response.data);
    const combinedData = { "countries": {}, "emails": {} };
    return Promise.all([countries, emails]).then(result => {
        combinedData["countries"] = result[0];
        combinedData["emails"] = result[1];
        return combinedData;
    });
};
exports.addProject = (data) => {
    let request = config_1.default.host + 'portal/project?access_token=' + config_1.default.firebaseToken;
    request += '&publickey=' + data['public_key'];
    request += '&privatekey=' + data['private_key'];
    request += '&description=' + data['description'];
    request += '&project_type=' + data['project_type'];
    return axios_1.default(request, { method: 'POST' }).then(response => response.data);
};
exports.deleteProject = (item) => {
    let request = config_1.default.host + 'portal/project?access_token=' + config_1.default.firebaseToken;
    request += '&publickey=' + item['publickey'];
    request += '&privatekey=' + item['privatekey'];
    return axios_1.default(request, { method: 'DELETE' }).then(response => response.data);
};
exports.addUser = (project, email) => {
    let request = config_1.default.host + 'portal/project/access?access_token=' + config_1.default.firebaseToken;
    request += '&publickey=' + project;
    request += '&email=' + email;
    return axios_1.default(request, { method: 'POST' }).then(response => response.data);
};
exports.deleteUser = (project, email) => {
    let request = config_1.default.host + 'portal/project/access?access_token=' + config_1.default.firebaseToken;
    request += '&publickey=' + project;
    request += '&email=' + email;
    return axios_1.default(request, { method: 'DELETE' }).then(response => response.data);
};
exports.setVisibility = (project, country, visibility) => {
    let request = config_1.default.host + 'portal/project/country?access_token=' + config_1.default.firebaseToken;
    request += '&publickey=' + project;
    request += '&country=' + country;
    request += '&visibility=' + visibility;
    return axios_1.default(request, { method: 'PUT' }).then(response => response.data);
};
//# sourceMappingURL=projects.js.map