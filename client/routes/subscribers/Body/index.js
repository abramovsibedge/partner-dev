"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
;
const ProjectsSelector_1 = require("./ProjectsSelector");
const SubscribersList_1 = require("./SubscribersList");
class Body extends React.Component {
    constructor(props) {
        super(props);
        this.projectsList = props.projectsList;
        this.activeProject = props.activeProject;
    }
    render() {
        let content = (React.createElement("section", { className: "layout" },
            React.createElement("div", { className: "table_cell", style: { width: '100%' } },
                React.createElement("div", { className: "table_cell_content" }, "No result for your request."))));
        if (this.projectsList.length > 0) {
            content = (React.createElement("section", { className: "layout" },
                React.createElement(ProjectsSelector_1.default, { projectsList: this.projectsList, activeProject: this.activeProject }),
                React.createElement(SubscribersList_1.default, null)));
        }
        return content;
    }
}
exports.default = Body;
//# sourceMappingURL=index.js.map