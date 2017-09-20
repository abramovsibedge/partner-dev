"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Signal_1 = require("../../../functions/Signal");
const Loading_1 = require("../Loading");
const subscribers_1 = require("../../../functions/subscribers");
;
const SubscriberRow_1 = require("./Subscriber/SubscriberRow");
class SubscribersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            subscribers: []
        };
        new Signal_1.default('openSubscriber');
        new Signal_1.default('closeSubscriber');
        new Signal_1.default('subscriberModified');
        new Signal_1.default('searchSubscriber');
        new Signal_1.default('loadSubscribers');
    }
    componentDidMount() {
        this.getSubscribers();
        Signal_1.default.attach('projectChanged', () => {
            this.getSubscribers();
        });
        Signal_1.default.attach('subscriberAdded', () => {
            this.getSubscribers();
        });
        Signal_1.default.attach('searchSubscriber', (params) => {
            this.searchSubscriber(params);
        });
        Signal_1.default.attach('loadSubscribers', () => {
            this.getSubscribers();
        });
    }
    searchSubscriber(params) {
        this.setState({ loaded: true });
        subscribers_1.searchSubscriber(params).then((subscribers) => {
            this.setState({
                loaded: true,
                subscribers: subscribers.result === 'OK' ? subscribers.subscriber ? [subscribers.subscriber] : subscribers.subscribers : []
            });
        }).catch();
    }
    getSubscribers() {
        this.setState({ loaded: false });
        subscribers_1.getSubscribersList().then((subscribers) => {
            this.setState({
                loaded: true,
                subscribers: subscribers.result === 'OK' ? subscribers.subscribers : []
            });
        });
    }
    openSubscriber(subscriberId) {
        Signal_1.default.dispatch('openSubscriber', subscriberId);
    }
    closeSubscriber(subscriberId) {
        Signal_1.default.dispatch('closeSubscriber', subscriberId);
    }
    render() {
        return (React.createElement("div", { className: "layout_content" },
            !this.state.loaded && React.createElement(Loading_1.default, null),
            this.state.loaded &&
                React.createElement("div", { className: "table main_table" },
                    React.createElement("div", { className: "table_head" },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '8.15%' } }, "ID"),
                                    React.createElement("td", { style: { width: '25%' } }, "Name"),
                                    React.createElement("td", { style: { width: '8.55%' } }, "Licence"),
                                    React.createElement("td", { style: { width: '11.05%' } }, "Activated devices"),
                                    React.createElement("td", { style: { width: '9.9%' } }, "Active sessions"),
                                    React.createElement("td", { style: { width: '8.5%' } }, "Condition"),
                                    React.createElement("td", { style: { width: '10.9%' } }, "Registration time"),
                                    React.createElement("td", { style: { width: '10.45%' } }, "Last connection"),
                                    React.createElement("td", { style: { width: '7.5%' } }, "Purchases"))))),
                    this.tableBody())));
    }
    tableBody() {
        let content = [];
        for (let k in this.state.subscribers) {
            content.push(React.createElement(SubscriberRow_1.default, { key: this.state.subscribers[k].id, subscriber: this.state.subscribers[k], openSubscriber: this.openSubscriber.bind(this, this.state.subscribers[k].id), closeSubscriber: this.closeSubscriber.bind(this, this.state.subscribers[k].id) }));
        }
        return (React.createElement("div", { className: "table_body" },
            content,
            content.length === 0 && React.createElement("div", { className: "table_row table_row_empty" },
                React.createElement("div", { className: "table_cell", style: { width: '100%' } },
                    React.createElement("div", { className: "table_cell_content" }, "No result for your request.")))));
    }
}
exports.default = SubscribersList;
//# sourceMappingURL=SubscribersList.js.map