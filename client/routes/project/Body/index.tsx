import * as React from 'react';

interface Props {
  project: object
}

interface State {
}

class Body extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
		}
	}

	render() {
		const {
			project
		} = this.props;
		console.log('project', project);

		return (
			<section className="layout">
				<header className="layout_head">
					<div className="layout_head_content">
						<h1 className="layout_h1">Project</h1>
					</div>
				</header>

			</section>
		);
	}
}

export default Body;