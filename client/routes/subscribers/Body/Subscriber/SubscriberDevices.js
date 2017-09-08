"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_modal_1 = require("react-modal");
const Loading_1 = require("../../Loading");
const subscribers_1 = require("../../../../functions/subscribers");
const icons_1 = require("../../../../components/icons");
const button_1 = require("../../../../components/button");
;
class SubscriberDevices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriber: props.subscriber,
            loaded: false,
            devices: [],
            showModal: false
        };
    }
    componentDidMount() {
        this.getDevices();
    }
    componentWillReceiveProps(props) {
        this.setState({
            subscriber: props.subscriber,
            loaded: false
        });
        this.getDevices();
    }
    getDevices() {
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
            ]; */
            this.setState({
                loaded: true,
                devices: response.devices
            });
        });
    }
    showModal(state) {
        this.setState({
            showModal: state
        });
    }
    deletePurchase(id) {
        this.setState({
            loaded: false,
            showModal: false
        });
        subscribers_1.deleteDevice(this.state.subscriber.id, id).then(() => {
            this.getDevices();
        });
    }
    render() {
        if (!this.state.loaded) {
            return (React.createElement("div", { id: "devices", className: "subscriber_tab subscriber_tab-active" },
                React.createElement("div", { className: "subscriber_tab_content" },
                    React.createElement("div", { className: "subscriber_tabs_empty" },
                        React.createElement(Loading_1.default, null)))));
        }
        if (this.state.devices.length === 0) {
            return (React.createElement("div", { id: "devices", className: "subscriber_tab subscriber_tab-active" },
                React.createElement("div", { className: "subscriber_tab_content" },
                    React.createElement("div", { className: "subscriber_tabs_empty" },
                        React.createElement("p", null, "Subscriber has no devices.")))));
        }
        let content = [];
        for (let k in this.state.devices) {
            let device = this.state.devices[k];
            content.push(React.createElement("div", { className: "table_row", key: k },
                React.createElement("div", { className: "table_row_wrapper" },
                    React.createElement("div", { className: "table_cell", style: { width: '16.9%' } },
                        React.createElement("div", { className: "table_cell_content" }, device.device_id)),
                    React.createElement("div", { className: "table_cell", style: { width: '13%' } },
                        React.createElement("div", { className: "table_cell_content" }, device.name)),
                    React.createElement("div", { className: "table_cell", style: { width: '19.5%' } },
                        React.createElement("div", { className: "table_cell_content" }, device.type)),
                    React.createElement("div", { className: "table_cell", style: { width: '22%' } },
                        React.createElement("div", { className: "table_cell_content" }, subscribers_1.dateString(device.registration_time))),
                    React.createElement("div", { className: "table_cell", style: { width: '22%' } },
                        React.createElement("div", { className: "table_cell_content" }, subscribers_1.dateString(device.connection_time))),
                    React.createElement("div", { className: "table_cell", style: { width: '6.5%' } },
                        React.createElement("div", { className: "table_cell_content" },
                            React.createElement(button_1.Button, { type: "button", className: "subscriber_manage_item subscriber_manage_item-disable", onClick: () => this.showModal(true) },
                                React.createElement(icons_1.IconDelete, { width: "24", height: "24" })),
                            React.createElement(react_modal_1.default, { isOpen: this.state.showModal, className: { base: 'modal_inner' }, overlayClassName: { base: 'modal_outer' }, contentLabel: "test" },
                                React.createElement("div", { className: "modal_header" },
                                    React.createElement("h2", null, "Delete device")),
                                React.createElement("div", { className: "modal_content is-text-center" }, "Do you really want to delete device?"),
                                React.createElement("div", { className: "modal_footer" },
                                    React.createElement("button", { className: "modal_btn modal_btn-reset", type: "button", onClick: () => this.showModal(false) }, "Cancel"),
                                    React.createElement("button", { className: "modal_btn modal_btn-submit", type: "button", onClick: () => this.deletePurchase(device.device_id) }, "Delete device")),
                                React.createElement(button_1.Button, { type: "button", className: "modal_close", onClick: () => this.showModal(false) },
                                    React.createElement(icons_1.IconClose, { width: "24", height: "24" }))))))));
        }
        return (React.createElement("div", { id: "devices", className: "subscriber_tab subscriber_tab-active" },
            React.createElement("div", { className: "table inner_table" },
                React.createElement("div", { className: "table_head" },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '16.9%' } }, "Device ID"),
                                React.createElement("td", { style: { width: '13%' } }, "Name"),
                                React.createElement("td", { style: { width: '19.5%' } }, "Device type"),
                                React.createElement("td", { style: { width: '22%' } }, "Registration time"),
                                React.createElement("td", { style: { width: '22%' } }, "Connection time"),
                                React.createElement("td", { style: { width: '6.5%' } }))))),
                React.createElement("div", { className: "table_body" }, content))));
    }
}
exports.default = SubscriberDevices;
//# sourceMappingURL=SubscriberDevices.js.map