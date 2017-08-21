"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames");
require("../../static/scss/components/form.scss");
class Form extends React.Component {
    constructor(props) {
        super(props);
    }
    formSubmitHandler(e) {
        e.preventDefault();
        this.props.submit();
    }
    render() {
        const { className, children } = this.props;
        return (React.createElement("form", { className: classNames('form', className), onSubmit: (e) => this.formSubmitHandler(e), noValidate: true }, children));
    }
}
exports.default = Form;
//# sourceMappingURL=form.js.map