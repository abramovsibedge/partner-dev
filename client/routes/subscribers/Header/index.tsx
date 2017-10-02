import * as React from 'react';

import AddSubscriber from './AddSubscriber';
import SearchSubscriber from './Search';

export default class Header extends React.Component <{}, {}> {
	render() {
		return (
			<div className="subscriber_filter">
				<SearchSubscriber />
				<AddSubscriber />
			</div>
		);
	}
}