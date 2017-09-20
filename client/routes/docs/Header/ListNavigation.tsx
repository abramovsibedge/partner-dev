import * as React from 'react';

import Signal from '../../../functions/Signal';

interface Parent {
	filters: any
}

interface State {
	filters: any,
	activeFilteres: any,
	showFilters: boolean
}

class ListNavigation extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			filters: props.filters,
			activeFilteres: {
				type: 'quickstart',
				product: 'all',
				platform: 'all',
				protocol: 'all'
			},
			showFilters: false
		}
	}

	componentWillReceiveProps(props: any) {
		this.setState({
			filters: props.filters
		});
	}

	changeFilter(key: string, value: string) {
		let activeFilteres = this.state.activeFilteres;
		activeFilteres[key] = value;

		this.setState({activeFilteres});
		Signal.dispatch('activeFiltersChanged', activeFilteres);
	}

	isActiveType(type: string) {
		if(this.state.activeFilteres.type === type) return ' active';
		return '';
	}

	render() {
		return (
			<div className="navigation">
				<div className="title">DOCS</div>
				<div className="types">
					<div className={'quickstart'+this.isActiveType('quickstart')} onClick={() => this.changeFilter('type', 'quickstart')}>Quickstart</div>
					<div className={'api'+this.isActiveType('api')} onClick={() => this.changeFilter('type', 'api')}>API References</div>
					<div className={'sdk'+this.isActiveType('sdk')} onClick={() => this.changeFilter('type', 'sdk')}>SDKs</div>
				</div>
				<div className="icons">
					<div className={'filters' + (this.state.showFilters?' active':'')} onClick={() => this.setState({showFilters: !this.state.showFilters})} />
				</div>
				<div className={'filtersList' + (this.state.showFilters?' active':'')}>
					<div className="filter">
						<div className="filterTitle">Product</div>
						{this.renderFilter(this.state.filters.products, 'product')}
					</div>
					<div className="filter">
						<div className="filterTitle">Platform</div>
						{this.renderFilter(this.state.filters.platforms, 'platform')}
					</div>
					<div className="filter">
						<div className="filterTitle">Protocol</div>
						{this.renderFilter(this.state.filters.protocols, 'protocol')}
					</div>
					<div className={'clear'} />
				</div>
			</div>
		);
	}

	renderFilter(elements: any, activeElement: string) {
		let active = this.state.activeFilteres[activeElement];
		let result = [];

		result.push(
			<div key="all" className={'filterElement'+(active==='all'?' active':'')} onClick={() => this.changeFilter(activeElement, 'all')}>ALL</div>
		);

		for(let k in elements) {
			result.push(
				<div key={elements[k]} className={'filterElement'+(active===elements[k]?' active':'')} onClick={() => this.changeFilter(activeElement, elements[k])}>{elements[k]}</div>
			);
		}

		result.push(
			<div key='clear' className={'clear'} />
		);

		return result;
	}
}

export default ListNavigation;