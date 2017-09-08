"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../../static/scss/routes/auth.scss");
class AuthMessage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { isSigned } = this.props;
        return (React.createElement("div", { className: "register_content register_signip" },
            React.createElement("div", { className: "register_logo" },
                React.createElement("img", { className: "register_logo_img", src: require('../../static/media/poweredbyhss_light.svg'), alt: "Partners Portal Logo", width: "auto", height: "32" })),
            React.createElement("div", { className: "register_success" },
                !isSigned && React.createElement("p", null, "Please, sign in to continue."),
                isSigned && React.createElement("p", null, "You are already signed in."),
                React.createElement("div", { className: "register_success_actions" },
                    !isSigned && React.createElement("a", { href: "/auth/signin" }, "Sign in"),
                    isSigned && React.createElement("a", { href: "/projects" }, "Dashboard"),
                    React.createElement("a", { href: "/" }, "Main page")))));
    }
}
exports.AuthMessage = AuthMessage;
//# sourceMappingURL=messages.js.map