import * as React from 'react';
import Modal from 'react-modal';
import Loading from '../../Loading';

import {
	getPurchases,
	deletePurchase,
	dateString
} from '../../../../functions/subscribers';

import {
	IconClose,
	IconDelete,
} from '../../../../components/icons'
import {Button} from '../../../../components/button';

interface Parent {
	subscriber: any
}

interface State {
	subscriber: any,
	loaded: boolean,
	purchases: any,
	showModal: boolean
};

class SubscriberPurchases extends React.Component<Parent, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			subscriber: props.subscriber,
			loaded: false,
			purchases: [],
			showModal: false
		};
	}

	componentDidMount() {
		this.getPurchases();
	}

	componentWillReceiveProps(props: any) {
		this.setState({
			subscriber: props.subscriber,
			loaded: false
		});

		this.getPurchases();
	}

	getPurchases() {
		getPurchases(this.state.subscriber.id).then((response) => {
			/*response.purchases = [
				{
					purchase_id: 123,
					purchase_type: 'First',
					purchase_time: 1504011677525
				},
				{
					purchase_id: 2344,
					purchase_type: 'Second',
					purchase_time: 1504111677525
				},
				{
					purchase_id: 7567,
					purchase_type: 'Third',
					purchase_time: 1504211677525
				},
			];*/

			this.setState({
				loaded: true,
				purchases: response.purchases
			});
		});
	}

	showModal(state: boolean) {
		this.setState({
			showModal: state
		});
	}

	deletePurchase(id: number) {
		this.setState({
			loaded: false,
			showModal: false
		});
		deletePurchase(this.state.subscriber.id, id).then(() => {
			this.getPurchases();
		});
	}

	render() {
		if(!this.state.loaded) {
			return (
				<div id="purchases" className="subscriber_tab subscriber_tab-active">
					<div className="subscriber_tab_content">
						<div className="subscriber_tabs_empty"><Loading/></div>
					</div>
				</div>
			);
		}

		if(this.state.purchases.length === 0) {
			return (
				<div id="purchases" className="subscriber_tab subscriber_tab-active">
					<div className="subscriber_tab_content">
						<div className="subscriber_tabs_empty"><p>Subscriber has no purchases.</p></div>
					</div>
				</div>
			);
		}

		let content = [];
		for(let k in this.state.purchases) {
			let purchase = this.state.purchases[k];

			content.push(
				<div className="table_row" key={k}>
					<div className="table_row_wrapper">
						<div className="table_cell" style={{width: '30%'}}>
							<div className="table_cell_content">{purchase.purchase_id}</div>
						</div>
						<div className="table_cell" style={{width: '30%'}}>
							<div className="table_cell_content">{purchase.type}</div>
						</div>
						<div className="table_cell" style={{width: '30%'}}>
							<div className="table_cell_content">
								<div className="table_date">{dateString(purchase.purchase_time)}</div>
							</div>
						</div>
						<div className="table_cell" style={{width: '10%'}}>
							<div className="table_cell_content">
								<Button type="button" className="subscriber_manage_item subscriber_manage_item-disable"
												onClick={() => this.showModal(true)}>
									<IconDelete width="24" height="24"/>
								</Button>
								<Modal
									isOpen={this.state.showModal}
									className={{base: 'modal_inner'}}
									overlayClassName={{base: 'modal_outer'}}
									contentLabel="test">
									<div className="modal_header">
										<h2>Delete purchase</h2>
									</div>
									<div className="modal_content is-text-center">Do you really want to delete purchase?</div>
									<div className="modal_footer">
										<button className="modal_btn modal_btn-reset" type="button"
														onClick={() => this.showModal(false)}>Cancel
										</button>
										<button className="modal_btn modal_btn-submit" type="button"
														onClick={() => this.deletePurchase(purchase.purchase_id)}>Delete purchase
										</button>
									</div>
									<Button type="button" className="modal_close"
													onClick={() => this.showModal(false)}>
										<IconClose width="24" height="24"/>
									</Button>
								</Modal>
							</div>
						</div>
					</div>
				</div>
			)
		}

		return (
			<div id="purchases" className="subscriber_tab subscriber_tab-active">
				<div className="table inner_table">
					<div className="table_head">
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