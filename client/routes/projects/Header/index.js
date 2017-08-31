"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_modal_1 = require("react-modal");
const update = require("immutability-helper");
const icons_1 = require("../../../components/icons");
const form_1 = require("../../../components/form");
const button_1 = require("../../../components/button");
const projects_1 = require("../../../functions/projects");
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.showAddProject = (value) => {
            this.setState(update(this.state, {
                addProjectModalState: { $set: value },
            }));
        };
        this.addProjectHandler = (value, stateItem) => {
            let newState = {};
            newState['addProjectObject'] = { [stateItem]: { $set: value } };
            this.setState(update(this.state, newState));
        };
        this.addProjectSubmit = () => {
            const $t = this;
            const $state = $t.state;
            let state = true;
            let message = '';
            if (!$state.addProjectObject['public_key'] || !$state.addProjectObject['project_type']) {
                state = false;
                message += 'Fill in the highlighted fields.';
            }
            $t.setState(update($state, {
                addProjectObject: {
                    validationState: { $set: false },
                    message: { $set: message }
                }
            }));
            if (!state && message)
                return false;
            projects_1.addProject($state.addProjectObject)
                .then((response) => {
                if (response.result !== "OK") {
                    throw response.error;
                }
                $t.setState(update($state, {
                    addProjectObject: {
                        public_key: { $set: '' },
                        private_key: { $set: '' },
                        project_type: { $set: '' },
                        description: { $set: '' },
                        validationState: { $set: true },
                        message: { $set: '' }
                    },
                    addProjectModalState: { $set: false }
                }), () => this.props.onUpdate());
            })
                .catch((error) => {
                $t.setState(update($state, {
                    addProjectObject: {
                        message: { $set: error.toString() }
                    }
                }));
            });
        };
        this.state = {
            addProjectModalState: false,
            addProjectObject: {
                public_key: '',
                private_key: '',
                description: '',
                project_type: '',
                validationState: true,
                message: ''
            },
            productTypes: [{
                    value: "proxy",
                    label: "Proxy"
                }, {
                    value: "public_vpn",
                    label: "Public VPN"
                }, {
                    value: "private_vpn",
                    label: "Private VPN"
                }],
        };
    }
    render() {
        const { addProjectModalState, addProjectObject, productTypes } = this.state;
        return (React.createElement("div", null,
            React.createElement(button_1.Button, { type: "submit", className: "is-transparent", onClick: () => this.showAddProject(true) },
                React.createElement(icons_1.IconPlus, { width: "24", height: "24" }),
                React.createElement("span", null, "Add project")),
            React.createElement(react_modal_1.default, { isOpen: addProjectModalState, className: { base: 'modal_inner' }, overlayClassName: { base: 'modal_outer' }, contentLabel: "test" },
                React.createElement("div", { className: "modal_header" },
                    React.createElement("h2", null, "Create project")),
                React.createElement(form_1.Form, { submit: () => this.addProjectSubmit(), className: "modal_form" },
                    React.createElement("div", { className: "modal_error" }, addProjectObject['message']),
                    React.createElement("div", { className: "modal_content" },
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Input, { type: "text", label: "Public Key", value: addProjectObject['public_key'], notValid: !addProjectObject['validationState'] && !addProjectObject['public_key'], onChange: (e) => this.addProjectHandler(e.target.value, 'public_key') })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Input, { type: "text", label: "Private Key", value: addProjectObject['private_key'], onChange: (e) => this.addProjectHandler(e.target.value, 'private_key') })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Input, { type: "text", label: "Description", value: addProjectObject['description'], onChange: (e) => this.addProjectHandler(e.target.value, 'description') })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Select, { notValid: !addProjectObject['validationState'] && !addProjectObject['project_type'], value: addProjectObject['project_type'], options: productTypes, onChange: (e) => this.addProjectHandler(e.target.value, 'project_type') }, "Project type"))),
                    React.createElement("div", { className: "modal_footer" },
                        React.createElement("button", { className: "modal_btn modal_btn-reset", type: "button", onClick: () => this.showAddProject(false) }, "Cancel"),
                        React.createElement("button", { className: "modal_btn modal_btn-submit", type: "submit" }, "Create project"))),
                React.createElement(button_1.Button, { type: "button", className: "modal_close", onClick: () => this.showAddProject(false) },
                    React.createElement(icons_1.IconClose, { width: "24", height: "24" })))));
    }
}
exports.default = Header;
//# sourceMappingURL=index.js.map