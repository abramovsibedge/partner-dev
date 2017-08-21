"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames");
const spinner_1 = require("../spinner");
require("../../static/scss/components/button.scss");
class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { type, className, loading, children } = this.props;
        return (React.createElement("button", { type: type, className: classNames("button", className), disabled: loading }, loading ? React.createElement(spinner_1.default, { width: "30px", height: "30px", strokeWidth: "6" }) : children));
    }
}
exports.Button = Button;
//# sourceMappingURL=index.js.map