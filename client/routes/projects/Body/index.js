"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const update = require("immutability-helper");
const classNames = require("classnames");
const ProjectItem_1 = require("./ProjectItem");
class Body extends React.Component {
    constructor(props) {
        super(props);
        this.stickTableHead = () => {
            let { stickedTableHead } = this.state;
            window && window.scrollY > 80 ?
                !stickedTableHead && this.setState(update(this.state, {
                    stickedTableHead: { $set: true }
                }))
                :
                    stickedTableHead && this.setState(update(this.state, {
                        stickedTableHead: { $set: false }
                    }));
        };
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
            selectedProjectTab: 'vpn-servers',
            stickedTableHead: false
        };
    }
    componentDidMount() {
        window && window.addEventListener('scroll', this.stickTableHead);
    }
    componentWillUnmount() {
        window && window.removeEventListener('scroll', this.stickTableHead);
    }
    render() {
        const { stickedTableHead } = this.state;
        const { projects } = this.props;
        return (React.createElement("section", { className: "layout" },
            React.createElement("header", { className: "layout_head" },
                React.createElement("div", { className: "layout_head_content" },
                    React.createElement("h1", { className: "layout_h1" }, "Projects"))),
            React.createElement("div", { className: "layout_content" },
                React.createElement("div", { className: "table main_table" },
                    React.createElement("div", { className: classNames("table_head", stickedTableHead && "table_head_sticked") },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '30%' } }, "Public Key"),
                                    React.createElement("td", { style: { width: '50%' } }, "Description"),
                                    React.createElement("td", { style: { width: '20%' } }, "\u00A0"))))),
                    React.createElement("div", { className: "table_body" },
                        projects.length === 0 && React.createElement("div", { className: "table_row table_row_empty" },
                            React.createElement("div", { className: "table_cell", style: { width: '100%' } },
                                React.createElement("div", { className: "table_cell_content" }, "No result for your request."))),
                        projects.length > 0 && projects.map((project, index) => {
                            return React.createElement(ProjectItem_1.default, { key: index, project: project, onUpdate: this.props.onUpdate });
                        }))))));
    }
}
exports.default = Body;
//# sourceMappingURL=index.js.map