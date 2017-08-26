import * as React from 'react';

import User from './User';
import AddSubscriber from './AddSubscriber';

import Signal from '../../../functions/Signal';

interface Parent {
	loaded: boolean
}

interface State {
	loaded: boolean,
}

export default class Header extends React.Component <Parent, State>{
	signal: any;

	constructor(props: any) {
		super(props);

		this.state = {
			loaded: props.loaded,
		};
	}

	componentDidMount() {
		Signal.attach('loaded', (loaded: boolean) => {
			this.setState({loaded: loaded});
		});
	}

	render() {
		let content = [
			<User key="content" />
		];

		if(this.state.loaded) content.push(<AddSubscriber key="AddSubscriber"/>)

		return (
			<header className='header'>
				<div className="header_content">
					{content}
				</div>
			</header>
		);
	}
}