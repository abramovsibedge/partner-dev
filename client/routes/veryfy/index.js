"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const firebase = require("firebase");
const update = require("immutability-helper");
require("../../static/scss/routes/pages.scss");
class Veryfy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }
    componentDidMount() {
        // TODO in function
        var getParameterByName = function (name, url) {
            if (!url)
                url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
            if (!results)
                return null;
            if (!results[2])
                return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        };
        var mode = getParameterByName('mode'), actionCode = getParameterByName('oobCode'), apiKey = getParameterByName('apiKey');
        var auth = firebase.auth();
        switch (mode) {
            case 'verifyEmail':
                this.handleVerifyEmail(auth, actionCode);
                break;
            default:
        }
    }
    handleVerifyEmail(auth, actionCode) {
        let thisC = this;
        auth.applyActionCode(actionCode).then(function (resp) {
            this.setState(update(this.state, {
                content: { $set: 'veryfy_success' },
            }));
        }).catch(function (error) {
            thisC.setState(update(thisC.state, {
                content: { $set: 'veryfy_error' }
            }));
        });
    }
    ;
    render() {
        const { content } = this.state;
        let contentBlock = (React.createElement("div", null));
        if (content == 'veryfy_error') {
            contentBlock = (React.createElement("section", { className: "ui-container" },
                React.createElement("div", { className: "ui-container-card-header" },
                    React.createElement("h1", { className: "ui-container-title" }, "Trying to verify email")),
                React.createElement("div", { className: "ui-container-card-content" },
                    React.createElement("p", { className: "ui-container-text" }, "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.")),
                React.createElement("div", { className: "ui-container-card-footer" })));
        }
        if (content == 'veryfy_success') {
            contentBlock = (React.createElement("section", { className: 'ui-container' },
                React.createElement("div", { className: "ui-container-card-header" },
                    React.createElement("h1", { className: "ui-container-title" }, "Your email has been verified")),
                React.createElement("div", { className: 'ui-container-card-content' },
                    React.createElement("p", { className: 'ui-container-text' }, "You can now sign in with your new account")),
                React.createElement("div", { className: 'ui-container-card-footer' },
                    React.createElement("div", { className: 'ui-container-form-actions' },
                        React.createElement("a", { href: "https://developer.anchorfree.com/#/login" }, "Sign In")))));
        }
        return (React.createElement("div", { id: "templates" }, contentBlock));
    }
}
exports.Veryfy = Veryfy;
//# sourceMappingURL=index.js.map