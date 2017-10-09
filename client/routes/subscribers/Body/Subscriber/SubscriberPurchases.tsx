import * as React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import * as actions from '../../../../reducers/subscriber/actions';
import { dateString } from '../../../../utils';
import { Button } from '../../../../components/button';

import Loading from '../../Loading';

import {
	IconClose,
	IconDelete,
} from '../../../../components/icons'

interface Props {
	data: any
	getPurchases?: (data: any) => void
	deletePurchase?: any
}

interface State {
	subscriber: any,
	loaded: boolean,
	purchases: any,
	showModal: boolean
}

class SubscriberPurchases extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			subscriber: props.subscriber,
			loaded: false,
			purchases: null,
			showModal: false
		};
	}

	componentDidMount() {
		this.getPurchases();
	}

	componentWillReceiveProps(props: any) {
		if (!this.state.purchases) {
			this.setState({
				purchases: props.subscriber.purchases,
				loaded: true
			});
		}
	}

	getPurchases() {
		this.props.getPurchases(this.props.data.id);
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

		this.props.deletePurchase(this.props.data.id, id).then(() => this.getPurchases());
	}

	render() {
		const {
			loaded,
			purchases,
			showModal
		} = this.state;

		if(!loaded) {
			return (
				<div id="purchases" className="subscriber_tab subscriber_tab-active">
					<div className="subscriber_tab_content">
						<div className="subscriber_tabs_empty">
							<Loading/>
						</div>
					</div>
				</div>
			);
		}

		if(purchases.length === 0) {
			return (
				<div id="purchases" className="subscriber_tab subscriber_tab-active">
					<div className="subscriber_tab_content">
						<div className="subscriber_tabs_empty"><p>Subscriber has no purchases.</p></div>
					</div>
				</div>
			);
		}

		let content = [];

		for(let k in purchases) {
			if (purchases.hasOwnProperty(k)) {
				let purchase = purchases[k];

				content.push(<div className="table_row" key={k}>
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
								<Button type="button" className="subscriber_manage_item subscriber_manage_item-disable" onClick={() => this.showModal(true)}>
									<IconDelete width="24" height="24"/>
								</Button>
								<Modal
									isOpen={showModal}
									className={{base: 'modal_inner'}}
									overlayClassName={{base: 'modal_outer'}}
									contentLabel="test">
									<div className="modal_header">
										<h2>Delete purchase</h2>
									</div>
									<div className="modal_content is-text-center">Do you really want to delete purchase?</div>
									<div className="modal_footer">
										<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.showModal(false)}>
											Cancel
										</button>
										<button className="modal_btn modal_btn-submit" type="button" onClick={() => this.deletePurchase(purchase.purchase_id)}>
											Delete purchase
										</button>
									</div>
									<Button type="button" className="modal_close" onClick={() => this.showModal(false)}>
										<IconClose width="24" height="24"/>
									</Button>
								</Modal>
							</div>
						</div>
					</div>
				</div>)
			}
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
									<td style={{width: '10%'}}>&nbsp;</td>
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

export default connect<any, any, Props>(
	state => ({
		subscriber: state.subscriber
	}),
	({
		getPurchases: actions.getPurchases,
		deletePurchase: actions.deletePurchase
	})
)(SubscriberPurchases);