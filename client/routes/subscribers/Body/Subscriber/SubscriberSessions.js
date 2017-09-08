"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Calendar_1 = require("./Calendar");
class SubscriberSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", { className: "subscriber_body_content" },
            React.createElement("div", { className: "session_filter" },
                React.createElement(Calendar_1.default, null))));
    }
}
exports.default = SubscriberSessions;
//# sourceMappingURL=SubscriberSessions.js.map