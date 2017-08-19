import * as React from 'react';
import * as classnames from 'classnames/bind';

const s = require('../../static/scss/routes/main.scss');
const cx = classnames.bind(s);

export class Main extends React.Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className={cx('front')}>
				<div className={cx('front_header')}>
					<div className={cx('front_content front_header_content')}>
						<div className={cx('front_header_top')}>
							<a className={cx('logo_link')} href="/">
								<img className={cx('logo_img')} src={require('../../static/media/poweredbyhss_light.svg')} alt="Partners Portal Logo" width="auto" height="50"/>
							</a>
							<ul className={cx('menu')}>
								<li className={cx('menu_item docslink')}>
									<span className={cx('menu_link')}>
										<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path
											d="M8.998 21.6L16.53 2.4h1.99l-7.51 19.2H8.998zM0 13.3l8.8 5.09v-2.13l-6.31-3.557L8.8 9.338V7.212L0 12.108v1.194zm18.352-4.338l-.665 1.7 3.824 2.04-5.93 3.342-.38.974v1.37l8.8-5.088V12.11l-5.648-3.146z"/></svg>
										<span>Docs</span>
									</span>
									<div className={cx('docslink_drop')}>
										<ul className={cx('docslink_list')}>
											<li className={cx('docslink_item')}>
												<a className={cx('docslink_link')} href="/docs/proxy_sdk_android.html"target="_blank">Proxy SDK for Android</a>
											</li>
											<li className={cx('docslink_item')}>
												<a className={cx('docslink_link')} href="/docs/proxy_sdk_ios.html" target="_blank">Proxy SDK for iOS</a>
											</li>
											<li className={cx('docslink_item')}>
												<a className={cx('docslink_link')} href="/docs/vpn_sdk_android_openvpn.html" target="_blank">VPN SDK for Android (OpenVPN)</a>
											</li>
											<li className={cx('docslink_item')}>
												<a className={cx('docslink_link')} href="/docs/vpn_sdk_ios_ipsec.html" target="_blank">VPN SDK for iOS (IPsec)</a>
											</li>
											<li className={cx('docslink_item')}>
												<a className={cx('docslink_link')} href="http://backend.northghost.com/doc/partner/index.html" target="_blank">Partner API</a>
											</li>
											<li className={cx('docslink_item')}>
												<a className={cx('docslink_link')} href="https://backend.northghost.com/doc/user/index.html" target="_blank">User API</a>
											</li>
										</ul>
									</div>
								</li>
								<li className={cx('menu_item')}>
									<a className={cx('menu_link')} href="mailto:platformpartners@anchorfree.com')}">
										<svg height="17" viewBox="0 0 34 34" width="17" xmlns="http://www.w3.org/2000/svg">
											<path d="M17.123 9.2c-1.44 0-2.642.503-3.604 1.32S11.993 12 11.83 14h2.937c.063-1 .302-1.23.715-1.61s.926-.62 1.54-.62c.616 0 1.117.175 1.505.572.39.396.583.882.583 1.48s-.187 1.094-.558 1.5l-1.772 1.768c-.518.518-.626.934-.78 1.25-.154.314-.003.793-.003 1.44V21h2v-.832c0-.646.29-1.148.58-1.504.113-.13.334-.287.522-.473.186-.186.448-.404.715-.655.267-.25.5-.457.662-.62.16-.16.403-.436.71-.824.534-.646.806-1.455.806-2.426 0-1.408-.45-2.503-1.356-3.29-.908-.782-2.077-1.174-3.517-1.174zM16.94 22.145c-.51 0-.946.18-1.31.534-.365.355-.547.78-.547 1.273 0 .493.186.914.558 1.262.373.348.814.52 1.323.52.51 0 .947-.177 1.31-.532.364-.356.547-.78.547-1.274s-.187-.915-.56-1.264c-.37-.348-.81-.52-1.32-.52z"/>
											<path d="M17 0C7.61 0 0 7.61 0 17s7.61 17 17 17 17-7.61 17-17S26.39 0 17 0zm0 31C9.268 31 3 24.732 3 17S9.268 3 17 3s14 6.268 14 14-6.268 14-14 14z"/>
										</svg>
										<span>Help</span>
									</a>
								</li>
							</ul>
							<ul className={cx('auth')}>
								<li className={cx('auth_item')}><a className={cx('auth_link','auth_link-active')} href="#/signup">Sign up</a></li>
								<li className={cx('auth_item')}><a className={cx('auth_link')} href="#/login">Sign in</a></li>
							</ul>
						</div>
						<div className={cx('front_header_middle')}>
							<h1>Freedom as a Service</h1>
							<p>Build secure apps that can't be<br/>throttled or restricted</p>
							<ul className={cx('selllinks')}>
								<li className={cx('selllinks_item')}>
									<a className={cx('selllinks_item_link selllinks_item_link-custom')} href="#/signup">Get a FREE API key</a>
								</li>
								<li className={cx('selllinks_item')}>
									<a className={cx('selllinks_item_link selllinks_item_link-simple')} href="mailto:platformpartners@anchorfree.com">Learn more</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className={cx('front_products')}>
					<div className={cx('front_content')}>
						<h2 className={cx('front_content_header')}>
							<span className={cx('front_products_header')}>Products</span>
						</h2>
						<ul className={cx('front_products_list')}>
							<li className={cx('front_products_item')}>
								<div className={cx('front_products_img front_products_img-1')}></div>
								<p className={cx('front_products_promo')}>Keep Your Users Safe</p>
								<p className={cx('front_products_promo-big')}>VPN SDK</p>
								<p className={cx('front_products_description')}>Enable a VPN for securing the entire operating system of your
									users. Protects your user data from malicious websites, ISPs, and hackers. Protects from unsafe
									networks (like public Wi-Fi). Puts you in control of the enter OS.</p>
								<a href="#/signup" className={cx('front_products_action')}>Try it now</a>
							</li>
							<li className={cx('front_products_item')}>
								<div className={cx('front_products_img front_products_img-2')}></div>
								<p className={cx('front_products_promo')}>Make Your App Unstoppable</p>
								<p className={cx('front_products_promo-big')}>Proxy SDK</p>
								<p className={cx('front_products_description')}>Protects your app from throttling, censorship, or any kind of
									interference from Internet Service providers. Protects your user data from ISPs and hackers. Ensures
									that your app is always available from anywhere in the world.</p>
								<a href="#/signup" className={cx('front_products_action')}>Try it now</a>
							</li>
							<li className={cx('front_products_item')}>
								<div className={cx('front_products_img front_products_img-3')}></div>
								<p className={cx('front_products_promo')}>Secure Your Business Connection</p>
								<p className={cx('front_products_promo-big')}>VPN for business</p>
								<p className={cx('front_products_description')}>Use AnchorFree’s proprietary, lightning-fast Hydra VPN and the
									AnchorFree Server Network (among the 100 largest networks in the world). Contact our partnership team
									For more information.</p>
								<a href="mailto:platformpartners@anchorfree.com" className={cx('front_products_action')}>Learn more</a>
							</li>
						</ul>
					</div>
				</div>
				<div className={cx('front_features')}>
					<div className={cx('front_content')}>
						<h2 className={cx('front_content_header')}>
							<span>FEATURES</span>
						</h2>
						<div className={cx('features_pane')}>
							<h3>Our key features</h3>
							<div className={cx('features_content')}>
								<img className={cx('features_img')} src={require('../../static/media/front_features.png')} alt="VPN Services by AnchorFree" width="867"
										 height="2141"/>
								<div className={cx('features_item features_item-1')}>
									<h4 className={cx('features_header')}>Protocols and Platforms</h4>
									<p className={cx('features_text')}>We support popular VPN protocols and major client platforms</p>
									<p className={cx('features_text')}>We support popular VPN protocols:<br/><a href="#/front">OpenVPN</a>, <a
										href="#/front">IPSEC</a>, <a href="#/front">Hydra</a><br/><br/>and major client platforms:<br/><a
										href="#/front">iOS</a>, <a href="#/front">OSX</a>, <a href="#/front">Android</a>, <a href="#/front">Windows</a>
									</p>
								</div>
								<div className={cx('features_item features_item-2')}>
									<h4 className={cx('features_header')}>Works out of the "box"</h4>
									<p className={cx('features_text')}>Easy to use in new applications as well as existing apps</p>
								</div>
								<div className={cx('features_item features_item-3')}>
									<h4 className={cx('features_header')}>Focus On Accessibility</h4>
									<p className={cx('features_text')}>Choose from thousands of server endpoints around the world or the quickest for your users</p>
								</div>
								<div className={cx('features_item features_item-4')}>
									<h4 className={cx('features_header')}>We Take Privacy Seriously</h4>
									<p className={cx('features_text')}>We do not store, log or monitor individual user data or traffic.</p>
								</div>
								<div className={cx('features_item features_item-5')}>
									<h4 className={cx('features_header')}>Simple to Manage</h4>
									<p className={cx('features_text')}>Monitor and manage your apps from a single dashboard in your account</p>
								</div>
								<div className={cx('features_circle')}>
									<svg height="45" viewBox="0 0 1792 1792" width="45" xmlns="http://www.w3.org/2000/svg">
										<path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10L407 759q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={cx('front_getkey getkey')}>
					<div className={cx('front_content')}>
						<div className={cx('getkey_pane')}>
							<img className={cx('getkey_pane_img')} src={require('../../static/media/front_getkey_img.png')} alt="" width="430" height="430"/>
							<div className={cx('getkey_pane_content')}>
								<h2 className={cx('getkey_pane_header')}>Ready to get started?</h2>
								<div className={cx('getkey_pane_banch')}><span>FOR FREE</span></div>
								<a href="#/signup" className={cx('getkey_pane_action')}>Get a FREE API key</a>
							</div>
						</div>
						<div className={cx('getkey_clients')}>
							<h2 className={cx('front_content_header')}>
								<span className={cx('front_getkey_header')}>Our Partners</span>
							</h2>
							<ul className={cx('getkey_clients_list')}>
								<li className={cx('getkey_clients_item getkey_clients_item-1')}></li>
								<li className={cx('getkey_clients_item getkey_clients_item-2')}></li>
								<li className={cx('getkey_clients_item getkey_clients_item-3')}></li>
							</ul>
						</div>
					</div>
				</div>
				<div className={cx('front_footer')}>
					<div className={cx('front_footer_top')}>
						<div className={cx('front_content footer_top')}>
							<div className={cx('footer_top_logo')}>
								<img className={cx('footer_top_img')} src={require('../../static/media/poweredbyhss_dark.svg')} alt="Partners Portal Logo" width="auto" height="40"/>
								<div className={cx('footer_top_copy')}>Copyright © 2017 AnchorFree, Inc. All Rights Reserved</div>
							</div>
							<div className={cx('footer_top_menu')}>
								<ul className={cx('footer_top_list')}>
									<li className={cx('footer_top_item')}><a className={cx('footer_top_link')} href="#/front">Docs</a></li>
									<li className={cx('footer_top_item')}><a className={cx('footer_top_link')} href="mailto:platformpartners@anchorfree.com">Help</a>
									</li>
									<li className={cx('footer_top_item"')}><a className={cx('footer_top_link')} href="#/login">Log in</a>&nbsp;&&nbsp;<a
										className={cx('footer_top_link')} href="#/signup">Sign up</a></li>
									{/*<li className={cx('footer_top_item')}><a className={cx('footer_top_link')} href="#/front">Menu & Products</a></li>*/}
								</ul>
							</div>
							{/*<div className={cx('footer_top_menu')}>*/}
								{/*<ul className={cx('footer_top_list')}>*/}
									{/*<li className={cx('footer_top_item')}><a className={cx('footer_top_link')} href="#/front">Features</a></li>*/}
									{/*<li className={cx('footer_top_item')}><a className={cx('footer_top_link')} href="#/front">Coverage</a></li>*/}
									{/*<li className={cx('footer_top_item')}><a className={cx('footer_top_link')} href="#/front">API</a></li>*/}
									{/*<li className={cx('footer_top_item')}><a className={cx('footer_top_link')} href="#/front">Use Cases</a></li>*/}
								{/*</ul>*/}
							{/*</div>*/}
							{/*<div className={cx('footer_top_menu footer_top_menu-last')}>*/}
								{/*<ul className={cx('footer_top_list')}>*/}
									{/*<li className={cx('footer_top_item')}><a className={cx('footer_top_link')} href="#/front">Pricing</a></li>*/}
									{/*<li className={cx('footer_top_item')}><a className={cx('footer_top_link')} href="#/front">Quickstart</a></li>*/}
									{/*<li className={cx('footer_top_item')}><a className={cx('footer_top_link')} href="#/front">Tutorials</a></li>*/}
									{/*<li className={cx('footer_top_item')}><a className={cx('footer_top_link')} href="#/front">Reference Docs</a></li>*/}
								{/*</ul>*/}
							{/*</div>*/}
						</div>
					</div>
				</div>
			</div>
		);
	}
}