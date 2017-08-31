"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const spinner_1 = require("../../../../components/spinner");
const subscribers_1 = require("../../../../functions/subscribers");
const SubscriberModify_1 = require("./SubscriberModify");
const SubscriberSocial_1 = require("./SubscriberSocial");
const SubscriberDevices_1 = require("./SubscriberDevices");
const SubscriberSetLimit_1 = require("./SubscriberSetLimit");
const SubscriberSessions_1 = require("./SubscriberSessions");
const SubscriberPurchases_1 = require("./SubscriberPurchases");
const SubscriberChangeStatus_1 = require("./SubscriberChangeStatus");
;
class SubscriberRowOpened extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'sessions',
            trafic: {},
            isLoaded: false,
            subscriber: props.subscriber,
            isOpened: props.isOpened
        };
        if (props.isOpened)
            this.loadInfo(props.subscriber.id);
    }
    componentWillReceiveProps(props) {
        this.setState({
            isOpened: props.isOpened,
            subscriber: props.subscriber,
        });
        if (props.isOpened)
            this.loadInfo(props.subscriber.id);
    }
    loadInfo(id) {
        subscribers_1.getTraffic(id).then(trafic => {
            trafic = {
                used: trafic['traffic_used'] ? trafic['traffic_used'] : 0,
                start: trafic['traffic_start'] ? trafic['traffic_start'] : 0,
                limit: trafic['traffic_limit'] ? trafic['traffic_limit'] : 0,
                remaining: trafic['traffic_remaining'] ? trafic['traffic_remaining'] : 0,
                unlimited: trafic['traffic_unlimited']
            };
            this.setState({
                isLoaded: true,
                trafic: trafic
            });
        });
    }
    tabSwitcher(tab) {
        this.setState({ tab: tab });
    }
    render() {
        if (!this.state.isOpened)
            return React.createElement("div", { className: "table_row_content is-loading" });
        if (!this.state.isLoaded)
            return React.createElement("div", { className: "table_row_content is-loading" },
                React.createElement(spinner_1.default, { width: "65", height: "65", strokeWidth: "6" }));
        return (React.createElement("div", { className: "table_row_content" },
            React.createElement("div", { className: "subscriber_pane_content" },
                this.renderTrafic(),
                this.renderButtons(),
                this.renderContent())));
    }
    renderContent() {
        let content;
        switch (this.state.tab) {
            case 'sessions':
                content = React.createElement(SubscriberSessions_1.default, null);
                break;
            case 'devices':
                content = React.createElement(SubscriberDevices_1.default, { subscriber: this.state.subscriber });
                break;
            case 'purchases':
                content = React.createElement(SubscriberPurchases_1.default, { subscriber: this.state.subscriber });
                break;
            case 'social':
                content = React.createElement(SubscriberSocial_1.default, { subscriber: this.state.subscriber });
                break;
        }
        return (React.createElement("div", { className: "subscriber_content" }, content));
    }
    renderButtons() {
        let buttons = {
            sessions: 'Sessions',
            devices: 'Devices',
            purchases: 'Purchases',
            social: 'Social'
        }, contentButtons = [];
        for (let k in buttons) {
            contentButtons.push(React.createElement("button", { key: k, className: 'subscriber_tabs_item' + (this.state.tab === k ? ' subscriber_tabs_item-active' : ''), onClick: () => this.tabSwitcher(k), type: "button" }, buttons[k]));
        }
        return (React.createElement("div", { className: "subscriber_buttons" },
            React.createElement("div", null, contentButtons),
            React.createElement("div", { className: "subscriber_manage" },
                React.createElement(SubscriberModify_1.default, { subscriber: this.state.subscriber }),
                React.createElement(SubscriberSetLimit_1.default, { subscriber: this.state.subscriber }),
                React.createElement(SubscriberChangeStatus_1.default, { subscriber: this.state.subscriber }))));
    }
    renderTrafic() {
        let free = (this.state.subscriber.purchases.length === 0);
        if (this.state.trafic.unlimited) {
            return (React.createElement("div", { className: "subscriber_traffic" },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Traffic unlimited"),
                            React.createElement("th", null, "Purchases"))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null, "true"),
                            React.createElement("td", null,
                                React.createElement("span", { className: (free ? 'table_disable' : 'table_enable') }, (free ? 'Free' : 'Not free'))))))));
        }
        return (React.createElement("div", { className: "subscriber_traffic" },
            React.createElement("table", null,
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Traffic unlimited"),
                        React.createElement("th", null, "Traffic start"),
                        React.createElement("th", null, "Traffic used"),
                        React.createElement("th", null, "Traffix remaining"),
                        React.createElement("th", null, "Traffic limit"),
                        React.createElement("th", null, "Purchases"))),
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", null, "false"),
                        React.createElement("td", null,
                            subscribers_1.dateString(this.state.trafic.start),
                            " "),
                        React.createElement("td", null, this.countTrafic(this.state.trafic.used)),
                        React.createElement("td", null, this.countTrafic(this.state.trafic.remaining)),
                        React.createElement("td", null, this.countTrafic(this.state.trafic.limit)),
                        React.createElement("td", null,
                            React.createElement("span", { className: (free ? 'table_disable' : 'table_enable') }, (free ? 'Free' : 'Not free'))))))));
    }
    countTrafic(size) {
        if ((size / (1024 * 1024 * 1024)) > 1)
            return ((size / (1024 * 1024 * 1024)).toFixed(2) + ' gigabytes');
        else if ((size / (1024 * 1024)) > 1)
            return ((size / (1024 * 1024)).toFixed(2) + ' magebytes');
        else if ((size / (1024)) > 1)
            return ((size / (1024)).toFixed(2) + ' kilobytes');
        return (size.toString() + ' bytes');
    }
}
exports.default = SubscriberRowOpened;
//# sourceMappingURL=SubscriberRowOpened.js.map