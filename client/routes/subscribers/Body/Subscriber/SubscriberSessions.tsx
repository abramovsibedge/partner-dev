import * as React from 'react';
import {Button} from "../../../../components/button/index";
import * as DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
	IconCalendar,
} from '../../../../components/icons'

interface Parent {


}

interface State {

};

class SubscriberSessions extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);

		console.log('here')
	}

	showModal(state: boolean) {

	}

	render() {
		/*let el = [
			<DatePicker
				selected="02/08/2014"
				onChange={() => {}}
				showYearDropdownreturn ;
				monthsShown={2}
			/>
		];*/

		//console.log(el)

		return (
			<div className="subscriber_body_content">
				<div className="session_filter">
					<div className="calendar">
						<DayPicker numberOfMonths={2} fixedWeeks />
					</div>
				</div>
			</div>
		);
	}
}

export default SubscriberSessions;