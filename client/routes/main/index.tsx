import * as React from 'react';
import {
	logOut
} from '../../functions/auth';
import {
	IconDocs,
	IconQuestion
} from '../../components/icons'

import '../../static/scss/routes/main.scss';

import {check} from '../../../client/functions/auth';

interface State {
	isSigned: boolean
}

export class Main extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			isSigned: check(),
		}
	}

	render() {
		const {
			isSigned
		} = this.state;

		return (
			<div className="front">
				<div className="front_header">
					<div className="front_content front_header_content">
						<div className="front_header_top">
							<a className="logo_link" href="/">
								<img className="logo_img" src={require('../../static/media/poweredbyhss_light.svg')} alt="Partners Portal Logo" width="auto" height="50"/>
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
							{!isSigned && <ul className="auth">
								<li className="auth_item"><a className="auth_link auth_link-active" href="/auth/signup">Sign up</a></li>
								<li className="auth_item"><a className="auth_link" href="/auth/signin">Sign in</a></li>
							</ul>}
							{isSigned && <ul className="auth">
								<li className="auth_item"><a className="auth_link auth_link-active" href="/projects">Dashboard</a></li>
								<li className="auth_item"><a className="auth_link" href="#" onClick={logOut}>Logout</a></li>
							</ul>}
						</div>
						<div className="front_header_middle">
							<h1>Freedom as a Service</h1>
							<p>Build secure apps that can't be<br/>throttled or restricted</p>
							<ul className="selllinks">
								<li className="selllinks_item">
									<a className="selllinks_item_link selllinks_item_link-custom" href="/auth/signup">Get a FREE API key</a>
								</li>
								<li className="selllinks_item">
									<a className="selllinks_item_link selllinks_item_link-simple" href="mailto:platformpartners@anchorfree.com">Learn more</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="front_products">
					<div className="front_content">
						<h2 className="front_content_header">
							<span className="front_products_header">Products</span>
						</h2>
						<ul className="front_products_list">
							<li className="front_products_item">
								<div className="front_products_img front_products_img-1">&nbsp;</div>
								<p className="front_products_promo">Keep Your Users Safe</p>
								<p className="front_products_promo-big">VPN SDK</p>
								<p className="front_products_description">Enable a VPN for securing the entire operating system of your
									users. Protects your user data from malicious websites, ISPs, and hackers. Protects from unsafe
									networks (like public Wi-Fi). Puts you in control of the enter OS.</p>
								<a href="/auth/signup" className="front_products_action">Try it now</a>
							</li>
							<li className="front_products_item">
								<div className="front_products_img front_products_img-2">&nbsp;</div>
								<p className="front_products_promo">Make Your App Unstoppable</p>
								<p className="front_products_promo-big">Proxy SDK</p>
								<p className="front_products_description">Protects your app from throttling, censorship, or any kind of
									interference from Internet Service providers. Protects your user data from ISPs and hackers. Ensures
									that your app is always available from anywhere in the world.</p>
								<a href="/auth/signup" className="front_products_action">Try it now</a>
							</li>
							<li className="front_products_item">
								<div className="front_products_img front_products_img-3">&nbsp;</div>
								<p className="front_products_promo">Secure Your Business Connection</p>
								<p className="front_products_promo-big">VPN for business</p>
								<p className="front_products_description">Use AnchorFree’s proprietary, lightning-fast Hydra VPN and the
									AnchorFree Server Network (among the 100 largest networks in the world). Contact our partnership team
									For more information.</p>
								<a href="mailto:platformpartners@anchorfree.com" className="front_products_action">Learn more</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="front_features">
					<div className="front_content">
						<h2 className="front_content_header">
							<span>FEATURES</span>
						</h2>
						<div className="features_pane">
							<h3>Our key features</h3>
							<div className="features_content">
								<img className="features_img" src={require('../../static/media/front_features.png')} alt="VPN Services by AnchorFree" width="867" height="2141"/>
								<div className="features_item features_item-1">
									<h4 className="features_header">Protocols and Platforms</h4>
									<p className="features_text">We support popular VPN protocols and major client platforms</p>
									<p className="features_text">We support popular VPN protocols:<br/><a href="/">OpenVPN</a>,
										<a href="/">IPSEC</a>, <a href="/">Hydra</a><br/><br/>and major client platforms:<br/><a href="/">iOS</a>,
										 <a href="/">OSX</a>, <a href="/">Android</a>, <a href="/">Windows</a>
									</p>
								</div>
								<div className="features_item features_item-2">
									<h4 className="features_header">Works out of the "box"</h4>
									<p className="features_text">Easy to use in new applications as well as existing apps</p>
								</div>
								<div className="features_item features_item-3">
									<h4 className="features_header">Focus On Accessibility</h4>
									<p className="features_text">Choose from thousands of server endpoints around the world or the quickest for your users</p>
								</div>
								<div className="features_item features_item-4">
									<h4 className="features_header">We Take Privacy Seriously</h4>
									<p className="features_text">We do not store, log or monitor individual user data or traffic.</p>
								</div>
								<div className="features_item features_item-5">
									<h4 className="features_header">Simple to Manage</h4>
									<p className="features_text">Monitor and manage your apps from a single dashboard in your account</p>
								</div>
								<div className="features_circle">
									<svg height="45" viewBox="0 0 1792 1792" width="45" xmlns="http://www.w3.org/2000/svg">
										<path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10L407 759q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="front_getkey getkey">
					<div className="front_content">
						<div className="getkey_pane">
							<img className="getkey_pane_img" src={require('../../static/media/front_getkey_img.png')} alt="" width="430" height="430"/>
							<div className="getkey_pane_content">
								<h2 className="getkey_pane_header">Ready to get started?</h2>
								<div className="getkey_pane_banch"><span>FOR FREE</span></div>
								<a href="/auth/signup" className="getkey_pane_action">Get a FREE API key</a>
							</div>
						</div>
						<div className="getkey_clients">
							<h2 className="front_content_header">
								<span className="front_getkey_header">Our Partners</span>
							</h2>
							<ul className="getkey_clients_list">
								<li className="getkey_clients_item getkey_clients_item-1">&nbsp;</li>
								<li className="getkey_clients_item getkey_clients_item-2">&nbsp;</li>
								<li className="getkey_clients_item getkey_clients_item-3">&nbsp;</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="front_footer">
					<div className="front_footer_top">
						<div className="front_content footer_top">
							<div className="footer_top_logo">
								<img className="footer_top_img" src={require('../../static/media/poweredbyhss_dark.svg')} alt="Partners Portal Logo" width="auto" height="40"/>
								<div className="footer_top_copy">Copyright © 2017 AnchorFree, Inc. All Rights Reserved</div>
							</div>
							<div className="footer_top_menu">
								<ul className="footer_top_list">
									<li className="footer_top_item"><a className="footer_top_link" href="/">Docs</a></li>
									<li className="footer_top_item"><a className="footer_top_link" href="mailto:platformpartners@anchorfree.com">Help</a>
									</li>
									<li className="footer_top_item"><a className="footer_top_link" href="/auth/signin">Log in</a>&nbsp;&amp;&nbsp;<a
										className="footer_top_link" href="/auth/signup">Sign up</a></li>
									{/*<li className="footer_top_item"><a className="footer_top_link" href="#/front">Menu & Products</a></li>*/}
								</ul>
							</div>
							{/*<div className="footer_top_menu">*/}
								{/*<ul className="footer_top_list">*/}
									{/*<li className="footer_top_item"><a className="footer_top_link" href="#/front">Features</a></li>*/}
									{/*<li className="footer_top_item"><a className="footer_top_link" href="#/front">Coverage</a></li>*/}
									{/*<li className="footer_top_item"><a className="footer_top_link" href="#/front">API</a></li>*/}
									{/*<li className="footer_top_item"><a className="footer_top_link" href="#/front">Use Cases</a></li>*/}
								{/*</ul>*/}
							{/*</div>*/}
							{/*<div className="footer_top_menu footer_top_menu-last">*/}
								{/*<ul className="footer_top_list">*/}
									{/*<li className="footer_top_item"><a className="footer_top_link" href="#/front">Pricing</a></li>*/}
									{/*<li className="footer_top_item"><a className="footer_top_link" href="#/front">Quickstart</a></li>*/}
									{/*<li className="footer_top_item"><a className="footer_top_link" href="#/front">Tutorials</a></li>*/}
									{/*<li className="footer_top_item"><a className="footer_top_link" href="#/front">Reference Docs</a></li>*/}
								{/*</ul>*/}
							{/*</div>*/}
						</div>
					</div>
				</div>
			</div>
		);
	}
}