"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AddSubscriber_1 = require("./AddSubscriber");
const Search_1 = require("./Search");
const dashboardHeader_1 = require("../../../components/dashboard/dashboardHeader");
const Signal_1 = require("../../../functions/Signal");
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: props.loaded,
        };
    }
    componentDidMount() {
        Signal_1.default.attach('loaded', (loaded) => {
            this.setState({ loaded: loaded });
        });
    }
    render() {
        return (React.createElement(dashboardHeader_1.default, null, this.state.loaded && React.createElement("div", { className: "subscriber_filter" },
            React.createElement(Search_1.default, null),
            React.createElement(AddSubscriber_1.default, null))));
    }
}
exports.default = Header;
//# sourceMappingURL=index.js.map