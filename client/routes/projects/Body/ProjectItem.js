"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const update = require("immutability-helper");
const react_modal_1 = require("react-modal");
const classNames = require("classnames");
require("../../../static/scss/components/modal.scss");
require("../../../static/scss/components/table.scss");
const projects_1 = require("../../../functions/projects");
const icons_1 = require("../../../components/icons");
const spinner_1 = require("../../../components/spinner");
const form_1 = require("../../../components/form");
const button_1 = require("../../../components/button");
const utils_1 = require("../../../utils");
class ProjectItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteProjectModalState: false,
            addUserModalState: false,
            addUserObject: {
                email: '',
                validationState: true,
                message: ''
            },
            deleteUserModalState: false,
            loading: true,
            selectedProjectId: '',
            selectedProject: {},
            selectedProjectTab: 'vpn-servers'
        };
    }
    showDeleteProject(value) {
        this.setState(update(this.state, {
            deleteProjectModalState: { $set: value },
        }));
    }
    deleteProjectConfirm(project) {
        projects_1.deleteProject(project).then((result) => {
            this.setState(update(this.state, {
                deleteProjectModalState: { $set: false },
                loading: { $set: true },
            }), () => this.props.onUpdate());
        });
    }
    openProject(id) {
        this.setState(update(this.state, {
            selectedProjectId: { $set: id }
        }));
        projects_1.loadProjectItem(id).then(result => {
            this.setState(update(this.state, {
                selectedProjectId: { $set: id },
                selectedProject: { $set: result }
            }));
        });
    }
    closeProject() {
        this.setState(update(this.state, {
            selectedProject: { $set: {} },
            selectedProjectId: { $set: '' }
        }));
    }
    tabSwitcher(tab) {
        this.setState(update(this.state, {
            selectedProjectTab: { $set: tab }
        }));
    }
    setVisibility(project, country, visibility) {
        projects_1.setVisibility(project, country, visibility).then(() => {
            projects_1.loadProjectItem(project).then(result => {
                this.setState(update(this.state, {
                    selectedProjectId: { $set: project },
                    selectedProject: { $set: result }
                }));
            });
        });
    }
    showAddUser(value) {
        this.setState(update(this.state, {
            addUserModalState: { $set: value },
        }));
    }
    addUserHandler(value, stateItem) {
        let newState = {};
        newState['addUserObject'] = { [stateItem]: { $set: value } };
        this.setState(update(this.state, newState));
    }
    addUserSubmit(project) {
        const $t = this;
        const $state = $t.state;
        let state = true;
        let message = '';
        if (!$state.addUserObject['email']) {
            state = false;
            message += 'Fill in the highlighted fields.';
        }
        if (!utils_1.emailValidation($state.addUserObject['email'])) {
            state = false;
            message += 'Email not valid.';
        }
        $t.setState(update($state, {
            addUserObject: {
                validationState: { $set: false },
                message: { $set: message }
            }
        }));
        if (!state && message)
            return false;
        projects_1.addUser(project, $state.addUserObject['email']).then(() => {
            $t.setState(update($state, {
                addUserObject: {
                    validationState: { $set: true },
                    message: { $set: '' }
                }
            }), () => {
                projects_1.loadProjectItem(project).then(result => {
                    this.setState(update($state, {
                        selectedProjectId: { $set: project },
                        selectedProject: { $set: result },
                        addUserModalState: { $set: false }
                    }));
                });
            });
        });
    }
    showDeleteUser(value) {
        this.setState(update(this.state, {
            deleteUserModalState: { $set: value },
        }));
    }
    deleteUserConfirm(project, email) {
        projects_1.deleteUser(project, email).then(() => {
            projects_1.loadProjectItem(project).then(result => {
                this.setState(update(this.state, {
                    selectedProjectId: { $set: project },
                    selectedProject: { $set: result },
                    deleteUserModalState: { $set: false }
                }));
            });
        });
    }
    render() {
        const { selectedProjectId, selectedProject, deleteProjectModalState, selectedProjectTab, addUserObject, addUserModalState, deleteUserModalState } = this.state;
        const { project } = this.props;
        return (React.createElement("div", { className: classNames("table_row", selectedProjectId === project.publickey && "table_row_open") },
            React.createElement("div", { className: "table_row_wrapper", onClick: () => this.openProject(project.publickey) },
                React.createElement("div", { className: "table_cell", style: { width: '30%' } },
                    React.createElement("div", { className: "table_cell_content" }, project.publickey)),
                React.createElement("div", { className: "table_cell", style: { width: '50%' } },
                    React.createElement("div", { className: "table_cell_content" }, project.description)),
                React.createElement("div", { className: "table_cell", style: { width: '20%' } }, "\u00A0")),
            React.createElement(button_1.Button, { type: "button", className: "project_close", onClick: () => this.closeProject() },
                React.createElement(icons_1.IconClose, { width: "24", height: "24" })),
            React.createElement("div", { className: classNames("table_row_content", Object.keys(selectedProject).length === 0 && "is-loading") },
                selectedProjectId === project.publickey && Object.keys(selectedProject).length === 0
                    && React.createElement(spinner_1.default, { width: "65", height: "65", strokeWidth: "6" }),
                selectedProjectId === project.publickey && Object.keys(selectedProject).length > 0
                    && React.createElement("div", { className: "project_pane_content" },
                        React.createElement("div", { className: "project_traffic" },
                            React.createElement("table", null,
                                React.createElement("thead", null,
                                    React.createElement("tr", null,
                                        React.createElement("th", null, "Private Key"),
                                        React.createElement("th", null, "URL"))),
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null, project.privatekey),
                                        React.createElement("td", null, "https://backend.northghost.com"))))),
                        React.createElement("div", { className: "project_buttons" },
                            React.createElement("div", null,
                                React.createElement("button", { className: classNames("project_tabs_item", selectedProjectTab === "vpn-servers" && "project_tabs_item-active"), onClick: () => this.tabSwitcher("vpn-servers"), type: "button" }, "VPN Servers"),
                                React.createElement("button", { className: classNames("project_tabs_item", selectedProjectTab === "access" && "project_tabs_item-active"), onClick: () => this.tabSwitcher("access"), type: "button" }, "Access")),
                            React.createElement("div", { className: "project_manage" },
                                React.createElement(button_1.Button, { type: "button", className: "project_manage_item project_manage_item-disable", onClick: () => this.showDeleteProject(true) },
                                    React.createElement(icons_1.IconDelete, { width: "24", height: "24" }),
                                    React.createElement("span", null, "Delete project")),
                                React.createElement(react_modal_1.default, { isOpen: deleteProjectModalState, className: { base: 'modal_inner' }, overlayClassName: { base: 'modal_outer' }, contentLabel: "test" },
                                    React.createElement("div", { className: "modal_header" },
                                        React.createElement("h2", null, "Delete project")),
                                    React.createElement("div", { className: "modal_content is-text-center" }, "Do you really want to delete project?"),
                                    React.createElement("div", { className: "modal_footer" },
                                        React.createElement("button", { className: "modal_btn modal_btn-reset", type: "button", onClick: () => this.showDeleteProject(false) }, "Cancel"),
                                        React.createElement("button", { className: "modal_btn modal_btn-submit", type: "button", onClick: () => this.deleteProjectConfirm(project) }, "Delete project")),
                                    React.createElement(button_1.Button, { type: "button", className: "modal_close", onClick: () => this.showDeleteProject(false) },
                                        React.createElement(icons_1.IconClose, { width: "24", height: "24" }))))),
                        React.createElement("div", { className: "project_content" },
                            selectedProjectTab === "vpn-servers" && React.createElement("div", null,
                                selectedProject['countries'].countries.length === 0 &&
                                    React.createElement("div", { className: "project_tabs_empty" },
                                        React.createElement("p", null, "Project has no countries.")),
                                selectedProject['countries'].countries.length > 0 && React.createElement("div", { className: "table inner_table" },
                                    React.createElement("div", { className: "table_head" },
                                        React.createElement("table", null,
                                            React.createElement("tbody", null,
                                                React.createElement("tr", null,
                                                    React.createElement("td", { style: { width: '25%' } }, "Country"),
                                                    React.createElement("td", { style: { width: '65%' } }, "Protocols"),
                                                    React.createElement("td", { style: { width: '10%' } }, "Visibility"))))),
                                    React.createElement("div", { className: "table_body" }, selectedProject['countries'].countries.map((country, index) => {
                                        return React.createElement("div", { key: index, className: "table_row" },
                                            React.createElement("div", { className: "table_row_wrapper" },
                                                React.createElement("div", { className: "table_cell", style: { width: '25%' } },
                                                    React.createElement("div", { className: "table_cell_content" }, country.country)),
                                                React.createElement("div", { className: "table_cell", style: { width: '65%' } },
                                                    React.createElement("div", { className: "table_cell_content" }, country.protocols)),
                                                React.createElement("div", { className: "table_cell", style: { width: '10%' } },
                                                    React.createElement("div", { className: "table_cell_content country_visibility" },
                                                        React.createElement(form_1.Checkbox, { className: "project_edit_checkbox", checked: country.visibility, onChange: () => this.setVisibility(project.publickey, country.country, !country.visibility) }, "\u00A0")))));
                                    })))),
                            selectedProjectTab === "access" && React.createElement("div", null,
                                React.createElement("div", { className: "user_new" },
                                    React.createElement(button_1.Button, { type: "button", className: "user_new_btn is-transparent", onClick: () => this.showAddUser(true) },
                                        React.createElement(icons_1.IconPlus, { width: "24", height: "24" }),
                                        React.createElement("span", null, "Add access email")),
                                    React.createElement(react_modal_1.default, { isOpen: addUserModalState, className: { base: 'modal_inner' }, overlayClassName: { base: 'modal_outer' }, contentLabel: "test" },
                                        React.createElement("div", { className: "modal_header" },
                                            React.createElement("h2", null, "Create user")),
                                        React.createElement(form_1.Form, { submit: () => this.addUserSubmit(project.publickey), className: "modal_form" },
                                            React.createElement("div", { className: "modal_error" }, addUserObject['message']),
                                            React.createElement("div", { className: "modal_content" },
                                                React.createElement(form_1.FormRow, null,
                                                    React.createElement(form_1.Input, { type: "email", label: "User email", value: addUserObject['email'], notValid: !addUserObject['validationState'] && !addUserObject['email'], onChange: (e) => this.addUserHandler(e.target.value, 'email') }))),
                                            React.createElement("div", { className: "modal_footer" },
                                                React.createElement("button", { className: "modal_btn modal_btn-reset", type: "button", onClick: () => this.showAddUser(false) }, "Cancel"),
                                                React.createElement("button", { className: "modal_btn modal_btn-submit", type: "submit" }, "Create user"))),
                                        React.createElement(button_1.Button, { type: "button", className: "modal_close", onClick: () => this.showAddUser(false) },
                                            React.createElement(icons_1.IconClose, { width: "24", height: "24" })))),
                                selectedProject['emails'].usersMail.length === 0 && React.createElement("div", { className: "project_tabs_empty" },
                                    React.createElement("p", null, "Project has no users.")),
                                selectedProject['emails'].usersMail.length > 0 && React.createElement("div", { className: "table inner_table" },
                                    React.createElement("div", { className: "table_head" },
                                        React.createElement("table", null,
                                            React.createElement("tbody", null,
                                                React.createElement("tr", null,
                                                    React.createElement("td", { style: { width: '50%' } }, "User"),
                                                    React.createElement("td", { style: { width: '50%' } }, "\u00A0"))))),
                                    React.createElement("div", { className: "table_body" }, selectedProject['emails'].usersMail.map((email, index) => {
                                        return React.createElement("div", { key: index, className: "table_row" },
                                            React.createElement("div", { className: "table_row_wrapper" },
                                                React.createElement("div", { className: "table_cell", style: { width: '50%' } },
                                                    React.createElement("div", { className: "table_cell_content" }, email)),
                                                React.createElement("div", { className: "table_cell", style: { width: '50%' } },
                                                    React.createElement("div", { className: "table_cell_content user_delete" },
                                                        React.createElement(button_1.Button, { type: "button", className: "user_delete_btn is-transparent", onClick: () => this.showDeleteUser(true) },
                                                            React.createElement(icons_1.IconClose, { width: "24", height: "24" })),
                                                        React.createElement(react_modal_1.default, { isOpen: deleteUserModalState, className: { base: 'modal_inner' }, overlayClassName: { base: 'modal_outer' }, contentLabel: "test" },
                                                            React.createElement("div", { className: "modal_header" },
                                                                React.createElement("h2", null, "Delete user")),
                                                            React.createElement("div", { className: "modal_content is-text-center" }, "Do you really want to delete user?"),
                                                            React.createElement("div", { className: "modal_footer" },
                                                                React.createElement("button", { className: "modal_btn modal_btn-reset", type: "button", onClick: () => this.showDeleteUser(false) }, "Cancel"),
                                                                React.createElement("button", { className: "modal_btn modal_btn-submit", type: "button", onClick: () => this.deleteUserConfirm(project.publickey, email) }, "Delete user")),
                                                            React.createElement(button_1.Button, { type: "button", className: "modal_close", onClick: () => this.showDeleteUser(false) },
                                                                React.createElement(icons_1.IconClose, { width: "24", height: "24" })))))));
                                    })))))))));
    }
}
exports.default = ProjectItem;
//# sourceMappingURL=ProjectItem.js.map