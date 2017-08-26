import * as React from 'react';
import Modal from 'react-modal';

import {
	IconHTMLTag,
	IconQuestion,
	IconClose,
} from '../../../components/icons';

import { Button } from '../../../components/button';

import {
	logOut
} from '../../../functions/auth';

interface State {
	showModal: boolean
}

class User extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			showModal: false
		}
	}

	showLogout(state: boolean) {
		this.setState({showModal: state});
	}

	logoutConfirm() {
		logOut();
	}

	render() {
		return (
			<div className="header_user">
				<div className="header_logo">
					<a href="/">
						<img className="header_logo_img" src={require('../../../static/media/poweredbyhss_light.svg')}
								 alt="Partners Portal Logo" width="auto" height="24"/>
					</a>
				</div>
				<div className="header_logout">
					Hello test! <a href="#" className="header_logout_link" onClick={() => this.showLogout(true)}>Logout</a>
					<Modal
						isOpen={this.state.showModal}
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
							<button className="modal_btn modal_btn-submit" type="button" onClick={() => this.logoutConfirm()}>
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
							<IconHTMLTag width="24" height="24"/>
							<span>Docs</span>
          	</span>
						<div className="header_links_drop">
							<ul className="header_links_list">
								<li className="header_links_list_item"><a className="header_links_list_link" href="/docs/proxy_sdk_android.html" target="_blank">Proxy SDK for Android</a></li>
								<li className="header_links_list_item"><a className="header_links_list_link" href="/docs/proxy_sdk_ios.html" target="_blank">Proxy SDK for iOS</a></li>
								<li className="header_links_list_item"><a className="header_links_list_link" href="/docs/vpn_sdk_android_openvpn.html" target="_blank">VPN SDK for Android (OpenVPN)</a></li>
								<li className="header_links_list_item"><a className="header_links_list_link" href="/docs/vpn_sdk_ios_ipsec.html" target="_blank">VPN SDK for iOS (IPsec)</a></li>
								<li className="header_links_list_item"><a className="header_links_list_link" href="http://backend.northghost.com/doc/partner/index.html" target="_blank">Partner API</a></li>
								<li className="header_links_list_item"><a className="header_links_list_link" href="https://backend.northghost.com/doc/user/index.html" target="_blank">User API</a></li>
							</ul>
						</div>
					</div>
					<div className="header_links_content">
						<a className="header_links_link" href="mailto:platformpartners@anchorfree.com">
							<IconQuestion width="17" height="17"/>
							<span>Help</span>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default User;