import * as React from 'react';

interface Parent {

}

interface State {

};

class SubscriberDevices extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div>SubscriberDevices</div>
		);
	}
}

export default SubscriberDevices;