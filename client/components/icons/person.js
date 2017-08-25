"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class IconPerson extends React.Component {
    render() {
        const { width, height } = this.props;
        return (React.createElement("svg", { height: width, width: height, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { d: "M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" }),
            React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })));
    }
}
exports.default = IconPerson;
;
//# sourceMappingURL=person.js.map