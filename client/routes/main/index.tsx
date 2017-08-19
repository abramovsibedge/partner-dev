import * as React from 'react';
import * as classnames from 'classnames/bind';

const s = require('../../static/scss/main.scss');
const cx = classnames.bind(s);

export class Main extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = {
			test: false
		}
	}

	showTets() {
		this.setState({test: !this.state['test']});
	}

	render() {
		const test = this.state['test'];

		let testBlock = (<div></div>);

		if (test) {
			testBlock = (<div className="test">bla bla</div>);
		}

		return (
			<div>
				<div className={cx('testableModuleClassName')} onClick={()=>this.showTets()}>show test</div>
				{testBlock}
				Main
			</div>
		);
	}
}