import * as React from 'react';
import * as DayPicker from 'react-day-picker';
import {Button} from "../../../../components/button/index";
import ReactInputMask from 'react-input-mask';

import Signal from '../../../../functions/signal';

import {
	Checkbox2 as Checkbox
} from '../../../../components/form';

import {
	IconClock,
	IconCalendar,
	IconPlay
} from '../../../../components/icons'

interface Parent {
	updateSearch: (data: any) => void,
	calendarOpened: () => void,
	devicesDropdown: boolean
}

interface State {
	days: any,
	time: any,
	currentMonth: any,
	customTime: boolean,
	show: boolean,
	devicesDropdown: boolean
}

const MS_IN_DAY = 86400000;

class Calendar extends React.Component<Parent, State> {
	updateSearch: (time: any) => void;
	defaultTime: any;
	calendarOpened: () => void

	formatChars:any = {
		'1':'[0-2]',
		'2':'[0-3]',
		'3':'[0-5]',
		'4':'[0-9]'
	};

	constructor(props: any) {
		super(props);

		let now = new Date();

		this.state = {
			days: {
				from: (now.getMonth()+1)+'/'+now.getDate()+'/'+now.getFullYear(),
				till: (now.getMonth()+1)+'/'+now.getDate()+'/'+now.getFullYear()
			},
			time: {
				from: '00:00',
				till: '23:59'
			},
			currentMonth: new Date(),
			customTime: false,
			show: false,
			devicesDropdown: false
		};

		this.updateSearch = props.updateSearch;
		this.calendarOpened = props.calendarOpened;
	}

	componentDidMount() {
		this.update()
	}

	componentWillReceiveProps(props: any) {
		if(!this.state.show) return;

		if(this.state.show && props.devicesDropdown) this.closeCalendar();
	}

	update() {
		this.defaultTime = {
			days: {
				from: this.state.days.from,
				till: this.state.days.till,
			},
			time: {
				from: this.state.time.from,
				till: this.state.time.till,
			}
		};

		this.updateSearch(
			{
				from: [(new Date(this.state.days.from + ' ' + this.state.time.from.replace(/_/g, '0')).getTime()), this.state.days.from],
				till: [(new Date(this.state.days.till + ' ' + this.state.time.till.replace(/_/g, '0')).getTime()), this.state.days.till]
			}
		);
	}

	showCalendar(state: boolean) {
		if(state) this.openCalendar();
		else this.closeCalendar();
	}

	openCalendar() {
		this.calendarOpened();

		this.defaultTime = {
			days: {
				from: this.state.days.from,
				till: this.state.days.till,
			},
			time: {
				from: this.state.time.from,
				till: this.state.time.till,
			}
		};

		this.setState({show: true});
	}

	closeCalendar() {
		this.setState({
			days: {
				from: this.defaultTime.days.from,
				till: this.defaultTime.days.till,
			},
			time:  {
				from: this.defaultTime.time.from,
				till: this.defaultTime.time.till,
			},
			show: false
		})
	}

	handleDayClick(input: string) {
		let day  = new Date(input);
		let date = (day.getMonth()+1)+'/'+day.getDate()+'/'+day.getFullYear();
		let days = this.state.days;

		let dayTs  = new Date(date).getTime()
		let fromTs = new Date(days.from).getTime();
		let tillTs = new Date(days.till).getTime();

		if(fromTs === dayTs) {
			days.till = date;
		}
		else if(tillTs === dayTs) {
			days.from = date;
		}
		else if(fromTs > dayTs) {
			days.from = date;
		}
		else {
			days.till = date;
		}

		this.setState({days: days});
	}

	renderDay(input: string) {
		let day = new Date(input),
				className = this.checkIfSelected( day );

		return (
			<div className={'custom-day'+className}>
				{day.getDate()}
			</div>
		);
	}

	checkIfSelected(day: any) {
		let ts   = new Date(day).getTime();
		let date = (day.getMonth()+1)+'/'+day.getDate()+'/'+day.getFullYear();


		let from = new Date(this.state.days.from).getTime();
		let till = new Date(this.state.days.till).getTime()+MS_IN_DAY-1;

		if(
			from > ts
			|| till < ts
		) return '';

		let className = ' selected';

		if(this.state.days.from === date)      className += ' outer first';
		else if(this.state.days.till === date) className += ' outer last';
		else {
			className += ' center';

			if(day.getDay() === 0) className += ' first';
			else if(day.getDay() === 6) className += ' last';
		}

		if( ( (till - from) / MS_IN_DAY) > 1 ) className += ' multiple';

		return className;
	}

	showToday() {
		let day = new Date();
		let date = (day.getMonth()+1)+'/'+day.getDate()+'/'+day.getFullYear();

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
				from: ((from.getMonth()+1)+'/'+from.getDate()+'/'+from.getFullYear()),
				till: ((till.getMonth()+1)+'/'+till.getDate()+'/'+till.getFullYear())
			}
		});
	}

	showThisMonth() {
		let till = new Date();
		let tillDate = (till.getMonth()+1)+'/'+till.getDate()+'/'+till.getFullYear();
		let from = new Date(tillDate);
		let fromDate = (from.getMonth()+1)+'/1/'+from.getFullYear();

		this.setState({
			days: {
				from: fromDate,
				till: tillDate
			}
		});
	}

	showYesterday() {
		let day = new Date(Date.now() - MS_IN_DAY);
		let date = (day.getMonth()+1)+'/'+day.getDate()+'/'+day.getFullYear();

		this.setState({
			days: {
				from: date,
				till: date
			}
		});
	}

	showLastWeek() {
		let today = new Date();
		let till = new Date(today.getTime() - (today.getDay()+1) * MS_IN_DAY);
		let tillTs = till.getTime();
		let fromTs = tillTs - (6 * MS_IN_DAY);
		let from = new Date(fromTs);

		this.setState({
			days: {
				from: ((from.getMonth()+1)+'/'+from.getDate()+'/'+from.getFullYear()),
				till: ((till.getMonth()+1)+'/'+till.getDate()+'/'+till.getFullYear())
			}
		});
	}

	showLastMonth() {
		let today = new Date();
		let till = new Date(today.getTime() - today.getDate() * MS_IN_DAY);

		this.setState({
			days: {
				from: ((till.getMonth()+1)+'/1/'+till.getFullYear()),
				till: ((till.getMonth()+1)+'/'+till.getDate()+'/'+till.getFullYear())
			},
			currentMonth: new Date((till.getMonth()+1)+'/1/'+till.getFullYear())
		});
	}

	inputHandler(value: string, source: string) {
		let newState = this.state.time;
		newState[source] = value;

		this.setState({
			time: newState
		});
	}

	render() {
		return (
			<div className="session_button_container">
				<Button type="button" className={'calendar_button'+(this.state.show?' opened':'')} onClick={() => this.showCalendar(!this.state.show)}>
					<IconCalendar width="24" height="24" />
					<div className="calendar_date from">
						<div className="date">{this.state.days.from}</div>
						<div className="time">{this.state.time.from.replace(/_/g, '0')}</div>
					</div>
					<div className="calendar_separator" />
					<div className="calendar_date to">
						<div className="date">{this.state.days.till}</div>
						<div className="time">{this.state.time.till.replace(/_/g, '0')}</div>
					</div>
					<div className="arrow"><IconPlay width="24" height="24" /></div>
				</Button>

				<div className={'calendar_dropdown'+(this.state.show?' opened':'')}>
					<DayPicker
						onDayClick={this.handleDayClick.bind(this)}
						numberOfMonths={2}
						renderDay={this.renderDay.bind(this)}
						month={this.state.currentMonth}
						fixedWeeks
					/>
					<div className="DayPicker-delimiter" />
					<div className="calendar_dropdown_options">
						<div className="calendar_dropdown_row">
							<div className="calendar_dropdown_item item1 not_allowed">
								<Checkbox
									className="subscriber_edit_checkbox"
									checked={false}
									label="Active sessions"
									onChange={() => {}}>&nbsp;</Checkbox>
							</div>
							<div className="calendar_dropdown_item item2">
								<span onClick={() => this.showToday()}>Today</span>
							</div>
							<div className="calendar_dropdown_item item3">
								<span onClick={() => this.showThisWeek()}>This week</span>
							</div>

							<div className="calendar_dropdown_item item4">
								<span onClick={() => this.showThisMonth()}>This month</span>
							</div>
						</div>
						<div className="calendar_dropdown_row">
							<div className="calendar_dropdown_item item1">
								<Checkbox
									className="subscriber_edit_checkbox"
									checked={this.state.customTime}
									label="Specific time range"
									onChange={() => this.setState({customTime: !this.state.customTime})}>&nbsp;</Checkbox>
							</div>
							<div className="calendar_dropdown_item item2">
								<span onClick={() => this.showYesterday()}>Yesterday</span>
							</div>
							<div className="calendar_dropdown_item item3">
								<span onClick={() => this.showLastWeek()}>Last week</span>
							</div>
							<div className="calendar_dropdown_item item4">
								<span onClick={() => this.showLastMonth()}>Last month</span>
							</div>
						</div>
					</div>

					<div className={'calendar_dropdown_custom_time'+(this.state.customTime?' opened':'')}>
						<Button type="button" className={'calendar_button small time_button'} onClick={() => {}}>
							<IconClock width="24" height="24" />
							<div className="input">
								<ReactInputMask
									mask="12:34"
									maskChar="_"
									value={this.state.time.from}
									onChange={(e) => this.inputHandler(e.target.value, 'from')}
									formatChars={this.formatChars}
									className="input_input"
								/>
								<label className="input_label">Start time (24 hours)</label>
							</div>
						</Button>
						<Button type="button" className={'calendar_button small time_button'} onClick={() => {}}>
							<IconClock width="24" height="24" />
							<div className="input">
								<ReactInputMask
									mask="12:34"
									maskChar="_"
									value={this.state.time.till}
									onChange={(e) => this.inputHandler(e.target.value, 'till')}
									formatChars={this.formatChars}
									className="input_input"
								/>
								<label className="input_label">End time (24 hours)</label>
							</div>
						</Button>
					</div>
					<div className="modal_footer">
						<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.showCalendar(!this.state.show)}>Cancel</button>
						<button className="modal_btn modal_btn-submit update_search"  onClick={() => {this.update(); this.closeCalendar();}}>Search</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Calendar;