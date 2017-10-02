import * as React from 'react';

interface Parent {

}

interface State {

}

export class Footer extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div id="footer">
				<div className="front_footer">
					<div className="front_footer_top">
						<div className="front_content footer_top">
							<div className="footer_top_logo">
								<img className="footer_top_img" src={require('../../../static/media/poweredbyhss_dark.svg')} alt="Partners Portal Logo" width="auto" height="40"/>
								<div className="footer_top_copy">Copyright © 2017 AnchorFree, Inc. All Rights Reserved</div>
							</div>
							<div className="footer_top_menu">
								<ul className="footer_top_list">
									<li className="footer_top_item"><a className="footer_top_link" href="/">Docs</a></li>
									<li className="footer_top_item"><a className="footer_top_link" href="mailto:platformpartners@anchorfree.com">Help</a>
									</li>
									<li className="footer_top_item"><a className="footer_top_link" href="/auth/signin">Log in</a>&nbsp;&amp;&nbsp;<a
										className="footer_top_link" href="/auth/signup">Sign up</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;