"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames");
const _ = require("lodash");
class Input extends React.Component {
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
        const { type, value, label, className, children, onChange, notValid } = this.props;
        const { id } = this.state;
        return (React.createElement("div", { className: classNames('input', className, (notValid && 'input_error')) },
            children,
            React.createElement("input", { type: type, value: value, id: id, className: classNames('input_input', (value && 'is-filled')), onChange: (e) => onChange(e) }),
            React.createElement("label", { htmlFor: id, className: "input_label" }, label)));
    }
}
exports.default = Input;
//# sourceMappingURL=input.js.map