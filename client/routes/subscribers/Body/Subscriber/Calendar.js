"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DayPicker = require("react-day-picker");
const index_1 = require("../../../../components/button/index");
const form_1 = require("../../../../components/form");
const icons_1 = require("../../../../components/icons");
const MS_IN_DAY = 86400000;
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        let now = new Date();
        this.state = {
            days: {
                from: (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear(),
                till: (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear()
            },
            time: {
                from: '00:00',
                till: '23:59'
            },
            currentMonth: new Date(),
            customTime: false,
            show: false
        };
    }
    handleDayClick(input) {
        let day = new Date(input);
        let date = (day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear();
        let days = this.state.days;
        let dayTs = new Date(date).getTime();
        let fromTs = new Date(days.from).getTime();
        let tillTs = new Date(days.till).getTime();
        if (fromTs === dayTs) {
            days.till = date;
        }
        else if (tillTs === dayTs) {
            days.from = date;
        }
        else if (fromTs > dayTs) {
            days.from = date;
        }
        else {
            days.till = date;
        }
        this.setState({ days: days });
    }
    getCurrentWeek() {
    }
    renderDay(input) {
        let day = new Date(input), className = this.checkIfSelected(day);
        return (React.createElement("div", { className: 'custom-day' + className }, day.getDate()));
    }
    checkIfSelected(day) {
        let ts = new Date(day).getTime();
        let date = (day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear();
        let from = new Date(this.state.days.from + ' ' + this.state.time.from.replace('_', '0')).getTime();
        let till = new Date(this.state.days.till + ' ' + this.state.time.till.replace('_', '0')).getTime();
        if (from > ts
            || till < ts)
            return '';
        let className = ' selected';
        if (this.state.days.from === date)
            className += ' outer first';
        else if (this.state.days.till === date)
            className += ' outer last';
        else {
            className += ' center';
            if (day.getDay() === 0)
                className += ' first';
            else if (day.getDay() === 6)
                className += ' last';
        }
        if (((till - from) / MS_IN_DAY) > 1)
            className += ' multiple';
        return className;
    }
    showToday() {
        let day = new Date();
        let date = (day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear();
        this.setState({
            days: {
                from: date,
                till: date
            }
        });
    }
    showThisWeek() {
        let till = new Date();
        let tillTs = till.getTime();
        let fromTs = tillTs - (till.getDay() * MS_IN_DAY);
        let from = new Date(fromTs);
        this.setState({
            days: {
                from: ((from.getMonth() + 1) + '/' + from.getDate() + '/' + from.getFullYear()),
                till: ((till.getMonth() + 1) + '/' + till.getDate() + '/' + till.getFullYear())
            }
        });
    }
    showThisMonth() {
        let till = new Date();
        let tillDate = (till.getMonth() + 1) + '/' + till.getDate() + '/' + till.getFullYear();
        let from = new Date(tillDate);
        let fromDate = (from.getMonth() + 1) + '/1/' + from.getFullYear();
        this.setState({
            days: {
                from: fromDate,
                till: tillDate
            }
        });
    }
    showYesterday() {
        let day = new Date(Date.now() - MS_IN_DAY);
        let date = (day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear();
        this.setState({
            days: {
                from: date,
                till: date
            }
        });
    }
    showLastWeek() {
        let today = new Date();
        let till = new Date(today.getTime() - (today.getDay() + 1) * MS_IN_DAY);
        let tillTs = till.getTime();
        let fromTs = tillTs - (6 * MS_IN_DAY);
        let from = new Date(fromTs);
        this.setState({
            days: {
                from: ((from.getMonth() + 1) + '/' + from.getDate() + '/' + from.getFullYear()),
                till: ((till.getMonth() + 1) + '/' + till.getDate() + '/' + till.getFullYear())
            }
        });
    }
    showLastMonth() {
        let today = new Date();
        let till = new Date(today.getTime() - today.getDate() * MS_IN_DAY);
        this.setState({
            days: {
                from: ((till.getMonth() + 1) + '/1/' + till.getFullYear()),
                till: ((till.getMonth() + 1) + '/' + till.getDate() + '/' + till.getFullYear())
            },
            currentMonth: new Date((till.getMonth() + 1) + '/1/' + till.getFullYear())
        });
    }
    inputHandler(value, source) {
    }
    render() {
        return (React.createElement("div", { id: "calendar" },
            React.createElement(index_1.Button, { type: "button", className: 'calendar_button' + (this.state.show ? ' opened' : ''), onClick: () => { this.setState({ show: !this.state.show }); } },
                React.createElement(icons_1.IconCalendar, { width: "24", height: "24" }),
                React.createElement("div", { className: "calendar_date from" },
                    React.createElement("div", { className: "date" }, this.state.days.from),
                    React.createElement("div", { className: "time" }, this.state.time.from)),
                React.createElement("div", { className: "calendar_separator" }),
                React.createElement("div", { className: "calendar_date to" },
                    React.createElement("div", { className: "date" }, this.state.days.till),
                    React.createElement("div", { className: "time" }, this.state.time.till)),
                React.createElement("div", { className: "arrow" },
                    React.createElement(icons_1.IconPlay, { width: "24", height: "24" }))),
            React.createElement("div", { className: 'calendar_dropdown' + (this.state.show ? ' opened' : '') },
                React.createElement(DayPicker, { onDayClick: this.handleDayClick.bind(this), numberOfMonths: 2, renderDay: this.renderDay.bind(this), month: this.state.currentMonth, fixedWeeks: true }),
                React.createElement("div", { className: "DayPicker-delimiter" }),
                React.createElement("div", { className: "calendar_dropdown_options" },
                    React.createElement("div", { className: "calendar_dropdown_row" },
                        React.createElement("div", { className: "calendar_dropdown_item item1 not_allowed" },
                            React.createElement(form_1.Checkbox2, { className: "subscriber_edit_checkbox", checked: false, label: "Active sessions", onChange: () => { } }, "\u00A0")),
                        React.createElement("div", { className: "calendar_dropdown_item item2" },
                            React.createElement("span", { onClick: () => this.showToday() }, "Today")),
                        React.createElement("div", { className: "calendar_dropdown_item item3" },
                            React.createElement("span", { onClick: () => this.showThisWeek() }, "This week")),
                        React.createElement("div", { className: "calendar_dropdown_item item4" },
                            React.createElement("span", { onClick: () => this.showThisMonth() }, "This month"))),
                    React.createElement("div", { className: "calendar_dropdown_row" },
                        React.createElement("div", { className: "calendar_dropdown_item item1" },
                            React.createElement(form_1.Checkbox2, { className: "subscriber_edit_checkbox", checked: this.state.customTime, label: "Specific time range", onChange: () => this.setState({ customTime: !this.state.customTime }) }, "\u00A0")),
                        React.createElement("div", { className: "calendar_dropdown_item item2" },
                            React.createElement("span", { onClick: () => this.showYesterday() }, "Yesterday")),
                        React.createElement("div", { className: "calendar_dropdown_item item3" },
                            React.createElement("span", { onClick: () => this.showLastWeek() }, "Last week")),
                        React.createElement("div", { className: "calendar_dropdown_item item4" },
                            React.createElement("span", { onClick: () => this.showLastMonth() }, "Last month")))),
                React.createElement("div", { className: 'calendar_dropdown_custom_time' + (this.state.customTime ? ' opened' : '') },
                    React.createElement(index_1.Button, { type: "button", className: 'calendar_button small time_button', onClick: () => { } },
                        React.createElement(icons_1.IconClock, { width: "24", height: "24" }),
                        React.createElement(form_1.Input, { type: "input", label: "Start time (24 hours)", value: this.state.time.from, notValid: false, onChange: (e) => this.inputHandler(e.target.value, 'from') })),
                    React.createElement(index_1.Button, { type: "button", className: 'calendar_button small time_button', onClick: () => { } },
                        React.createElement(icons_1.IconClock, { width: "24", height: "24" }),
                        React.createElement(form_1.Input, { type: "input", label: "End time (24 hours)", value: this.state.time.till, notValid: false, onChange: (e) => this.inputHandler(e.target.value, 'till') }))))));
    }
}
exports.default = Calendar;
//# sourceMappingURL=Calendar.js.map