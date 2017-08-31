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
class SubscriberSetLimit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriber: props.subscriber,
            showModal: false,
            modalObject: {
                limit: {
                    value: '',
                    valid: true,
                    check: new RegExp('^[0-9]+$'),
                    canBeEmpty: true
                },
                reset: true,
                unlimited: false,
                message: ''
            }
        };
    }
    showModal(state) {
        this.setState({ showModal: state });
    }
    submitForm() {
        let object = this.state.modalObject;
        let valid = true;
        for (let k in object) {
            if (!object[k]
                || typeof (object[k]) !== 'object'
                || !object[k].check
                || (object[k].value === '' && object[k].canBeEmpty))
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
        if (this.state.modalObject['unlimited']) {
            return subscribers_1.deleteTraffic(this.state.subscriber.id).then((response) => {
                if (response.result !== 'OK') {
                    // @todo handle error
                    return;
                }
                this.showModal(false);
                Signal_1.default.dispatch('subscriberModified', { id: this.state.subscriber.id });
            });
        }
        this.showModal(false);
        subscribers_1.modifyTraffic(this.state.subscriber.id, { traffic_limit: this.state.modalObject['limit'].value, reset: (this.state.modalObject['reset'] ? true : false) }).then((response) => {
            if (response.result !== 'OK') {
                // @todo handle error
                return;
            }
            this.setState({
                modalObject: {
                    limit: {
                        value: '',
                        valid: true
                    },
                    message: ''
                }
            });
            Signal_1.default.dispatch('subscriberModified', { id: this.state.subscriber.id });
        });
    }
    inputHandler(value, stateItem) {
        let newState = this.state.modalObject;
        newState[stateItem].value = value;
        this.setState({ modalObject: newState });
    }
    setVisibility(key) {
        let newState = this.state.modalObject;
        newState[key] = !newState[key];
        this.setState({
            modalObject: newState
        });
    }
    render() {
        return (React.createElement("div", { className: "subscriber_manage-button" },
            React.createElement(button_1.Button, { type: "button", className: "subscriber_manage_item subscriber_manage_item-enable", onClick: () => this.showModal(true) },
                React.createElement(icons_1.IconPen, { width: "24", height: "24" }),
                React.createElement("span", null, "Set limit")),
            React.createElement(react_modal_1.default, { isOpen: this.state.showModal, className: { base: 'modal_inner' }, overlayClassName: { base: 'modal_outer' }, contentLabel: "test" },
                React.createElement("div", { className: "modal_header" },
                    React.createElement("h2", null, "Set limit")),
                React.createElement(form_1.Form, { submit: () => this.submitForm(), className: "modal_form" },
                    React.createElement("div", { className: "modal_error" }, this.state.modalObject['message']),
                    React.createElement("div", { className: "modal_content" },
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Input, { type: "text", label: "Limit", value: this.state.modalObject['limit'].value, notValid: !this.state.modalObject['limit'].valid, onChange: (e) => this.inputHandler(e.target.value, 'limit') })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Checkbox2, { className: "subscriber_edit_checkbox", checked: this.state.modalObject['reset'], label: "Trafic reset", onChange: () => this.setVisibility('reset') }, "\u00A0")),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Checkbox2, { className: "subscriber_edit_checkbox", checked: this.state.modalObject['unlimited'], label: "Set traffic unlimited", onChange: (a) => this.setVisibility('unlimited') }, "\u00A0"))),
                    React.createElement("div", { className: "modal_footer" },
                        React.createElement("button", { className: "modal_btn modal_btn-reset", type: "button", onClick: () => this.showModal(false) }, "Cancel"),
                        React.createElement("button", { className: "modal_btn modal_btn-submit", type: "submit" }, "Set limit"))))));
    }
}
exports.default = SubscriberSetLimit;
//# sourceMappingURL=SubscriberSetLimit.js.map