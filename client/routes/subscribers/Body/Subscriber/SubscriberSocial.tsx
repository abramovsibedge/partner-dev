import * as React from 'react';

interface Parent {

}

interface State {

};

class SubscriberSocial extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div>SubscriberSocial</div>
		);
	}
}

export default SubscriberSocial;