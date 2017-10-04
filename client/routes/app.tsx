import * as React from 'react';
import * as update from 'immutability-helper';
import * as classNames from 'classnames';

interface State {
	isScrolled: boolean
}

export class App extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			isScrolled: false
		}
	}

	componentDidMount() {
		window && window.addEventListener('scroll', this.contentIsScrolled);
	}

	contentIsScrolled = () => {
		let {isScrolled} = this.state;

		window && window.scrollY > 20 ?
			!isScrolled && this.setState(update(this.state, {
				isScrolled: {$set: true}
			}))
			:
			isScrolled && this.setState(update(this.state, {
				isScrolled: {$set: false}
			}));
	};

	render() {
		const { isScrolled } = this.state;

		return (
			<div className={classNames('content', isScrolled && 'content-scrolled')}>
				{this.props.children}
			</div>
		);
	}
}