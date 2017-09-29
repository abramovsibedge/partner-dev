import * as React from 'react';

import '../../static/scss/routes/docs.scss';

import Signal from '../../functions/Signal';

import Header from './Header';
import Footer from './Footer';
import Loading from "./Loading";

import {
	getDocsList
} from '../../functions/docs';

interface State {
	filters: any,
	articles: any,
	loaded: boolean,
	activeFilters: any
}

export class List extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			filters: {},
			articles: [],
			loaded: false,
			activeFilters: {
				type: 'quickstart',
				product: 'all',
				platform: 'all',
				protocol: 'all'
			}
		};

		new Signal('activeFiltersChanged');
	}

	componentDidMount() {
		getDocsList().then((docs) => {
			let protocols:any = [],
					platforms:any = [],
					products:any  = [],
					articles:any  = [],
					types:any     = [];

			for(let k in docs) {
				articles.push(docs[k]);

				types     = this.fillArray(types, docs[k].type);
				products  = this.fillArray(products,  docs[k].product);
				protocols = this.fillArray(protocols, docs[k].protocol);
				platforms = this.fillArray(platforms, docs[k].platform);
			}

			this.setState({
				filters: {
					types: types,
					products: products,
					protocols: protocols,
					platforms: platforms
				},
				articles: articles,
				loaded: true
			});
		});

		Signal.attach('activeFiltersChanged', (activeFilters:any) => {
			this.setState({
				activeFilters: activeFilters
			})
		});
	}

	fillArray(result:any, resource:any) {
		for(let k in resource) {
			if(result.indexOf(resource[k]) !== -1) continue;

			result.push(resource[k]);
		}

		return result;
	}

	openArticle(article: any) {
		/*if(article.href && article.href === "true") {
			return window.open(article.url);
		}*/

		let title = article.title.replace(/[^A-Za-z0-9_-]/g, '').toLocaleLowerCase();

		window.location.href = '/docs/'+title;
	}

	render() {
		if(!this.state.loaded) {
			return (
				<div id="docs">
					<Header type="list" filters={this.state.filters}/>
					<div id="body">
						<Loading/>
					</div>
					<Footer/>
				</div>
			);
		}

		let articles:any = [];

		for(let k in this.state.articles) {
			let article = this.state.articles[k],
					filters = this.state.activeFilters;

			if(article.type.indexOf(filters.type) === -1) continue;
			if(filters.product  !== 'all' && article.product.indexOf(filters.product) === -1) continue;
			if(filters.platform !== 'all' && article.platform.indexOf(filters.platform) === -1) continue;
			if(filters.protocol !== 'all' && article.protocol.indexOf(filters.protocol) === -1) continue;

			let protocols:any = [];
			for(let i in article.protocol) {
				protocols.push(
					<div key={'protocol'+i}>
						{article.protocol[i]} >
					</div>
				);
			}

			articles.push(
				<div className="article" key={k} onClick={() => this.openArticle(article)}>
					<div className="articleTitle">{article.title}</div>
					<div className="articleDescription">{article.description}</div>
					<div className="articleProtocol">{protocols}</div>
				</div>
			);
		}

		return (
			<div id="docs">
				<Header type="list" filters={this.state.filters}/>
				<div id="body">
					<div className="articlesList">
						{articles.length > 0 ? articles : <div className="article empty">No articles</div>}
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}