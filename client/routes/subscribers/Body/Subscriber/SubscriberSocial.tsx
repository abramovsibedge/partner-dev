import * as React from 'react';

interface Parent {
	subscriber: any
}

interface State {
	subscriber: any
};

class SubscriberSocial extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			subscriber: props.subscriber
		};
	}

	render() {

		let content = [
			<div className="table_row" key='extref'>
				<div className="table_row_wrapper">
					<div className="table_cell" style={{width: '20%'}}>
						<div className="table_cell_content">Extref</div>
					</div>
					<div className="table_cell" style={{width: '80%'}}>
						<div className="table_cell_content">{this.state.subscriber.extref}</div>
					</div>
				</div>
			</div>
		];

		for(let k in this.state.subscriber.social) {
			content.push(
				<div className="table_row" key={k}>
					<div className="table_row_wrapper">
						<div className="table_cell" style={{width: '20%'}}>
							<div className="table_cell_content">{k}</div>
						</div>
						<div className="table_cell" style={{width: '80%'}}>
							<div className="table_cell_content">{this.state.subscriber.social[k]}</div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div id="purchases" className="subscriber_tab subscriber_tab-active">
				<div className="table inner_table">
					<div className="table_head">
						<table>
							<tbody>
							<tr>
								<td style={{width: '20%'}}>Social</td>
								<td style={{width: '80%'}}>Content</td>
							</tr>
							</tbody>
						</table>
					</div>
					<div className="table_body">
						{content}
					</div>
				</div>
			</div>
		);
	}
}

export default SubscriberSocial;