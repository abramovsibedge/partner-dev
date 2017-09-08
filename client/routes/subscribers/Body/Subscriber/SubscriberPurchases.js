"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_modal_1 = require("react-modal");
const Loading_1 = require("../../Loading");
const subscribers_1 = require("../../../../functions/subscribers");
const icons_1 = require("../../../../components/icons");
const button_1 = require("../../../../components/button");
;
class SubscriberPurchases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriber: props.subscriber,
            loaded: false,
            purchases: [],
            showModal: false
        };
    }
    componentDidMount() {
        this.getPurchases();
    }
    componentWillReceiveProps(props) {
        this.setState({
            subscriber: props.subscriber,
            loaded: false
        });
        this.getPurchases();
    }
    getPurchases() {
        subscribers_1.getPurchases(this.state.subscriber.id).then((response) => {
            /*response.purchases = [
                {
                    purchase_id: 123,
                    purchase_type: 'First',
                    purchase_time: 1504011677525
                },
                {
                    purchase_id: 2344,
                    purchase_type: 'Second',
                    purchase_time: 1504111677525
                },
                {
                    purchase_id: 7567,
                    purchase_type: 'Third',
                    purchase_time: 1504211677525
                },
            ];*/
            this.setState({
                loaded: true,
                purchases: response.purchases
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
        subscribers_1.deletePurchase(this.state.subscriber.id, id).then(() => {
            this.getPurchases();
        });
    }
    render() {
        if (!this.state.loaded) {
            return (React.createElement("div", { id: "purchases", className: "subscriber_tab subscriber_tab-active" },
                React.createElement("div", { className: "subscriber_tab_content" },
                    React.createElement("div", { className: "subscriber_tabs_empty" },
                        React.createElement(Loading_1.default, null)))));
        }
        if (this.state.purchases.length === 0) {
            return (React.createElement("div", { id: "purchases", className: "subscriber_tab subscriber_tab-active" },
                React.createElement("div", { className: "subscriber_tab_content" },
                    React.createElement("div", { className: "subscriber_tabs_empty" },
                        React.createElement("p", null, "Subscriber has no purchases.")))));
        }
        let content = [];
        for (let k in this.state.purchases) {
            let purchase = this.state.purchases[k];
            content.push(React.createElement("div", { className: "table_row", key: k },
                React.createElement("div", { className: "table_row_wrapper" },
                    React.createElement("div", { className: "table_cell", style: { width: '30%' } },
                        React.createElement("div", { className: "table_cell_content" }, purchase.purchase_id)),
                    React.createElement("div", { className: "table_cell", style: { width: '30%' } },
                        React.createElement("div", { className: "table_cell_content" }, purchase.type)),
                    React.createElement("div", { className: "table_cell", style: { width: '30%' } },
                        React.createElement("div", { className: "table_cell_content" },
                            React.createElement("div", { className: "table_date" }, subscribers_1.dateString(purchase.purchase_time)))),
                    React.createElement("div", { className: "table_cell", style: { width: '10%' } },
                        React.createElement("div", { className: "table_cell_content" },
                            React.createElement(button_1.Button, { type: "button", className: "subscriber_manage_item subscriber_manage_item-disable", onClick: () => this.showModal(true) },
                                React.createElement(icons_1.IconDelete, { width: "24", height: "24" })),
                            React.createElement(react_modal_1.default, { isOpen: this.state.showModal, className: { base: 'modal_inner' }, overlayClassName: { base: 'modal_outer' }, contentLabel: "test" },
                                React.createElement("div", { className: "modal_header" },
                                    React.createElement("h2", null, "Delete purchase")),
                                React.createElement("div", { className: "modal_content is-text-center" }, "Do you really want to delete purchase?"),
                                React.createElement("div", { className: "modal_footer" },
                                    React.createElement("button", { className: "modal_btn modal_btn-reset", type: "button", onClick: () => this.showModal(false) }, "Cancel"),
                                    React.createElement("button", { className: "modal_btn modal_btn-submit", type: "button", onClick: () => this.deletePurchase(purchase.purchase_id) }, "Delete purchase")),
                                React.createElement(button_1.Button, { type: "button", className: "modal_close", onClick: () => this.showModal(false) },
                                    React.createElement(icons_1.IconClose, { width: "24", height: "24" }))))))));
        }
        return (React.createElement("div", { id: "purchases", className: "subscriber_tab subscriber_tab-active" },
            React.createElement("div", { className: "table inner_table" },
                React.createElement("div", { className: "table_head" },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } }, "Purchase ID"),
                                React.createElement("td", { style: { width: '30%' } }, "Purchase type"),
                                React.createElement("td", { style: { width: '30%' } }, "Check time"),
                                React.createElement("td", { style: { width: '10%' } }))))),
                React.createElement("div", { className: "table_body" }, content))));
    }
}
exports.default = SubscriberPurchases;
//# sourceMappingURL=SubscriberPurchases.js.map