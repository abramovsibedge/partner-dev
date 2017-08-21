"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const update = require("immutability-helper");
const form_1 = require("../../components/form");
const button_1 = require("../../components/button");
const icons_1 = require("../../components/icons");
const utils_1 = require("../../utils");
const firebase = require("firebase");
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            firstName: "",
            lastName: "",
            companyName: "",
            email: "",
            password: "",
            passwordAgain: "",
            products: [{
                    value: "explore",
                    label: "I am just exploring"
                }, {
                    value: "proxy",
                    label: "Proxy - protection for your app only"
                }, {
                    value: "vpn",
                    label: "VPN - protection for the whole OS"
                }, {
                    value: "other",
                    label: "Other"
                }],
            productsSelected: "",
            numberOfUsers: [{
                    value: "v1",
                    label: "Less than a 100,000"
                }, {
                    value: "v2",
                    label: "More than a 100,000"
                }, {
                    value: "v3",
                    label: "More than 500,000"
                }, {
                    value: "v4",
                    label: "More than a 1,000,000"
                }, {
                    value: "v5",
                    label: "Not a Production App"
                }],
            numberOfUsersSelected: "",
            tos: false,
            validationState: true,
            formMessage: '',
            success: false
        };
    }
    submitHandler() {
        const $t = this;
        const $state = $t.state;
        let state = true;
        let message = '';
        $t.setState(update($state, {
            inProgress: { $set: true }
        }), () => {
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
                formMessage: { $set: message },
                validationState: { $set: state },
                inProgress: { $set: false }
            }));
            if (!state && message)
                return false;
            firebase.auth().createUserWithEmailAndPassword($state.email, $state.password)
                .then(function () {
                firebase.auth().onAuthStateChanged(() => {
                    firebase.auth().currentUser.sendEmailVerification().then(() => { }, (error) => {
                        console.log(error);
                    });
                    firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                        first_name: $state.firstName,
                        last_name: $state.lastName,
                        company: $state.companyName,
                        email: $state.email,
                        plan: $state.productsSelected,
                        users: $state.numberOfUsersSelected,
                        tos: Math.floor((new Date()).getTime() / 1000),
                        first: true
                    });
                    $t.setState(update($state, {
                        formMessage: { $set: '' },
                        inProgress: { $set: false },
                        success: { $set: true }
                    }));
                });
            })
                .catch(function (error) {
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
        const { inProgress, firstName, lastName, companyName, email, password, passwordAgain, products, productsSelected, numberOfUsers, numberOfUsersSelected, tos, validationState, formMessage, success } = this.state;
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
                React.createElement("div", { className: "register_error-message" }, formMessage),
                React.createElement("div", { className: "register_header" },
                    React.createElement("h1", { className: "register_header_name" }, "Sign Up"),
                    React.createElement("a", { className: "register_header_link", href: "/auth/signin" }, "I have an account")),
                React.createElement(form_1.FormGroup, null,
                    React.createElement(form_1.Input, { type: "text", label: "First name", value: firstName, notValid: !validationState && !firstName, onChange: (e) => this.changeHandler(e.target.value, 'firstName') },
                        React.createElement(icons_1.IconPerson, { width: "24", height: "24" })),
                    React.createElement(form_1.Input, { type: "text", label: "Last name", value: lastName, notValid: !validationState && !lastName, onChange: (e) => this.changeHandler(e.target.value, 'lastName') },
                        React.createElement(icons_1.IconPerson, { width: "24", height: "24" }))),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Input, { type: "text", label: "Company name", value: companyName, onChange: (e) => this.changeHandler(e.target.value, 'companyName') },
                        React.createElement(icons_1.IconPerson, { width: "24", height: "24" }))),
                React.createElement("br", null),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Input, { type: "email", label: "Email", value: email, notValid: !validationState && (!email || !utils_1.emailValidation(email)), onChange: (e) => this.changeHandler(e.target.value, 'email') },
                        React.createElement(icons_1.IconPerson, { width: "24", height: "24" }))),
                React.createElement(form_1.FormGroup, null,
                    React.createElement(form_1.Input, { type: "password", label: "Choose password", value: password, notValid: !validationState && !password || password !== passwordAgain, onChange: (e) => this.changeHandler(e.target.value, 'password') },
                        React.createElement(icons_1.IconLock, { width: "24", height: "24" })),
                    React.createElement(form_1.Input, { type: "password", label: "Repeat password", value: passwordAgain, notValid: !validationState && !passwordAgain || password !== passwordAgain, onChange: (e) => this.changeHandler(e.target.value, 'passwordAgain') },
                        React.createElement(icons_1.IconLock, { width: "24", height: "24" }))),
                React.createElement("br", null),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Select, { notValid: !validationState && !productsSelected, value: productsSelected, options: products, onChange: (e) => this.changeHandler(e.target.value, 'productsSelected') }, "Which product do you want to use first")),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Select, { notValid: !validationState && !numberOfUsersSelected, value: numberOfUsersSelected, options: numberOfUsers, onChange: (e) => this.changeHandler(e.target.value, 'numberOfUsersSelected') }, "Number of daily users of your app")),
                React.createElement("br", null),
                React.createElement(form_1.FormRow, null,
                    React.createElement(form_1.Checkbox, { notValid: !validationState && !tos, checked: tos, onChange: (e) => this.changeHandler(e.target.checked, 'tos') },
                        "I agree with ",
                        React.createElement("a", { target: "_blank", href: "/docs/AnchorFree_Self_Service_Developer_Platform_Terms_of_Service.pdf" }, "TOS"))),
                React.createElement("div", { className: "form_row register_actions" },
                    React.createElement(button_1.Button, { loading: inProgress, type: "submit", className: "register_submit" }, "Sign In")))));
    }
}
exports.Signup = Signup;
//# sourceMappingURL=signup.js.map