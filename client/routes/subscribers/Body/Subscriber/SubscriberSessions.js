"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Loading_1 = require("../../Loading");
const index_1 = require("../../../../components/button/index");
const Calendar_1 = require("./Calendar");
const icons_1 = require("../../../../components/icons");
const subscribers_1 = require("../../../../functions/subscribers");
class SubscriberSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriber: props.subscriber,
            sessions: [],
            loaded: false,
            tx: 0,
            rx: 0,
            size: 0,
            devices: [],
            activeDevice: 0,
            showDevicesDropdown: false
        };
    }
    componentDidMount() {
        subscribers_1.getDevices(this.state.subscriber.id).then((response) => {
            /*response.devices = [
                {
                    type: "Mobile",
                    device_id: 1359,
                    name: "Test mobile 1",
                    registration_time: 1504011677525,
                    connection_time: 1504111677525
                },
                {
                    type: "Mobile 2",
                    device_id: 18654,
                    name: "Test mobile 2",
                    registration_time: 1503011677525,
                    connection_time: 1503111677525
                },
                {
                    type: "Mobile",
                    device_id: 135987,
                    name: "Test mobile 3",
                    registration_time: 1502011677525,
                    connection_time: 1502111677525
                }
            ];*/
            this.setState({
                devices: response.devices
            });
        });
    }
    updateSearch(time) {
        this.time = time;
        this.setState({ loaded: false });
        subscribers_1.getSessions(this.state.subscriber.id, { start_time: this.time.from[0], end_time: this.time.till[0] }).then(response => {
            /*response.sessions = [
                {
                    "user_id": 123,
                    "device_id": "123213",
                    "server": "asdkasd",
                    "start_time": 123761723123,
                    "end_time": 123762723123,
                    "client_address": "asdasdasljdk",
                    "internal_address": "lakidssa;ld;s'ad",
                    "tx": 12323388,
                    "rx": 6863513
                },
                {
                    "user_id": 123,
                    "device_id": "123213",
                    "server": "asdkasd",
                    "start_time": 123761723123,
                    "end_time": 123762723123,
                    "client_address": "asdasdasljdk",
                    "internal_address": "lakidssa;ld;s'ad",
                    "tx": 867432,
                    "rx": 16565232
                },
                {
                    "user_id": 123,
                    "device_id": "123213",
                    "server": "asdkasd",
                    "start_time": 123761723123,
                    "end_time": 123762723123,
                    "client_address": "asdasdasljdk",
                    "internal_address": "lakidssa;ld;s'ad",
                    "tx": 1561321321,
                    "rx": 6874321
                }
            ];*/
            let tx = 0, rx = 0;
            for (let k in response.sessions) {
                tx += response.sessions[k].tx;
                rx += response.sessions[k].rx;
            }
            this.setState({
                loaded: true,
                sessions: response.sessions,
                tx: tx,
                rx: rx,
                size: response.sessions.length
            });
        });
    }
    render() {
        return (React.createElement("div", { className: "subscriber_body_content" },
            React.createElement("div", { className: "session_filter" },
                React.createElement(Calendar_1.default, { updateSearch: this.updateSearch.bind(this), calendarOpened: () => {
                        if (this.state.showDevicesDropdown)
                            this.setState({ showDevicesDropdown: false });
                    }, devicesDropdown: this.state.showDevicesDropdown }),
                this.renderDeviceSelector(),
                React.createElement("div", { className: "sessions_traffic js-sessions-traffic" },
                    React.createElement("div", { className: "sessions_traffic_item" },
                        React.createElement("div", { className: "sessions_traffic_label" }, "Total sessions"),
                        React.createElement("div", { className: "sessions_traffic_value js-sessions-total" }, this.state.size)),
                    React.createElement("div", { className: "sessions_traffic_item" },
                        React.createElement("div", { className: "sessions_traffic_label" }, "Total TX"),
                        React.createElement("div", { className: "sessions_traffic_value js-sessions-total-tx" }, subscribers_1.byteConvert(this.state.tx))),
                    React.createElement("div", { className: "sessions_traffic_item" },
                        React.createElement("div", { className: "sessions_traffic_label" }, "Total RX"),
                        React.createElement("div", { className: "sessions_traffic_value js-sessions-total-rx" }, subscribers_1.byteConvert(this.state.rx))))),
            this.renderContent()));
    }
    renderContent() {
        if (!this.state.loaded) {
            return (React.createElement("div", { className: "subscriber_tabs_content sessions_content" },
                React.createElement("div", { className: "subscriber_tabs_empty sessions_empty" },
                    React.createElement(Loading_1.default, null))));
        }
        if (this.state.sessions.length === 0) {
            return (React.createElement("div", { className: "subscriber_tabs_content sessions_content" },
                React.createElement("div", { className: "subscriber_tabs_empty sessions_empty" },
                    React.createElement("p", null,
                        "Subscriber has no sessions from ",
                        React.createElement("span", null, "All Devices"),
                        " between",
                        React.createElement("br", null),
                        React.createElement("span", null,
                            this.time.from[1],
                            " - ",
                            this.time.till[1],
                            React.createElement("span", null))))));
        }
        let content = [];
        for (let k in this.state.sessions) {
            let session = this.state.sessions[k];
            if (this.state.activeDevice !== 0 && session.device_id !== this.state.activeDevice.device_id)
                continue;
            content.push(React.createElement("div", { className: "table_row", key: k },
                React.createElement("div", { className: "table_row_wrapper" },
                    React.createElement("div", { className: "table_cell", style: { width: "16.4%" } },
                        React.createElement("div", { className: "table_cell_content" }, session.device_id)),
                    React.createElement("div", { className: "table_cell", style: { width: "16.7%" } },
                        React.createElement("div", { className: "table_cell_content" },
                            session.server,
                            "}")),
                    React.createElement("div", { className: "table_cell", style: { width: "11.25%" } },
                        React.createElement("div", { className: "table_cell_content" },
                            React.createElement("div", { className: "table_date" }, subscribers_1.dateString(session.start_time)))),
                    React.createElement("div", { className: "table_cell", style: { width: "11.25%" } },
                        React.createElement("div", { className: "table_cell_content" },
                            React.createElement("div", { className: "table_date" }, subscribers_1.dateString(session.end_time)))),
                    React.createElement("div", { className: "table_cell", style: { width: "13.7%" } },
                        React.createElement("div", { className: "table_cell_content" }, session.client_address)),
                    React.createElement("div", { className: "table_cell", style: { width: "13.02%" } },
                        React.createElement("div", { className: "table_cell_content" }, session.internal_address)),
                    React.createElement("div", { className: "table_cell a-right", style: { width: "9.25%" } },
                        React.createElement("div", { className: "table_cell_content" }, subscribers_1.byteConvert(session.tx))),
                    React.createElement("div", { className: "table_cell a-right", style: { width: "8%" } },
                        React.createElement("div", { className: "table_cell_content" }, subscribers_1.byteConvert(session.rx))))));
        }
        return (React.createElement("div", { className: "table inner_table" },
            React.createElement("div", { className: "table_head" },
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: "16.4%" } }, "Device ID"),
                            React.createElement("td", { style: { width: "16.7%" } }, "Server"),
                            React.createElement("td", { style: { width: "11.25%" } }, "Start time"),
                            React.createElement("td", { style: { width: "11.25%" } }, "End time"),
                            React.createElement("td", { style: { width: "13.7%" } }, "Client address"),
                            React.createElement("td", { style: { width: "13.02%" } }, "Internal address"),
                            React.createElement("td", { style: { width: "9.25%" } }, "Incoming"),
                            React.createElement("td", { style: { width: "8.4%" } }, "Outcoming"))))),
            React.createElement("div", { className: "table_body" }, content),
            React.createElement("div", { className: "subscriber_tabs_empty sessions_empty" },
                React.createElement("p", null,
                    "Subscriber has ",
                    this.state.size,
                    " sessions from ",
                    React.createElement("span", null, this.state.activeDevice === 0 ? 'All Devices' : this.state.activeDevice.name),
                    " between",
                    React.createElement("br", null),
                    React.createElement("span", null,
                        this.time.from[1],
                        " - ",
                        this.time.till[1],
                        React.createElement("span", null))),
                React.createElement("p", null,
                    React.createElement("a", { href: "#", className: "js-sessions-other-range" }, "Try different time range")))));
    }
    changeDevice(newDevice) {
        this.setState({ activeDevice: newDevice });
        let tx = 0, rx = 0, size = 0;
        for (let k in this.state.sessions) {
            if (newDevice !== 0 && this.state.sessions[k].device_id !== newDevice.device_id)
                continue;
            tx += this.state.sessions[k].tx;
            rx += this.state.sessions[k].rx;
            size++;
        }
        this.setState({ activeDevice: newDevice, tx: tx, rx: rx, size: size, showDevicesDropdown: false });
    }
    renderDeviceSelector() {
        let devices = [
            React.createElement("div", { className: "device", key: "all", onClick: () => this.changeDevice(0) }, "All Devices")
        ];
        for (let k in this.state.devices) {
            devices.push(React.createElement("div", { key: this.state.devices[k].device_id, className: "device", onClick: () => this.changeDevice(this.state.devices[k]) }, this.state.devices[k].name));
        }
        return (React.createElement("div", { className: "session_button_container devices" },
            React.createElement(index_1.Button, { type: "button", className: 'calendar_button', onClick: () => this.setState({ showDevicesDropdown: !this.state.showDevicesDropdown }) },
                React.createElement(icons_1.IconPhone, { width: "24", height: "24" }),
                React.createElement("span", null, "All Devices"),
                React.createElement("div", { className: "arrow" },
                    React.createElement(icons_1.IconPlay, { width: "24", height: "24" }))),
            React.createElement("div", { className: 'sessions_devices_drop' + (this.state.showDevicesDropdown ? ' opened' : '') }, devices)));
    }
}
exports.default = SubscriberSessions;
//# sourceMappingURL=SubscriberSessions.js.map