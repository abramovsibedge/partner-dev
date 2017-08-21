"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames");
class Select extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { value, options, onChange, notValid, children, } = this.props;
        return (React.createElement("select", { value: value, className: classNames('select', 'input', (notValid && 'input_error select_error')), onChange: (e) => onChange(e) },
            React.createElement("option", { value: '', disabled: true }, children),
            options.map((item, index) => React.createElement("option", { key: index, value: item.value }, item.label))));
    }
}
exports.default = Select;
//# sourceMappingURL=select.js.map