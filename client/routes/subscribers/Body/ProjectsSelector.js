"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Signal_1 = require("../../../functions/Signal");
const form_1 = require("../../../components/form");
;
class ProjectsSelector extends React.Component {
    constructor(props) {
        super();
        this.projectsList = this.getProjectsList(props.projectsList);
        this.state = {
            activeProject: this.getRowId(props.activeProject)
        };
    }
    getProjectsList(projectList) {
        let list = [];
        for (let k in projectList) {
            list.push({
                value: projectList[k].publickey,
                label: projectList[k].description
            });
        }
        return list;
    }
    changeProjectHandler(value) {
        this.setState({ activeProject: this.getRowId(value) });
        Signal_1.default.dispatch('changeProject', value);
    }
    getRowId(activeProject) {
        let active = 0;
        for (let k in this.projectsList) {
            if (this.projectsList[k].value === activeProject) {
                active = Number(k);
                break;
            }
        }
        ;
        return active;
    }
    render() {
        return (React.createElement("header", { className: "layout_head" },
            React.createElement("div", { className: "layout_head_content" },
                React.createElement("h1", { className: "layout_h1" },
                    "Subscribers",
                    React.createElement(form_1.Select, { value: this.projectsList[this.state.activeProject].value, options: this.projectsList, onChange: (e) => this.changeProjectHandler(e.target.value) }, "Projects")))));
    }
}
exports.default = ProjectsSelector;
//# sourceMappingURL=ProjectsSelector.js.map