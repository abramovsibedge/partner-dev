import * as React from 'react';

import '../../static/scss/routes/docs.scss';

import Header from './Header';
import Footer from './Footer';
import Loading from "./Loading";

import {
	getDocsList,
	getArticle
} from '../../functions/docs';

interface State {
	loaded: boolean,
	page: string,
	navigation: string,
	article: any
}

export class Article extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			loaded: false,
			page: '',
			navigation: '',
			article: {}
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
		let parseRow = (row:string) => {
			return (
				row
					.replace(/</g, '&#60;')
					.replace(/>/g, '&#62;')
					.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
					.replace(/\*\*([^*]+)\*\*/g, '<span class="bold">$1</span>')
					.replace(/\*([^*]+)\*/g, '<span class="italic">$1</span>')
					.replace(/`([^`]+)`/g, '<span class="highlight">$1</span>')
			);
		}

		let split = content.split("\n")

		let page       = '';
		let navigation = '';

		let code        = false;
		let codeTab     = '';
		let codeRow     = 0;
		let codeNumbers = '';

		for(let k in split) {
			let row = parseRow(split[k].replace(/\s/g, ' '));

			if(row.match(/^###/)) {
				page += '<h3>' + row.replace(/^###[ ]+/, '') + '</h3>\n';
			}
			else if(row.match(/^##/)) {
				page += '<h2>' + row.replace(/^##[ ]+/, '') + '</h2>\n';
			}
			else if(row.match(/^#/)) {
				let text = row.replace(/^#[ ]+/, '');
				let anchor = text.replace(/[^A-Za-z]/g, '');
				page += '<h1 id="'+anchor+'">' + text + '</h1>\n';
				navigation += '<a href="#'+anchor+'">' + text + '</div>'
			}
			else if(row.match(/^```/) && !code) {
				code        = true;
				codeTab     = '';
				codeRow     = 0;
				page       += '<div class="code"><pre>\n';
				codeNumbers = '<div class="numbers">';
			}
			else if(row.match(/^```/) && code) {
				code         = false;
				codeNumbers += '</div>';
				page        += '</pre>'+codeNumbers+'</div>\n';
			}
			else if(code) {
				codeRow ++;
				if(codeRow === 1) {
					codeTab = row.match(/([ ]+)/g)?row.match(/([ ]+)/g)[0]:'';
				}
				let reg = new RegExp('^'+codeTab);
				page += row.replace(reg, '') + '\n';
				codeNumbers += '<div>' + codeRow + '</div>';
			}
			else if(row.match(/^-[ ]+/)) {
				page += '<div class="dot"><span>&#8226;</span>'+row.replace(/^-[ ]+/, '') + '</div>\n';
			}
			else if(row.match(/^[ ]*$/)) {
				page += '<div class="br"></div>\n';
			}
			else {
				page += '<div>' + row + '</div>\n';
			}
		}

		return [page, navigation];
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

		return (
			<div id="docs">
				<Header type="article" filters={this.state.article}/>
				<div id="body">
					<div className="articlePage">
						<div className="articleNavigation" dangerouslySetInnerHTML={{__html: this.state.navigation}} />
						<div className="articleContent" dangerouslySetInnerHTML={{__html: this.state.page}} />
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}