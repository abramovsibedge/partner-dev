"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const update = require("immutability-helper");
const utils_1 = require("../../utils");
const storage = new utils_1.storageHelper;
const dashboard_1 = require("../../components/dashboard");
const dashboardHeader_1 = require("../../components/dashboard/dashboardHeader");
const Loading_1 = require("./Loading");
const Header_1 = require("./Header");
const Body_1 = require("./Body");
const messages_1 = require("../auth/messages");
const projects_1 = require("../../functions/projects");
const auth_1 = require("../../functions/auth");
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
        projects_1.loadProjects()
            .then((result) => {
            if (result.result !== "OK") {
                if (result.result === "NOT_AUTHORIZED") {
                    console.log(123);
                    storage.remove('tokens');
                }
            }
            this.setState(update(this.state, {
                projects: { $set: result.projects },
                loading: { $set: false },
            }));
        })
            .catch((error) => {
            console.log(error);
        });
    }
    render() {
        const { loading, projects } = this.state;
        return (React.createElement("div", null, !auth_1.check() ? React.createElement(messages_1.AuthMessage, { isSigned: !auth_1.check() }) : React.createElement(dashboard_1.default, { current: "projects" },
            React.createElement(dashboardHeader_1.default, null,
                React.createElement(Header_1.default, { onUpdate: () => this.reloadProjects() })),
            loading && React.createElement(Loading_1.default, null),
            !loading && React.createElement(Body_1.default, { projects: projects, onUpdate: () => this.reloadProjects() }))));
    }
}
exports.Projects = Projects;
//# sourceMappingURL=index.js.map