"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Signal_1 = require("../../functions/Signal");
const Body_1 = require("./Body");
const Header_1 = require("./Header");
const Loading_1 = require("./Loading");
require("../../static/scss/components/modal.scss");
require("../../static/scss/components/table.scss");
require("../../static/scss/routes/subscribers.scss");
const dashboard_1 = require("../../components/dashboard");
const projects_1 = require("../../functions/projects");
const subscribers_1 = require("../../functions/subscribers");
;
class Subscribers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectsList: [],
            loaded: false
        };
        this.signals();
    }
    signals() {
        new Signal_1.default('loaded');
        new Signal_1.default('changeProject');
        new Signal_1.default('projectChanged');
        new Signal_1.default('subscriberAdded');
        Signal_1.default.attach('changeProject', (newProject) => {
            for (let k in this.state.projectsList) {
                if (this.state.projectsList[k].publickey === newProject) {
                    return this.logIn(this.state.projectsList[k]).then((activeProject) => {
                        this.activeProject = activeProject;
                        Signal_1.default.dispatch('projectChanged', this.activeProject);
                    });
                }
            }
        });
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        let state = {};
        projects_1.loadProjects().then((response) => {
            state['projectsList'] = response.projects;
            let id = 0;
            if (subscribers_1.getActiveProject() !== '') {
                let active = subscribers_1.getActiveProject();
                for (let k in state['projectsList']) {
                    if (state['projectsList'][k].publickey === active) {
                        id = Number(k);
                        break;
                    }
                }
            }
            this.logIn(state['projectsList'][id]).then((activeProject) => {
                state['loaded'] = true;
                this.activeProject = activeProject;
                Signal_1.default.dispatch('loaded', true);
                this.setState(state);
            });
        });
    }
    logIn(project) {
        return new Promise((resolve) => {
            if (subscribers_1.checkLogin() && subscribers_1.getActiveProject() === project['publickey'])
                return resolve(project['publickey']);
            subscribers_1.logIn(project['publickey'], project['privatekey']).then((result) => {
                if (result)
                    return resolve(subscribers_1.getActiveProject());
            });
        });
    }
    render() {
        return (React.createElement(dashboard_1.default, { current: "subscribers" },
            React.createElement(Header_1.default, { loaded: this.state.loaded }),
            ",",
            this.state.loaded
                ? React.createElement(Body_1.default, { projectsList: this.state.projectsList, activeProject: this.activeProject })
                : React.createElement(Loading_1.default, null)));
    }
}
exports.Subscribers = Subscribers;
//# sourceMappingURL=index.js.map