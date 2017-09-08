"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames");
const _ = require("lodash");
class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        };
    }
    componentWillMount() {
        const id = _.uniqueId("prefix-");
        this.setState({ id: id });
    }
    render() {
        const { checked, onChange, label, className, notValid } = this.props;
        const { id } = this.state;
        return (React.createElement("div", { className: classNames('checkbox', className, (notValid && 'checkbox_error')) },
            React.createElement("input", { id: id, className: "checkbox_input", type: "checkbox", checked: (checked), onChange: (e) => onChange(e) }),
            React.createElement("label", { htmlFor: id, className: "checkbox_label" }, label)));
    }
}
exports.default = Checkbox;
//# sourceMappingURL=checkbox2.js.map