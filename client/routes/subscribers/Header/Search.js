"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames");
const update = require("immutability-helper");
const Signal_1 = require("../../../functions/Signal");
const button_1 = require("../../../components/button");
const icons_1 = require("../../../components/icons");
class SearchSubscriber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: true,
            showSearchInput: false,
            value: '',
            searchType: '',
            showDrop: false
        };
    }
    showSearchForm(value) {
        this.setState(update(this.state, {
            showSearchInput: { $set: value },
            value: { $set: '' },
            showDrop: { $set: false },
            searchType: { $set: '' }
        }), () => {
            !value && Signal_1.default.dispatch('loadSubscribers', null);
        });
    }
    searchFormOnFocus(e, value) {
        value && this.setState(update(this.state, {
            showSearchInput: { $set: true },
            isFocused: { $set: true },
            showDrop: { $set: !!this.state.value }
        }));
        !value && this.setState(update(this.state, {
            showSearchInput: { $set: !!this.state.value },
            isFocused: { $set: false },
            searchType: { $set: !value && '' }
        }));
        !value && setTimeout(() => {
            !this.state.searchType && this.setState(update(this.state, {
                showDrop: { $set: false }
            }));
        }, 500);
    }
    searchInputHandler(value) {
        this.setState(update(this.state, {
            value: { $set: value },
            showDrop: { $set: true }
        }));
    }
    searchFormSubmit(e, type) {
        const searchType = {
            'userId': 'User ID',
            'username': 'User Name',
            'token': 'User Token',
            'extref': 'User Extref',
            'devices': 'Device Id'
        };
        this.setState(update(this.state, {
            searchType: { $set: searchType[type] },
            showDrop: { $set: false }
        }), () => {
            Signal_1.default.dispatch('searchSubscriber', { type, value: this.state.value });
        });
    }
    render() {
        const { showSearchInput, value, showDrop, searchType, isFocused } = this.state;
        return (React.createElement("div", { className: classNames("subscriber_filter_form", showSearchInput && "subscriber_filter_form-showed") },
            React.createElement("form", { className: "subscriber_filter_form_form", action: "#", noValidate: true },
                React.createElement(icons_1.IconSearch, { className: "subscriber_filter_form_icon", width: "24", height: "24" }),
                !showSearchInput && React.createElement(button_1.Button, { type: "button", className: "is-transparent subscriber_filter_form_btn", onClick: () => this.showSearchForm(true) },
                    React.createElement("span", null, "Search subscriber")),
                showSearchInput && isFocused && React.createElement("div", null,
                    React.createElement("input", { value: value, className: "subscriber_filter_form_input", placeholder: "Type user ID, name, token or extref", autoFocus: true, onFocus: () => this.searchFormOnFocus(event, true), onBlur: () => this.searchFormOnFocus(event, false), onChange: (e) => this.searchInputHandler(e.target.value) })),
                React.createElement(button_1.Button, { type: "button", className: "is-transparent subscriber_filter_form_reset", onClick: () => this.showSearchForm(false) },
                    React.createElement(icons_1.IconClose, { width: "24", height: "24" })),
                !isFocused && React.createElement("div", { className: "subscriber_filter_form_input", onClick: () => this.searchFormOnFocus(event, true) },
                    searchType && React.createElement("b", null,
                        searchType,
                        ":\u00A0"),
                    value),
                showDrop && React.createElement("div", { className: "subscriber_filter_drop" },
                    React.createElement("div", { className: "subscriber_filter_drop_item subscriber_filter_drop_item-active", onClick: () => this.searchFormSubmit(event, 'userId') },
                        "Search by \u00A0\u00A0",
                        React.createElement("b", null, "User ID")),
                    React.createElement("div", { className: "subscriber_filter_drop_item", onClick: () => this.searchFormSubmit(event, 'username') },
                        "Search by \u00A0\u00A0",
                        React.createElement("b", null, "User Name")),
                    React.createElement("div", { className: "subscriber_filter_drop_item", onClick: () => this.searchFormSubmit(event, 'token') },
                        "Search by \u00A0\u00A0",
                        React.createElement("b", null, "User Token")),
                    React.createElement("div", { className: "subscriber_filter_drop_item", onClick: () => this.searchFormSubmit(event, 'extref') },
                        "Search by \u00A0\u00A0",
                        React.createElement("b", null, "User Extref")),
                    React.createElement("div", { className: "subscriber_filter_drop_item", onClick: () => this.searchFormSubmit(event, 'devices') },
                        "Search by \u00A0\u00A0",
                        React.createElement("b", null, "Device Id"))))));
    }
}
exports.default = SearchSubscriber;
//# sourceMappingURL=Search.js.map