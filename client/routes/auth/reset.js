"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const update = require("immutability-helper");
const form_1 = require("../../components/form");
const button_1 = require("../../components/button");
const icons_1 = require("../../components/icons");
const utils_1 = require("../../utils");
const firebase = require("firebase");
class Reset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            email: "",
            validationState: true,
            formMessage: '',
            success: false
        };
    }
    submitHandler() {
        const $t = this;
        const $state = $t.state;
        const $email = $state.email;
        let state = true;
        let message = '';
        $t.setState(update($state, {
            inProgress: { $set: true }
        }), () => {
            if (!$email || !utils_1.emailValidation($email)) {
                state = false;
                message += 'Email not valid.';
            }
            $t.setState(update($state, {
                formMessage: { $set: message },
                validationState: { $set: state },
                inProgress: { $set: false }
            }));
            if (!state && message)
                return false;
            firebase.auth().sendPasswordResetEmail($email).then(() => {
                $t.setState(update($state, {
                    success: { $set: true },
                    inProgress: { $set: false }
                }));
            }).catch(function (error) {
                $t.setState(update($state, {
                    formMessage: { $set: error.message },
                    inProgress: { $set: false }
                }));
                return false;
            });
        });
    }
    changeHandler(value, stateItem) {
        let newState = {};
        newState[stateItem] = { $set: value };
        this.setState(update(this.state, newState));
    }
    render() {
        const { inProgress, email, validationState, formMessage, success } = this.state;
        return (React.createElement("div", { className: "register_content register_signip" },
            React.createElement("div", { className: "register_logo" },
                React.createElement("img", { className: "register_logo_img", src: require('../../static/media/poweredbyhss_light.svg'), alt: "Partners Portal Logo", width: "auto", height: "32" })),
            success && React.createElement("div", { className: "register_success" },
                React.createElement("p", null, "Reset link sended to your email."),
                React.createElement("div", { className: "register_success_actions" },
                    React.createElement("a", { href: "/auth/signin" }, "Sign in"),
                    React.createElement("a", { href: "/" }, "Main page"))),
            !success && React.createElement(form_1.Form, { submit: () => this.submitHandler() },
                React.createElement("div", { className: "register_error-message" }, formMessage),
                React.createElement("div", { className: "register_header" },
                    React.createElement("a", { className: "register_header_link", href: "/auth/signup" }, "I don`t have an account")),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Input, { type: "email", label: "Email", value: email, notValid: !validationState && (!email || !utils_1.emailValidation(email)), onChange: (e) => this.changeHandler(e.target.value, 'email') },
                        React.createElement(icons_1.IconPerson, { width: "24", height: "24" }))),
                React.createElement("div", { className: "form_row register_actions" },
                    React.createElement(button_1.Button, { loading: inProgress, type: "submit", className: "register_submit" }, "Reset password")))));
    }
}
exports.Reset = Reset;
//# sourceMappingURL=reset.js.map