"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../../static/scss/components/spinner.scss");
class Spinner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { width, height, strokeWidth } = this.props;
        return (React.createElement("svg", { className: "spinner", width: width, height: height, viewBox: "0 0 66 66", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("circle", { className: "path", fill: "none", strokeWidth: strokeWidth, strokeLinecap: "round", cx: "33", cy: "33", r: "30" })));
    }
}
exports.default = Spinner;
//# sourceMappingURL=index.js.map