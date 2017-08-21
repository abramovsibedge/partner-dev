"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class FormGroup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { children } = this.props;
        return (React.createElement("div", { className: "form_group" }, children));
    }
}
exports.default = FormGroup;
//# sourceMappingURL=form-group.js.map