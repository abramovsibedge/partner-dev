"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const spinner_1 = require("../../components/spinner");
class Loading extends React.Component {
    render() {
        return (React.createElement("section", { className: "layout is-loading" },
            React.createElement(spinner_1.default, { width: "65", height: "65", strokeWidth: "6" })));
    }
}
exports.default = Loading;
//# sourceMappingURL=Loading.js.map