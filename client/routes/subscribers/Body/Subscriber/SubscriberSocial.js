"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
;
class SubscriberSocial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriber: props.subscriber
        };
    }
    render() {
        let content = [
            React.createElement("div", { className: "table_row", key: 'extref' },
                React.createElement("div", { className: "table_row_wrapper" },
                    React.createElement("div", { className: "table_cell", style: { width: '20%' } },
                        React.createElement("div", { className: "table_cell_content" }, "Extref")),
                    React.createElement("div", { className: "table_cell", style: { width: '80%' } },
                        React.createElement("div", { className: "table_cell_content" }, this.state.subscriber.extref))))
        ];
        for (let k in this.state.subscriber.social) {
            content.push(React.createElement("div", { className: "table_row", key: k },
                React.createElement("div", { className: "table_row_wrapper" },
                    React.createElement("div", { className: "table_cell", style: { width: '20%' } },
                        React.createElement("div", { className: "table_cell_content" }, k)),
                    React.createElement("div", { className: "table_cell", style: { width: '80%' } },
                        React.createElement("div", { className: "table_cell_content" }, this.state.subscriber.social[k])))));
        }
        return (React.createElement("div", { id: "purchases", className: "subscriber_tab subscriber_tab-active" },
            React.createElement("div", { className: "table inner_table" },
                React.createElement("div", { className: "table_head" },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '20%' } }, "Social"),
                                React.createElement("td", { style: { width: '80%' } }, "Content"))))),
                React.createElement("div", { className: "table_body" }, content))));
    }
}
exports.default = SubscriberSocial;
//# sourceMappingURL=SubscriberSocial.js.map