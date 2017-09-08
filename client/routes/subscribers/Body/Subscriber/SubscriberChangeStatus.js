"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_modal_1 = require("react-modal");
const Signal_1 = require("../../../../functions/Signal");
const icons_1 = require("../../../../components/icons");
const button_1 = require("../../../../components/button");
const subscribers_1 = require("../../../../functions/subscribers");
;
;
class SubscriberChangeStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            subscriber: props.subscriber
        };
    }
    componentWillReceiveProps(props) {
        this.setState({ subscriber: props.subscriber });
    }
    showModal(state) {
        this.setState({ showModal: state });
    }
    changeStatus(status) {
        this.setState({ showModal: false });
        subscribers_1.modifySubscriber(this.state.subscriber.id, { condition: status }).then(response => {
            if (response.result === 'OK') {
                Signal_1.default.dispatch('subscriberModified', { id: this.state.subscriber.id });
            }
        });
    }
    render() {
        let action = (this.state.subscriber.condition === 0) ? ['Disable', 'disable', 1] : ['Enable', 'enable', 0];
        return (React.createElement("div", { className: "subscriber_manage-button" },
            (action[2] === 1) ?
                React.createElement(button_1.Button, { type: "button", className: "subscriber_manage_item subscriber_manage_item-disable", onClick: () => this.showModal(true) },
                    React.createElement(icons_1.IconDelete, { width: "24", height: "24" }),
                    React.createElement("span", null,
                        action[0],
                        " subscriber")) :
                React.createElement(button_1.Button, { type: "button", className: "subscriber_manage_item subscriber_manage_item-enable", onClick: () => this.showModal(true) },
                    React.createElement(icons_1.IconPlay, { width: "24", height: "24" }),
                    React.createElement("span", null,
                        action[0],
                        " subscriber")),
            React.createElement(react_modal_1.default, { isOpen: this.state.showModal, className: { base: 'modal_inner' }, overlayClassName: { base: 'modal_outer' }, contentLabel: "test" },
                React.createElement("div", { className: "modal_header" },
                    React.createElement("h2", null,
                        action[0],
                        " subscriber")),
                React.createElement("div", { className: "modal_content is-text-center" },
                    "Do you really want to ",
                    action[1],
                    " subscriber?"),
                React.createElement("div", { className: "modal_footer" },
                    React.createElement("button", { className: "modal_btn modal_btn-reset", type: "button", onClick: () => this.showModal(false) }, "Cancel"),
                    React.createElement("button", { className: "modal_btn modal_btn-submit", type: "button", onClick: () => this.changeStatus(Number(action[2])) },
                        action[0],
                        " subscriber")),
                React.createElement(button_1.Button, { type: "button", className: "modal_close", onClick: () => this.showModal(false) },
                    React.createElement(icons_1.IconClose, { width: "24", height: "24" })))));
    }
}
exports.default = SubscriberChangeStatus;
//# sourceMappingURL=SubscriberChangeStatus.js.map