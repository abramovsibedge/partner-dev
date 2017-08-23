import { connect } from 'react-redux';
import * as React from 'react';

import {
	IconHTMLTag,
	IconQuestion
} from '../../components/icons'
import Spinner from '../../components/spinner';

import '../../static/scss/routes/dashboard.scss';
import '../../static/scss/routes/projects.scss';

export class Projects extends React.Component {
	constructor(props: any) {
		super(props);
	}
	render() {
		return (
			<div className="dashboard">
				<header className='header'>
					<div className="header_content">
						<div className="header_user">
							<div className="header_logo">
								<a href="/">
									<img className="header_logo_img" src={require('../../static/media/poweredbyhss_light.svg')} alt="Partners Portal Logo" width="auto" height="24" />
								</a>
							</div>
							<div className="header_logout">
								Hello test! <a href="#" className="header_logout_link js-logout">Logout</a>
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
										<IconQuestion width="17" height="17" />
										<span>Help</span>
									</a>
								</div>
							</div>
						</div>
						<div className="header_toolbar">
							<div className="header_toolbar_content">
								<div className="project_filter">
									<button className="btn project_filter_add js-project-create" type="button">
										<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
										<span>Add project</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</header>
				<section className="layout">
					<Spinner width="65" height="65" strokeWidth="6"/>
				</section>
			</div>
		);
	}
}

export default connect(
	state => ({}),
	({})
)(Projects);