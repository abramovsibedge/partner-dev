"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const utils_1 = require("../utils");
const storage = new utils_1.storageHelper;
exports.logIn = (login, password) => {
    let request = config_1.default.host + 'partner/login?access_token=' + config_1.default.firebaseToken;
    request += '&login=' + login;
    request += '&password=' + password;
    return fetch(request, { method: 'POST' })
        .then(response => response.json())
        .then(responseJson => {
        if (responseJson['result'] === 'OK') {
            try {
                let rest = storage.get('REST') ? JSON.parse(storage.get('REST')) : {};
                rest['token'] = responseJson['access_token'];
                rest['activeProject'] = login;
                storage.add('REST', JSON.stringify(rest));
                return true;
            }
            catch (e) {
                // @todo fallback
                return false;
            }
        }
    });
};
exports.checkLogin = () => {
    try {
        let rest = JSON.parse(storage.get('REST'));
        if (rest['token'])
            return true;
    }
    catch (e) {
        return false;
    }
};
exports.getActiveProject = () => {
    try {
        let rest = JSON.parse(storage.get('REST'));
        if (rest['activeProject'])
            return rest['activeProject'];
    }
    catch (e) {
        return '';
    }
};
exports.getAccessToken = () => {
    try {
        let rest = JSON.parse(storage.get('REST'));
        if (rest['token'])
            return rest['token'];
    }
    catch (e) {
        return '';
    }
};
exports.addSubscriber = (subscriber) => {
    let request = config_1.default.host + 'partner/subscribers?access_token=' + exports.getAccessToken();
    request += '&extref=' + subscriber['extref'];
    request += '&username=' + subscriber['username'];
    request += '&license_id=' + subscriber['license_id'];
    request += '&family_name=' + subscriber['oauth_token'];
    return fetch(request, { method: 'POST' })
        .then(response => response.json())
        .then(responseJson => { return responseJson; });
};
exports.getLicences = () => {
    return fetch(config_1.default.host + 'partner/licenses?access_token=' + exports.getAccessToken())
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.getSubscribersList = () => {
    return fetch(config_1.default.host + 'partner/subscribers?access_token=' + exports.getAccessToken())
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.getSubscriber = (subscriberId) => {
    return fetch(config_1.default.host + 'partner/subscribers/' + subscriberId + '?access_token=' + exports.getAccessToken())
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.deleteSubscriber = (subscriberId) => {
    return fetch(config_1.default.host + 'partner/subscribers/' + subscriberId + '?access_token=' + exports.getAccessToken(), { method: 'POST' })
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.modifySubscriber = (subscriberId, params) => {
    let request = config_1.default.host + 'partner/subscribers/' + subscriberId + '?access_token=' + exports.getAccessToken();
    for (let k in params) {
        request += '&' + k + '=' + params[k];
    }
    return fetch(request, { method: 'PUT' })
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.getTraffic = (subscriberId) => {
    return fetch(config_1.default.host + 'partner/subscribers/' + subscriberId + '/traffic?access_token=' + exports.getAccessToken())
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.deleteTraffic = (subscriberId) => {
    return fetch(config_1.default.host + 'partner/subscribers/' + subscriberId + '/traffic?access_token=' + exports.getAccessToken(), { method: 'DELETE' })
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.modifyTraffic = (subscriberId, params) => {
    let request = config_1.default.host + 'partner/subscribers/' + subscriberId + '/traffic?access_token=' + exports.getAccessToken();
    for (let k in params) {
        request += '&' + k + '=' + params[k];
    }
    return fetch(request, { method: 'POST' })
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.getPurchases = (subscriberId) => {
    return fetch(config_1.default.host + 'partner/subscribers/' + subscriberId + '/purchase?access_token=' + exports.getAccessToken())
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.deletePurchase = (subscriberId, purchase_id) => {
    return fetch(config_1.default.host + 'partner/subscribers/' + subscriberId + '/purchase?access_token=' + exports.getAccessToken() + '&purchase_id=' + purchase_id, { method: 'DELETE' })
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.getDevices = (subscriberId) => {
    return fetch(config_1.default.host + 'partner/subscribers/' + subscriberId + '/devices?access_token=' + exports.getAccessToken())
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.deleteDevice = (subscriberId, device_id) => {
    return fetch(config_1.default.host + 'partner/subscribers/' + subscriberId + '/devices/' + device_id + '?access_token=' + exports.getAccessToken(), { method: 'DELETE' })
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.dateString = (time) => {
    let date = new Date(time);
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return (date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear() + ' ' + date.getHours() + ':' + ((date.getMinutes() > 10) ? date.getMinutes() : ('0' + date.getMinutes().toString())));
};
exports.searchSubscriber = (params) => {
    const filterType = params.type === 'userId' ? '/' : '/' + params.type + '/';
    let request = config_1.default.host + 'partner/subscribers' + filterType + params.value + '?access_token=' + exports.getAccessToken();
    return fetch(request, { method: 'GET' })
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.getSessions = (subscriberId, params) => {
    let request = config_1.default.host + 'partner/subscribers/' + subscriberId + '/sessions?access_token=' + exports.getAccessToken();
    for (let k in params) {
        request += '&' + k + '=' + params[k];
    }
    return fetch(request)
        .then((response) => response.json())
        .then((responseJson) => {
        return responseJson;
    });
};
exports.byteConvert = (bytes) => {
    if ((bytes / (1024 * 1024 * 1024)) > 1)
        return ((bytes / (1024 * 1024 * 1024)).toFixed(2) + ' Gb');
    else if ((bytes / (1024 * 1024)) > 1)
        return ((bytes / (1024 * 1024)).toFixed(2) + ' Mb');
    else if ((bytes / (1024)) > 1)
        return ((bytes / (1024)).toFixed(2) + ' Kb');
    return (bytes.toString() + ' B');
};
//# sourceMappingURL=subscribers.js.map