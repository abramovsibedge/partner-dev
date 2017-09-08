"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "content" }, this.props.children));
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map