"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const messages_1 = require("./messages");
require("../../static/scss/routes/auth.scss");
const auth_1 = require("../../functions/auth");
class Auth extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "register" }, auth_1.check() ? React.createElement(messages_1.AuthMessage, { isSigned: auth_1.check() }) : this.props.children));
    }
}
exports.Auth = Auth;
//# sourceMappingURL=index.js.map