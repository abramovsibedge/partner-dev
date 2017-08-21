"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../../static/scss/routes/auth.scss");
class Auth extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "register" }, this.props.children));
    }
}
exports.Auth = Auth;
//# sourceMappingURL=index.js.map