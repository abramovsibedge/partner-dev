import * as React from 'react';

import ProjectsSelector from '../Body/ProjectsSelector';
import SubscribersList from '../Body/SubscribersList';

class Body extends React.Component<{}, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<section className="layout">
				<header className="layout_head">
					<div className="layout_head_content">
						<h1 className="layout_h1">
							Subscribers
						</h1>
						<ProjectsSelector />
					</div>
				</header>
				<SubscribersList />
			</section>
		);
	}
}

export default Body;