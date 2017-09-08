"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_modal_1 = require("react-modal");
const update = require("immutability-helper");
const Signal_1 = require("../../../functions/Signal");
const icons_1 = require("../../../components/icons");
const form_1 = require("../../../components/form");
const button_1 = require("../../../components/button");
const subscribers_1 = require("../../../functions/subscribers");
;
class AddSubscriber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            licencesList: [],
            addObject: {
                extref: {
                    value: '',
                    valid: true,
                    check: new RegExp('^\\w+$')
                },
                licence: {
                    value: '',
                    valid: true,
                    check: new RegExp('^[0-9]+$')
                },
                username: {
                    value: '',
                    valid: true,
                    check: new RegExp('^\\w+$')
                },
                oauth_token: {
                    value: '',
                    valid: true,
                    check: new RegExp('^\\w+$')
                },
                message: ''
            }
        };
        Signal_1.default.attach('projectChanged', () => { this.fetchLicence(); });
    }
    componentDidMount() {
        this.fetchLicence();
    }
    fetchLicence() {
        subscribers_1.getLicences().then((result) => {
            if (!result || !result.result || result.result !== 'OK' || !result.licenses) {
                return;
            }
            let licenceList = [];
            for (let k in result.licenses) {
                licenceList.push({
                    value: result.licenses[k].id,
                    label: result.licenses[k].name
                });
            }
            this.setState(update(this.state, {
                licencesList: { $set: licenceList }
            }));
        });
    }
    showAddSubscriber(value) {
        this.setState(update(this.state, {
            showModal: { $set: value },
        }));
    }
    addSubscriberSubmit() {
        let object = this.state.addObject;
        let valid = true;
        for (let k in object) {
            if (!object[k] || typeof (object[k]) !== 'object' || !object[k].check)
                continue;
            if (!object[k].value || !object[k].value.toString().match(object[k].check)) {
                object[k].valid = false;
                valid = false;
            }
            else {
                object[k].valid = true;
            }
        }
        if (!valid) {
            object['message'] = 'Fill in the highlighted fields.';
            return this.setState(update(this.state, {
                addObject: { $set: object }
            }));
        }
        let subscriber = {
            extref: object['extref'].value,
            username: object['username'].value,
            license_id: object['licence'].value,
            oauth_token: object['oauth_token'].value
        };
        subscribers_1.addSubscriber(subscriber).then((response) => {
            if (response.result !== 'OK') {
                // @todo handle error
                return;
            }
            this.setState({
                showModal: false,
                addObject: {
                    extref: {
                        value: '',
                        valid: true,
                        check: new RegExp('^\\w+$')
                    },
                    licence: {
                        value: '',
                        valid: true,
                        check: new RegExp('^[0-9]+$')
                    },
                    username: {
                        value: '',
                        valid: true,
                        check: new RegExp('^\\w+$')
                    },
                    oauth_token: {
                        value: '',
                        valid: true,
                        check: new RegExp('^\\w+$')
                    },
                    message: ''
                }
            });
            this.showAddSubscriber(false);
            Signal_1.default.dispatch('subscriberAdded', true);
        });
    }
    addSubscriberHandler(value, stateItem) {
        let newState = {};
        newState['addObject'] = {
            [stateItem]: {
                'value': {
                    $set: value
                }
            }
        };
        this.setState(update(this.state, newState));
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(button_1.Button, { type: "submit", className: "is-transparent", onClick: () => this.showAddSubscriber(true) },
                React.createElement(icons_1.IconPlus, { width: "24", height: "24" }),
                React.createElement("span", null, "Add subscriber")),
            React.createElement(react_modal_1.default, { isOpen: this.state.showModal, className: { base: 'modal_inner' }, overlayClassName: { base: 'modal_outer' }, contentLabel: "test" },
                React.createElement("div", { className: "modal_header" },
                    React.createElement("h2", null, "Create subscriber")),
                React.createElement(form_1.Form, { submit: () => this.addSubscriberSubmit(), className: "modal_form" },
                    React.createElement("div", { className: "modal_error" }, this.state.addObject['message']),
                    React.createElement("div", { className: "modal_content" },
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Input, { type: "text", label: "Username", value: this.state.addObject['username'].value, notValid: !this.state.addObject['username'].valid, onChange: (e) => this.addSubscriberHandler(e.target.value, 'username') })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Input, { type: "text", label: "OAuth token", value: this.state.addObject['oauth_token'].value, notValid: !this.state.addObject['oauth_token'].valid, onChange: (e) => this.addSubscriberHandler(e.target.value, 'oauth_token') })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Select, { value: this.state.addObject['licence'].value, notValid: !this.state.addObject['licence'].valid, options: this.state.licencesList, onChange: (e) => this.addSubscriberHandler(e.target.value, 'licence') }, "Licence")),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Input, { type: "text", label: "Extref", value: this.state.addObject['extref'].value, notValid: !this.state.addObject['extref'].valid, onChange: (e) => this.addSubscriberHandler(e.target.value, 'extref') }))),
                    React.createElement("div", { className: "modal_footer" },
                        React.createElement("button", { className: "modal_btn modal_btn-reset", type: "button", onClick: () => this.showAddSubscriber(false) }, "Cancel"),
                        React.createElement("button", { className: "modal_btn modal_btn-submit", type: "submit" }, "Create subscriber"))),
                React.createElement(button_1.Button, { type: "button", className: "modal_close", onClick: () => this.showAddSubscriber(false) },
                    React.createElement(icons_1.IconClose, { width: "24", height: "24" })))));
    }
}
exports.default = AddSubscriber;
//# sourceMappingURL=AddSubscriber.js.map