"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_modal_1 = require("react-modal");
const Signal_1 = require("../../../../functions/Signal");
const icons_1 = require("../../../../components/icons");
const button_1 = require("../../../../components/button");
const form_1 = require("../../../../components/form");
const subscribers_1 = require("../../../../functions/subscribers");
;
class SubscriberModify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriber: props.subscriber,
            showModal: false,
            licencesList: [],
            modalObject: {
                extref: {
                    value: props.subscriber.extref,
                    valid: true,
                    check: new RegExp('^\\w+$')
                },
                licence: {
                    value: props.subscriber.bundle.id,
                    valid: true,
                    check: new RegExp('^[0-9]+$')
                },
                name: {
                    value: props.subscriber.name,
                    valid: true,
                    check: new RegExp('^\\w+$')
                },
                message: ''
            }
        };
    }
    componentDidMount() {
        this.fetchLicence();
    }
    componentWillReceiveProps(props) {
        this.setState({
            subscriber: props.subscriber,
            modalObject: {
                extref: {
                    value: props.subscriber.extref,
                    valid: true,
                    check: new RegExp('^\\w+$')
                },
                licence: {
                    value: props.subscriber.bundle.id,
                    valid: true,
                    check: new RegExp('^[0-9]+$')
                },
                name: {
                    value: props.subscriber.name,
                    valid: true,
                    check: new RegExp('^\\w+$')
                },
                message: ''
            }
        });
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
            this.setState({ licencesList: licenceList });
        });
    }
    showModal(state) {
        this.setState({ showModal: state });
    }
    submitForm() {
        let object = this.state.modalObject;
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
            return this.setState({ modalObject: object });
        }
        let subscriber = {
            extref: object['extref'].value,
            name: object['name'].value,
            license_id: object['licence'].value,
        };
        subscribers_1.modifySubscriber(this.state.subscriber.id, subscriber).then((response) => {
            if (response.result !== 'OK') {
                // @todo handle error
                return;
            }
            this.setState({
                showModal: false,
                modalObject: {
                    extref: {
                        value: subscriber.extref,
                        valid: true,
                        check: new RegExp('^\\w+$')
                    },
                    licence: {
                        value: subscriber['licence_id'],
                        valid: true,
                        check: new RegExp('^[0-9]+$')
                    },
                    name: {
                        value: subscriber.name,
                        valid: true,
                        check: new RegExp('^\\w+$')
                    },
                    message: ''
                }
            });
            this.showModal(false);
            Signal_1.default.dispatch('subscriberModified', { id: this.state.subscriber.id });
        });
    }
    inputHandler(value, stateItem) {
        let newState = this.state.modalObject;
        newState[stateItem].value = value;
        this.setState({ modalObject: newState });
    }
    render() {
        return (React.createElement("div", { className: "subscriber_manage-button" },
            React.createElement(button_1.Button, { type: "button", className: "subscriber_manage_item subscriber_manage_item-enable", onClick: () => this.showModal(true) },
                React.createElement(icons_1.IconLock, { width: "24", height: "24" }),
                React.createElement("span", null, "Modify subscriber")),
            React.createElement(react_modal_1.default, { isOpen: this.state.showModal, className: { base: 'modal_inner' }, overlayClassName: { base: 'modal_outer' }, contentLabel: "test" },
                React.createElement("div", { className: "modal_header" },
                    React.createElement("h2", null, "Modify subscriber")),
                React.createElement(form_1.Form, { submit: () => this.submitForm(), className: "modal_form" },
                    React.createElement("div", { className: "modal_error" }, this.state.modalObject['message']),
                    React.createElement("div", { className: "modal_content" },
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Input, { type: "text", label: "Username", value: this.state.modalObject['name'].value, notValid: !this.state.modalObject['name'].valid, onChange: (e) => this.inputHandler(e.target.value, 'name') })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Select, { value: this.state.modalObject['licence'].value, notValid: !this.state.modalObject['licence'].valid, options: this.state.licencesList, onChange: (e) => this.inputHandler(e.target.value, 'licence') }, "Licence")),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Input, { type: "text", label: "Extref", value: this.state.modalObject['extref'].value, notValid: !this.state.modalObject['extref'].valid, onChange: (e) => this.inputHandler(e.target.value, 'extref') }))),
                    React.createElement("div", { className: "modal_footer" },
                        React.createElement("button", { className: "modal_btn modal_btn-reset", type: "button", onClick: () => this.showModal(false) }, "Cancel"),
                        React.createElement("button", { className: "modal_btn modal_btn-submit", type: "submit" }, "Modify subscriber"))))));
    }
}
exports.default = SubscriberModify;
//# sourceMappingURL=SubscriberModify.js.map