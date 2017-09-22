import * as React from 'react';

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
				<a href="/docs">Docs</a> > <a href="/docs">{this.state.article.type[0]}</a> > <a href="/docs">{this.state.article.title}</a>
			</div>
		);
	}
}

export default ArticleNavigation;