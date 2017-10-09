import * as React from 'react';

import ProjectItem from './ProjectItem';

interface Props {
	onUpdate: () => void
	projects: any
}

class Body extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const {
			projects,
			onUpdate
		} = this.props;

		return (
			<section className="layout">
				<header className="layout_head">
					<div className="layout_head_content">
						<h1 className="layout_h1">Projects</h1>
					</div>
				</header>
				<div className="layout_content projects items-block-content">
					{projects.length === 0 && <div className="projects-empty">No result for your request.</div>}

					{projects.length > 0 && projects.map((project: any, index: number) => {
						return <ProjectItem key={index} project={project} />
					})}
				</div>
			</section>
		);
	}
}

export default Body;