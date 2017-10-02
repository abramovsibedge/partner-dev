import * as React from 'react';
import Modal from 'react-modal';
import * as update from 'immutability-helper';
import {storageHelper} from '../../utils';
import {Link} from 'react-router';

const storage = new storageHelper;

import {
	IconClose,
	IconDocs,
	IconQuestion
} from '../../components/icons'
import { Button } from '../button';

interface State {
	logoutModalState: boolean,
	username: string
}

class DashboardHeader extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			logoutModalState: false,
			username: (storage.get('username')) ? storage.get('username') : 'user'
		}
	}

	showLogout(value: boolean) {
		this.setState(update(this.state, {
			logoutModalState: {$set: value},
		}));
	}

	logOut = () => firebase.auth().signOut().then(() => {
		storage.remove('firebase');
		storage.remove('rest');
		storage.remove('username');
		window.location.replace("#/auth/signin");
	});

	render() {
		const {
			logoutModalState,
			username
		} = this.state;

		return (
			<header className='header'>
				<div className="header_content">
					<div className="header_user">
						<div className="header_logo">
							<a href="/">
								<img className="header_logo_img" src={require('../../static/media/poweredbyhss_light.svg')} alt="Partners Portal Logo" width="auto" height="24"/>
							</a>
						</div>
						<div className="header_logout">
							Hello {username}! <span className="header_logout_link" onClick={() => this.showLogout(true)}>Logout</span>
							<Modal
								isOpen={logoutModalState}
								className={{base: 'modal_inner'}}
								overlayClassName={{base: 'modal_outer'}}
								contentLabel="test">
								<div className="modal_header">
									<h2>Logout</h2>
								</div>
								<div className="modal_content is-text-center">Do you really want to logout?</div>
								<div className="modal_footer">
									<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.showLogout(false)}>
										Cancel
									</button>
									<button className="modal_btn modal_btn-submit" type="button" onClick={() => this.logOut()}>
										Logout
									</button>
								</div>
								<Button type="button" className="modal_close" onClick={() => this.showLogout(false)}>
									<IconClose width="24" height="24"/>
								</Button>
							</Modal>
						</div>
						<div className="header_links">
							<div className="header_links_content">
								<span className="header_links_link">
									<IconDocs width="24" height="24"/>
									<span>Docs</span>
								</span>
								<div className="header_links_drop">
									<ul className="header_links_list">
										<li>
											<Link className="header_links_list_link" to="/docs/proxy_sdk_android">Proxy
												SDK for Android</Link></li>
										<li>
											<Link className="header_links_list_link" to="/docs/proxy_sdk_ios">Proxy
												SDK for iOS</Link></li>
										<li>
											<Link className="header_links_list_link" to="/docs/vpn_sdk_android_openvpn">VPN SDK for Android (OpenVPN)</Link></li>
										<li>
											<Link className="header_links_list_link" to="/docs/vpn_sdk_ios_ipsec">VPN
												SDK for iOS (IPsec)</Link></li>
										<li>
											<a className="header_links_list_link" href="http://backend.northghost.com/doc/partner/index.html" target="_blank">Partner API</a></li>
										<li>
											<a className="header_links_list_link" href="https://backend.northghost.com/doc/user/index.html" target="_blank">User API</a></li>
									</ul>
								</div>
							</div>
							<div className="header_links_content">
								<a className="header_links_link" href="mailto:platformpartners@anchorfree.com">
									<IconQuestion width="24" height="24"/>
									<span>Help</span>
								</a>
							</div>
						</div>
					</div>
					<div className="header_toolbar">
						{this.props.children}
					</div>
				</div>
			</header>
		);
	}
}

export default DashboardHeader;