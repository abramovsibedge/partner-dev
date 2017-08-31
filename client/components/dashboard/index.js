"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const switcher_1 = require("../../components/switcher");
require("../../static/scss/routes/dashboard.scss");
class Dashboard extends React.Component {
    render() {
        return (React.createElement("div", { className: "dashboard" },
            this.props.children,
            React.createElement(switcher_1.default, { current: this.props.current })));
    }
}
exports.default = Dashboard;
//# sourceMappingURL=index.js.map