import * as React from 'react';
import {Link} from 'react-router';

import { logOut, checkAuth } from '../../../utils';
import {
	IconDocs,
	IconQuestion
} from '../../../components/icons'

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
			isSigned: checkAuth(),
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
					<Link className="logo_link" to="/">
						<img className="logo_img" src={require('../../../static/media/poweredbyhss_light.svg')} alt="Partners Portal Logo" width="auto" height="50"/>
					</Link>
					<ul className="menu">
						<li className="menu_item docslink">
							<Link className="menu_link" to="/docs">
								<IconDocs width="24" height="24"/>
								<span>Docs</span>
							</Link>
						</li>
						<li className="menu_item">
							<Link className="menu_link" to="mailto:platformpartners@anchorfree.com">
								<IconQuestion width="17" height="17" />
								<span>Help</span>
							</Link>
						</li>
					</ul>
					{!this.state.isSigned && <ul className="auth">
						<li className="auth_item"><Link className="auth_link auth_link-active" to="/auth/signup">Sign up</Link></li>
						<li className="auth_item"><Link className="auth_link" to="/auth/signin">Sign in</Link></li>
					</ul>}
					{this.state.isSigned && <ul className="auth">
						<li className="auth_item"><Link className="auth_link auth_link-active" to="/projects">Dashboard</Link></li>
						<li className="auth_item"><span className="auth_link" onClick={logOut}>Logout</span></li>
					</ul>}
				</div>
				{this.state.filters.length === 0
					? <div />
					: (this.state.type === 'list' ? <ListNavigation filters={this.state.filters} /> : <ArticleNavigation article={this.state.filters}/>)}
			</div>
		);
	}
}

export default Header;