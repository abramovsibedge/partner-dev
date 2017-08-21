"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const firebase = require("firebase");
const config_1 = require("../config");
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        firebase.initializeApp({
            apiKey: config_1.default.firebaseKey,
            authDomain: config_1.default.firebaseAuthDomain,
            databaseURL: config_1.default.firebasedatabaseURL
        });
    }
    render() {
        return (React.createElement("div", { className: "content" }, this.props.children));
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map