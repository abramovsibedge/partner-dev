import * as React from 'react';

import Calendar from "./Calendar";

interface Parent {

}

interface State {

}

class SubscriberSessions extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);

		this.state = {

		};
	}

	render() {
		return (
			<div className="subscriber_body_content">
				<div className="session_filter">
					<Calendar/>
				</div>
			</div>
		);
	}
}

export default SubscriberSessions;