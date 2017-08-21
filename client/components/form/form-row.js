"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class FormRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { children } = this.props;
        return (React.createElement("div", { className: "form_row" }, children));
    }
}
exports.default = FormRow;
//# sourceMappingURL=form-row.js.map