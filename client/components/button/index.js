"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames");
require("../../static/scss/components/button.scss");
class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { type, className, onClick, children } = this.props;
        return (React.createElement("button", { onClick: onClick, type: type, className: classNames("button", className) }, children));
    }
}
exports.Button = Button;
//# sourceMappingURL=index.js.map