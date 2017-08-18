"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const react_router_1 = require("react-router");
const routes_js_1 = require("./routes.js");
react_dom_1.render((React.createElement(react_router_1.Router, { routes: routes_js_1.default, history: react_router_1.browserHistory })), document.getElementById('root'));
//# sourceMappingURL=index.js.map