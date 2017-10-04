import * as React from 'react';
import {Link} from 'react-router';

interface Parent {
	article: any
}

interface State {
	article: any
}

class ArticleNavigation extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			article: props.article
		}
	}

	componentWillReceiveProps(props: any) {
		this.setState({
			article: props.article
		});
	}

	render() {
		if(!this.state.article.title) return <div />;

		return (
			<div className="navigation articleNavigation">
				<Link to="docs">Docs</Link>
				<span>></span>
				<Link to="docs">{this.state.article.type[0]}</Link>
				<span>></span>
				<Link to="docs">{this.state.article.title}</Link>
			</div>
		);
	}
}

export default ArticleNavigation;