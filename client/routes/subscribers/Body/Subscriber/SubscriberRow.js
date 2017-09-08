"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Signal_1 = require("../../../../functions/Signal");
const SubscriberRowOpened_1 = require("./SubscriberRowOpened");
const subscribers_1 = require("../../../../functions/subscribers");
const icons_1 = require("../../../../components/icons");
const button_1 = require("../../../../components/button");
const subscribers_2 = require("../../../../functions/subscribers");
class SubscriberRow extends React.Component {
    constructor(props) {
        super(props);
        this.openSubscriber = props.openSubscriber;
        this.closeSubscriber = props.closeSubscriber;
        this.state = {
            isOpened: false,
            subscriber: props.subscriber
        };
    }
    componentDidMount() {
        Signal_1.default.attach('openSubscriber', (subscriberId) => {
            if (subscriberId === this.state.subscriber.id && this.state.isOpened)
                return;
            if (this.state.subscriber.id === subscriberId && !this.state.isOpened) {
                this.setState({ isOpened: true });
            }
            else if (this.state.isOpened && this.state.subscriber.id !== subscriberId) {
                this.setState({ isOpened: false });
            }
        });
        Signal_1.default.attach('closeSubscriber', (subscriberId) => {
            if (this.state.subscriber.id === subscriberId && this.state.isOpened) {
                this.setState({ isOpened: false });
            }
        });
        Signal_1.default.attach('subscriberModified', (info) => {
            if (info.id != this.state.subscriber.id)
                return;
            this.getSubscriber();
        });
    }
    getSubscriber() {
        subscribers_2.getSubscriber(this.state.subscriber.id).then((response) => {
            if (response.result === 'OK') {
                this.setState({ subscriber: response.subscriber });
            }
        });
    }
    render() {
        let subscriber = this.state.subscriber;
        let free = (subscriber.purchases.length === 0);
        let condition = (subscriber.condition === 0);
        return (React.createElement("div", { className: 'table_row' + (this.state.isOpened ? ' table_row_open' : ''), onClick: () => { this.openSubscriber(); } },
            React.createElement("div", { className: "table_row_wrapper" },
                React.createElement("div", { className: "table_cell", style: { width: '8.15%' } },
                    React.createElement("div", { className: "table_cell_content" }, subscriber.id)),
                React.createElement("div", { className: "table_cell", style: { width: '25%' } },
                    React.createElement("div", { className: "table_cell_content" }, subscriber.name)),
                React.createElement("div", { className: "table_cell", style: { width: '8.55%' } },
                    React.createElement("div", { className: "table_cell_content" },
                        React.createElement("span", { className: "table_label" }, subscriber.bundle.name))),
                React.createElement("div", { className: "table_cell", style: { width: '11.05%' } },
                    React.createElement("div", { className: "table_cell_content" }, subscriber.activated_devices)),
                React.createElement("div", { className: "table_cell", style: { width: '9.9%' } },
                    React.createElement("div", { className: "table_cell_content" }, subscriber.active_sessions)),
                React.createElement("div", { className: "table_cell", style: { width: '8.5%' } },
                    React.createElement("div", { className: "table_cell_content" },
                        React.createElement("span", { className: (condition ? 'table_enable' : 'table_disable') }, (condition ? 'Enabled' : 'Disabled')))),
                React.createElement("div", { className: "table_cell", style: { width: '10.9%' } },
                    React.createElement("div", { className: "table_cell_content" }, subscribers_1.dateString(subscriber.registration_time))),
                React.createElement("div", { className: "table_cell", style: { width: '10.45%' } },
                    React.createElement("div", { className: "table_cell_content" }, subscribers_1.dateString(subscriber.connection_time))),
                !this.state.isOpened &&
                    React.createElement("div", { className: "table_cell", style: { width: '7.5%' } },
                        React.createElement("div", { className: "table_cell_content" },
                            React.createElement("span", { className: (free ? 'table_disable' : 'table_enable') }, (free ? 'Free' : 'Not free'))))),
            this.state.isOpened &&
                React.createElement(button_1.Button, { type: "button", className: "subscriber_close", onClick: () => this.closeSubscriber() },
                    React.createElement(icons_1.IconClose, { width: "24", height: "24" })),
            React.createElement(SubscriberRowOpened_1.default, { isOpened: this.state.isOpened, subscriber: this.state.subscriber })));
    }
}
exports.default = SubscriberRow;
//# sourceMappingURL=SubscriberRow.js.map