"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class IconPlus extends React.Component {
    render() {
        const { width, height } = this.props;
        return (React.createElement("svg", { height: width, width: height, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" }),
            React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })));
    }
}
exports.IconPlus = IconPlus;
;
//# sourceMappingURL=plus.js.map