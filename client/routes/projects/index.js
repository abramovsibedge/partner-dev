"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const update = require("immutability-helper");
const dashboard_1 = require("../../components/dashboard");
const dashboardHeader_1 = require("../../components/dashboard/dashboardHeader");
const Loading_1 = require("./Loading");
const Header_1 = require("./Header");
const Body_1 = require("./Body");
const projects_1 = require("../../functions/projects");
require("../../static/scss/routes/projects.scss");
class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.reloadProjects = () => {
            this.setState(update(this.state, {
                loading: { $set: true },
            }), () => this.componentDidMount());
        };
        this.state = {
            loading: true,
            projects: []
        };
    }
    componentDidMount() {
        projects_1.loadProjects().then((result) => {
            this.setState(update(this.state, {
                projects: { $set: result.projects },
                loading: { $set: false },
            }));
        });
    }
    render() {
        const { loading, projects } = this.state;
        return (React.createElement(dashboard_1.default, { current: "projects" },
            React.createElement(dashboardHeader_1.default, null,
                React.createElement(Header_1.default, { onUpdate: () => this.reloadProjects() })),
            loading && React.createElement(Loading_1.default, null),
            !loading && React.createElement(Body_1.default, { projects: projects, onUpdate: () => this.reloadProjects() })));
    }
}
exports.Projects = Projects;
//# sourceMappingURL=index.js.map