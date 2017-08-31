"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const update = require("immutability-helper");
const form_1 = require("../../components/form");
const button_1 = require("../../components/button");
const icons_1 = require("../../components/icons");
const auth_1 = require("../../functions/auth");
class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            valid: true,
            message: ''
        };
    }
    submitHandler() {
        const $t = this;
        const $state = $t.state;
        let state = true;
        let message = '';
        if (!$state.login || !$state.password) {
            state = false;
            message += 'Fill in the highlighted fields.';
        }
        $t.setState(update($state, {
            message: { $set: message },
            valid: { $set: state }
        }));
        if (!state && message)
            return false;
        auth_1.signIn($state.login, $state.password)
            .then((response) => {
            if (response && response.type === 'error') {
                throw { message: response.error };
            }
            else {
                window.location.replace("/projects");
            }
        })
            .catch((error) => {
            $t.setState(update($state, {
                message: { $set: error.message }
            }));
        });
    }
    changeHandler(value, stateItem) {
        let newState = {};
        newState[stateItem] = { $set: value };
        this.setState(update(this.state, newState));
    }
    render() {
        const { login, password, valid, message } = this.state;
        return (React.createElement("div", { className: "register_content register_signip" },
            React.createElement("div", { className: "register_logo" },
                React.createElement("img", { className: "register_logo_img", src: require('../../static/media/poweredbyhss_light.svg'), alt: "Partners Portal Logo", width: "auto", height: "32" })),
            React.createElement(form_1.Form, { submit: () => this.submitHandler() },
                React.createElement("div", { className: "register_error-message" }, message),
                React.createElement("div", { className: "register_header" },
                    React.createElement("a", { className: "register_header_link", href: "/auth/signup" }, "I don`t have an account")),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Input, { type: "email", label: "Email", value: login, notValid: !valid && !login, onChange: (e) => this.changeHandler(e.target.value, 'login') },
                        React.createElement(icons_1.IconPerson, { width: "24", height: "24" }))),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Input, { type: "password", label: "Password", value: password, notValid: !valid && !password, onChange: (e) => this.changeHandler(e.target.value, 'password') },
                        React.createElement(icons_1.IconLock, { width: "24", height: "24" }))),
                React.createElement("div", { className: "register_footer" },
                    React.createElement("a", { className: "register_footer_reset", href: "/auth/reset" }, "Forgot password")),
                React.createElement("div", { className: "form_row register_actions" },
                    React.createElement(button_1.Button, { type: "submit", className: "register_submit" }, "Sign Up")))));
    }
}
exports.Signin = Signin;
//# sourceMappingURL=signin.js.map