import * as React from 'react';
import * as classNames from 'classnames';

import '../../static/scss/components/switcher.scss';

interface Props {
	current: string
}

export default class Switcher extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const {
			current
		} = this.props;

		return (
			<ul className="menubox">
				<li className={classNames("menubox_item", current === "projects" && "menubox_item-active")}>
					<a href="/projects" className="menubox_link">
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20"><path d="M16 2h-4.18C11.4.84 10.3 0 9 0 7.7 0 6.6.84 6.18 2H2C.9 2 0 2.9 0 4v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H4v-2h7v2zm3-4H4v-2h10v2zm0-4H4V6h10v2z"/></svg>
							<span>Projects</span>
						</span>
					</a>
				</li>
				<li className={classNames("menubox_item", current === "subscribers" && "menubox_item-active")}>
					<a href="/subscribers" className="menubox_link">
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M0 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2a2 2 0 0 0-2 2zm12 4c0 1.66-1.34 3-3 3S6 7.66 6 6s1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H3v-1z"/></svg>
							<span>Subscribers</span>
						</span>
					</a>
				</li>
			</ul>
		);
	}
}