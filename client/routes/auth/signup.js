"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const update = require("immutability-helper");
const form_1 = require("../../components/form");
const button_1 = require("../../components/button");
const icons_1 = require("../../components/icons");
const utils_1 = require("../../utils");
const auth_1 = require("../../functions/auth");
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            companyName: '',
            email: '',
            password: '',
            passwordAgain: '',
            products: [{
                    value: 'explore',
                    label: 'I am just exploring'
                }, {
                    value: 'proxy',
                    label: 'Proxy - protection for your app only'
                }, {
                    value: 'vpn',
                    label: 'VPN - protection for the whole OS'
                }, {
                    value: 'other',
                    label: 'Other'
                }],
            productsSelected: '',
            numberOfUsers: [{
                    value: 'v1',
                    label: 'Less than a 100,000'
                }, {
                    value: 'v2',
                    label: 'More than a 100,000'
                }, {
                    value: 'v3',
                    label: 'More than 500,000'
                }, {
                    value: 'v4',
                    label: 'More than a 1,000,000'
                }, {
                    value: 'v5',
                    label: 'Not a Production App'
                }],
            numberOfUsersSelected: '',
            tos: false,
            valid: true,
            message: '',
            success: false
        };
    }
    submitHandler() {
        const $t = this;
        const $state = $t.state;
        let state = true;
        let message = '';
        if (!$state.firstName
            || !$state.lastName
            || !$state.password
            || !$state.passwordAgain
            || !$state.productsSelected
            || !$state.numberOfUsersSelected
            || !$state.tos) {
            state = false;
            message += 'Fill in the highlighted fields.';
        }
        if (!utils_1.emailValidation($state.email)) {
            state = false;
            message += 'Email not valid.';
        }
        if ($state.password !== $state.passwordAgain) {
            state = false;
            message += 'Passwords are not equals.';
        }
        $t.setState(update($state, {
            message: { $set: message },
            valid: { $set: state }
        }));
        if (!state && message)
            return false;
        auth_1.signUp($state)
            .then((response) => {
            if (response && response.type === 'error') {
                throw { message: response.error.message };
            }
            else {
                $t.setState(update($state, {
                    success: { $set: true }
                }));
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
        const { firstName, lastName, companyName, email, password, passwordAgain, products, productsSelected, numberOfUsers, numberOfUsersSelected, tos, valid, message, success } = this.state;
        return (React.createElement("div", { className: "register_content register_signup" },
            React.createElement("div", { className: "register_logo" },
                React.createElement("img", { className: "register_logo_img", src: require('../../static/media/poweredbyhss_light.svg'), alt: "Partners Portal Logo", width: "auto", height: "32" })),
            success && React.createElement("div", { className: "register_success" },
                React.createElement("p", null,
                    "A confirmation letter was sent to the specified mailbox.",
                    React.createElement("br", null),
                    "Please confirm your account in order to start using the application"),
                React.createElement("div", { className: "register_success_actions" },
                    React.createElement("a", { href: "/auth/signin" }, "Sign in"),
                    React.createElement("a", { href: "/" }, "Main page"))),
            !success && React.createElement(form_1.Form, { submit: () => this.submitHandler() },
                React.createElement("div", { className: "register_error-message" }, message),
                React.createElement("div", { className: "register_header" },
                    React.createElement("h1", { className: "register_header_name" }, "Sign Up"),
                    React.createElement("a", { className: "register_header_link", href: "/auth/signin" }, "I have an account")),
                React.createElement(form_1.FormGroup, null,
                    React.createElement(form_1.Input, { type: "text", label: "First name", value: firstName, notValid: !valid && !firstName, onChange: (e) => this.changeHandler(e.target.value, 'firstName') },
                        React.createElement(icons_1.IconPerson, { width: "24", height: "24" })),
                    React.createElement(form_1.Input, { type: "text", label: "Last name", value: lastName, notValid: !valid && !lastName, onChange: (e) => this.changeHandler(e.target.value, 'lastName') },
                        React.createElement(icons_1.IconPerson, { width: "24", height: "24" }))),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Input, { type: "text", label: "Company name", value: companyName, onChange: (e) => this.changeHandler(e.target.value, 'companyName') },
                        React.createElement(icons_1.IconPerson, { width: "24", height: "24" }))),
                React.createElement("br", null),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Input, { type: "email", label: "Email", value: email, notValid: !valid && (!email || !utils_1.emailValidation(email)), onChange: (e) => this.changeHandler(e.target.value, 'email') },
                        React.createElement(icons_1.IconPerson, { width: "24", height: "24" }))),
                React.createElement(form_1.FormGroup, null,
                    React.createElement(form_1.Input, { type: "password", label: "Choose password", value: password, notValid: !valid && !password || password !== passwordAgain, onChange: (e) => this.changeHandler(e.target.value, 'password') },
                        React.createElement(icons_1.IconLock, { width: "24", height: "24" })),
                    React.createElement(form_1.Input, { type: "password", label: "Repeat password", value: passwordAgain, notValid: !valid && !passwordAgain || password !== passwordAgain, onChange: (e) => this.changeHandler(e.target.value, 'passwordAgain') },
                        React.createElement(icons_1.IconLock, { width: "24", height: "24" }))),
                React.createElement("br", null),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Select, { notValid: !valid && !productsSelected, value: productsSelected, options: products, onChange: (e) => this.changeHandler(e.target.value, 'productsSelected') }, "Which product do you want to use first")),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Select, { notValid: !valid && !numberOfUsersSelected, value: numberOfUsersSelected, options: numberOfUsers, onChange: (e) => this.changeHandler(e.target.value, 'numberOfUsersSelected') }, "Number of daily users of your app")),
                React.createElement("br", null),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Checkbox, { notValid: !valid && !tos, checked: tos, onChange: (e) => this.changeHandler(e.target.checked, 'tos') },
                        "I agree with ",
                        React.createElement("a", { target: "_blank", href: "/docs/AnchorFree_Self_Service_Developer_Platform_Terms_of_Service.pdf" }, "TOS"))),
                React.createElement("div", { className: "form_row register_actions" },
                    React.createElement(button_1.Button, { type: "submit", className: "register_submit" }, "Sign In")))));
    }
}
exports.Signup = Signup;
//# sourceMappingURL=signup.js.map