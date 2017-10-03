import * as React from 'react';

import '../../static/scss/routes/docs.scss';

import Header from './Header';
import Footer from './Footer';
import Loading from "./Loading";

import * as marked from 'marked';

import {
	getDocsList,
	getArticle
} from '../../functions/docs';

interface State {
	loaded: boolean,
	page: string,
	navigation: string,
	article: any,
	iframe: boolean
}

export class Article extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			loaded: false,
			page: '',
			navigation: '',
			article: {},
			iframe: false
		};
	}

	componentDidMount() {
		let name = window.location.href.match(/https?:\/\/[^/]+\/docs\/([a-z0-9_-]+)/);
		if(!name || !name[1]) return this.setState({loaded: true});
		getDocsList().then((docs) => {
			for(let k in docs) {
				let title = docs[k].title.replace(/[^A-Za-z0-9_-]/g, '').toLocaleLowerCase();
				if(title === name[1]) return this.loadArticle(docs[k]);
			}
		});

		return this.setState({loaded: true});
	}

	loadArticle(article: any) {
		if(article.iframe) {
			return this.setState({
				loaded: true,
				page: article.url,
				iframe: true,
				article: article
			});
		}
		getArticle(article.url).then((content: string) => {
			let [page, navigation] = this.parseContent(content)

			this.setState({
				loaded: true,
				page: page,
				navigation: navigation,
				article: article
			});
		});
	}

	parseContent(content: string) {
		marked.setOptions({
			highlight: (code:any) => {
				code = code
					.replace(/</g, '&#60;')
					.replace(/>/g, '&#62;');

				let split  = code.split("\n"),
					result = '',
					tab    = split[0].match(/^ +/)?split[0].match(/^ +/)[0]:'';

				let reg = new RegExp('^'+tab);
				let count = split.length-1;

				for(let k in split) {
					result += split[k].replace(reg, '') + (count===Number(k)?"":"\n");
				}

				return result;
			}
		});

		content = marked(content);
		let navigation = '';

		let split = content.split("\n");
		for(let k in split) {
			if(!split[k].match(/<h1[^>]*>([^<]+)<\/h1>/)) continue;

			let parsed = split[k].match(/<h1 id="([^"]+)">([^<]+)<\/h1>/);
			navigation += '<a href="#'+parsed[1]+'">' + parsed[2] + '</div>'
		}

		return [content, navigation];
	}

	render() {
		if(!this.state.loaded) {
			return (
				<div id="docs">
					<Header type="article" filters={{}}/>
					<div id="body">
						<Loading/>
					</div>
					<Footer/>
				</div>
			);
		}

		let content = [];

		if(this.state.navigation !== '') {
			content.push(<div key="articleNavigation" className="articleNavigation" dangerouslySetInnerHTML={{__html: this.state.navigation}} />);
		}

		if(this.state.iframe) {
			content.push(<iframe key="articleContent" id="articleContent" src={this.state.page} className={'articleContent iframe'}></iframe>);
		}
		else {
			content.push(<div key="articleContent" className={'articleContent'} dangerouslySetInnerHTML={{__html: this.state.page}} />);
		}

		return (
			<div id="docs">
				<Header type="article" filters={this.state.article}/>
				<div id="body">
					<div className="articlePage">
						{content}
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}