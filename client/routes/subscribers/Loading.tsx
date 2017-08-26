import * as React from 'react';
import Spinner from '../../components/spinner';

class Loading extends React.Component {
	render() {
		return (
			<section className="layout is-loading">
				<Spinner width="65" height="65" strokeWidth="6"/>
			</section>
		);
	}
}

export default Loading;