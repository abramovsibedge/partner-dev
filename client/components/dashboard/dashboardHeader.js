"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_modal_1 = require("react-modal");
const update = require("immutability-helper");
const icons_1 = require("../../components/icons");
const auth_1 = require("../../functions/auth");
const button_1 = require("../../components/button");
class DashboardHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutModalState: false,
        };
    }
    showLogout(value) {
        this.setState(update(this.state, {
            logoutModalState: { $set: value },
        }));
    }
    render() {
        const { logoutModalState } = this.state;
        return (React.createElement("header", { className: 'header' },
            React.createElement("div", { className: "header_content" },
                React.createElement("div", { className: "header_user" },
                    React.createElement("div", { className: "header_logo" },
                        React.createElement("a", { href: "/" },
                            React.createElement("img", { className: "header_logo_img", src: require('../../static/media/poweredbyhss_light.svg'), alt: "Partners Portal Logo", width: "auto", height: "24" }))),
                    React.createElement("div", { className: "header_logout" },
                        "Hello test! ",
                        React.createElement("a", { href: "#", className: "header_logout_link", onClick: () => this.showLogout(true) }, "Logout"),
                        React.createElement(react_modal_1.default, { isOpen: logoutModalState, className: { base: 'modal_inner' }, overlayClassName: { base: 'modal_outer' }, contentLabel: "test" },
                            React.createElement("div", { className: "modal_header" },
                                React.createElement("h2", null, "Logout")),
                            React.createElement("div", { className: "modal_content is-text-center" }, "Do you really want to logout?"),
                            React.createElement("div", { className: "modal_footer" },
                                React.createElement("button", { className: "modal_btn modal_btn-reset", type: "button", onClick: () => this.showLogout(false) }, "Cancel"),
                                React.createElement("button", { className: "modal_btn modal_btn-submit", type: "button", onClick: () => auth_1.logOut() }, "Logout")),
                            React.createElement(button_1.Button, { type: "button", className: "modal_close", onClick: () => this.showLogout(false) },
                                React.createElement(icons_1.IconClose, { width: "24", height: "24" })))),
                    React.createElement("div", { className: "header_links" },
                        React.createElement("div", { className: "header_links_content" },
                            React.createElement("span", { className: "header_links_link" },
                                React.createElement(icons_1.IconDocs, { width: "24", height: "24" }),
                                React.createElement("span", null, "Docs")),
                            React.createElement("div", { className: "header_links_drop" },
                                React.createElement("ul", { className: "header_links_list" },
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "header_links_list_link", href: "/docs/proxy_sdk_android.html", target: "_blank" }, "Proxy SDK for Android")),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "header_links_list_link", href: "/docs/proxy_sdk_ios.html", target: "_blank" }, "Proxy SDK for iOS")),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "header_links_list_link", href: "/docs/vpn_sdk_android_openvpn.html", target: "_blank" }, "VPN SDK for Android (OpenVPN)")),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "header_links_list_link", href: "/docs/vpn_sdk_ios_ipsec.html", target: "_blank" }, "VPN SDK for iOS (IPsec)")),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "header_links_list_link", href: "http://backend.northghost.com/doc/partner/index.html", target: "_blank" }, "Partner API")),
                                    React.createElement("li", null,
                                        React.createElement("a", { className: "header_links_list_link", href: "https://backend.northghost.com/doc/user/index.html", target: "_blank" }, "User API"))))),
                        React.createElement("div", { className: "header_links_content" },
                            React.createElement("a", { className: "header_links_link", href: "mailto:platformpartners@anchorfree.com" },
                                React.createElement(icons_1.IconQuestion, { width: "24", height: "24" }),
                                React.createElement("span", null, "Help"))))),
                React.createElement("div", { className: "header_toolbar" }, this.props.children))));
    }
}
exports.default = DashboardHeader;
//# sourceMappingURL=dashboardHeader.js.map