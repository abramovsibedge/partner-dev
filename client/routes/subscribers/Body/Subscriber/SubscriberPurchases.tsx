import * as React from 'react';

interface Parent {
	subscriber: any
}

interface State {
	subscriber: any
};

class SubscriberPurchases extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			subscriber: props.subscriber
		};
	}

	render() {
		if(this.state.subscriber.purchases.length === 0) {
			return (
				<div id="purchases" className="subscriber_tab subscriber_tab-active">
					<div className="subscriber_tab_content">
						<div className="subscriber_tabs_empty"><p>Subscriber has no purchases.</p></div>
					</div>
				</div>
			);
		}

		let content = [];
		for(let k in this.state.subscriber.purchases) {
			let purchase = this.state.subscriber.purchases;
			content.push(
				<div className="table_row purchases_item" data-id="{{id}}">
					<div className="table_cell" style={{width: '30%'}}>
						<div className="table_cell_content">{purchase.id}</div>
					</div>
					<div className="table_cell" style={{width: '30%'}}>
						<div className="table_cell_content">{purchase.type}</div>
					</div>
					<div className="table_cell" style={{width: '30%'}}>
						<div className="table_cell_content">
							<div className="table_date"></div>
							<div className="table_time"></div>
						</div>
					</div>
					<div className="table_cell" style={{width: '30%'}}>
						<div className="table_cell_content">

						</div>
					</div>
				</div>
			)
		}

		return (
			<div id="purchases" className="subscriber_tab subscriber_tab-active">
				<div className="subscriber_tab_content">
					<div className="table_head" key="table_head">
						<table>
							<tbody>
							<tr>
								<td style={{width: '30%'}}>Purchase ID</td>
								<td style={{width: '30%'}}>Purchase type</td>
								<td style={{width: '30%'}}>Check time</td>
								<td style={{width: '10%'}}></td>
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

export default SubscriberPurchases;