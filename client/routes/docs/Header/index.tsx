import * as React from 'react';

import {
	logOut
} from '../../../functions/auth';
import {
	IconDocs,
	IconQuestion
} from '../../../components/icons'

import {check} from '../../../../client/functions/auth';

import ListNavigation from './ListNavigation';
import ArticleNavigation from './ArticleNavigation';

interface Parent {
	type: string,
	filters: any
}

interface State {
	type: string,
	isSigned: any,
	filters: any
}

class Header extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			isSigned: check(),
			type: props.type,
			filters: props.filters
		}
	}

	componentWillReceiveProps(props: any) {
		this.setState({
			filters: props.filters
		})
	}

	render() {
		return (
			<div id="header">
				<div className="front_header_top">
					<a className="logo_link" href="/">
						<img className="logo_img" src={require('../../../static/media/poweredbyhss_light.svg')} alt="Partners Portal Logo" width="auto" height="50"/>
					</a>
					<ul className="menu">
						<li className="menu_item docslink">
							<a href="/docs" className="menu_link">
								<IconDocs width="24" height="24"/>
								<span>Docs</span>
							</a>
						</li>
						<li className="menu_item">
							<a className="menu_link" href="mailto:platformpartners@anchorfree.com">
								<IconQuestion width="17" height="17" />
								<span>Help</span>
							</a>
						</li>
					</ul>
					{!this.state.isSigned && <ul className="auth">
						<li className="auth_item"><a className="auth_link auth_link-active" href="/auth/signup">Sign up</a></li>
						<li className="auth_item"><a className="auth_link" href="/auth/signin">Sign in</a></li>
					</ul>}
					{this.state.isSigned && <ul className="auth">
						<li className="auth_item"><a className="auth_link auth_link-active" href="/projects">Dashboard</a></li>
						<li className="auth_item"><a className="auth_link" href="#" onClick={logOut}>Logout</a></li>
					</ul>}
				</div>
				{
					(this.state.filters.length === 0)
						? <div />
						: (this.state.type === 'list' ? <ListNavigation filters={this.state.filters} /> : <ArticleNavigation article={this.state.filters}/>)
				}
			</div>
		);
	}
}

export default Header;