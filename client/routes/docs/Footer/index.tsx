import * as React from 'react';
import {Link} from 'react-router';

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
									<li className="footer_top_item">
										<Link className="footer_top_link" to="/docs">
											<span>Docs</span>
										</Link>
									</li>
									<li className="footer_top_item"><a className="footer_top_link" href="mailto:platformpartners@anchorfree.com">Help</a>
									</li>
									<li className="footer_top_item">
										<Link className="footer_top_link" to="/auth/signin">Log in</Link>
										&nbsp;&amp;&nbsp;
										<Link className="footer_top_link" to="/auth/signup">Sign up</Link>
									</li>
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