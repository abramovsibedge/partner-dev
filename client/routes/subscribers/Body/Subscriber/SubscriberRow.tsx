import * as React from 'react';
import { connect } from 'react-redux';
import * as update from 'immutability-helper';
import * as classNames from 'classnames';

import * as model from '../../../../reducers/subscribers/model';
import * as actions from '../../../../reducers/subscribers/actions';

import Signal from '../../../../functions/Signal';

import SubscriberRowOpened from './SubscriberRowOpened';

import {
	dateString
} from '../../../../functions/subscribers';

import {
	IconClose
} from '../../../../components/icons';
import {Button} from '../../../../components/button';

import {
	getSubscriber
} from '../../../../functions/subscribers';
//

interface Props {
	subscriber: any
	subsribers?: model.subscribersModel
  getSubscriber?: (data: any) => void
}

interface State {
	subscriber: object
	isOpened: boolean
}

class SubscriberRow extends React.Component<Props, State> {
	// openSubscriber: () => void;
	// closeSubscriber: () => void;
	// signals:any = {};

	constructor(props: any) {
		super(props);
    //
		// this.openSubscriber    = props.openSubscriber;
		// this.closeSubscriber   = props.closeSubscriber;

		this.state = {
			subscriber: null,
			isOpened: false
		};
	}



  //
	// componentDidMount() {
	// 	this.signals['openSubscriber'] = Signal.attach('openSubscriber', (subscriberId:number) => {
	// 		if(subscriberId === this.state.subscriber.id && this.state.isOpened) return;
  //
	// 		if(this.state.subscriber.id === subscriberId && !this.state.isOpened) {
	// 			this.setState({isOpened: true});
	// 		}
	// 		else if(this.state.isOpened && this.state.subscriber.id !== subscriberId){
	// 			this.setState({isOpened: false});
	// 		}
	// 	});
  //
	// 	this.signals['closeSubscriber'] = Signal.attach('closeSubscriber', (subscriberId:number) => {
	// 		if(this.state.subscriber.id === subscriberId && this.state.isOpened) {
	// 			this.setState({isOpened: false});
	// 		}
	// 	});
  //
	// 	this.signals['subscriberModified'] = Signal.attach('subscriberModified', (info:any) => {
	// 		if(info.id != this.state.subscriber.id) return;
	// 		this.getSubscriber();
	// 	});
	// }
  //
	// componentWillUnmount() {
	// 	for(let k in this.signals) {
	// 		Signal.detach(k, this.signals[k]);
	// 	}
	// }
  //

	componentWillReceiveProps(nextprops: any) {
		console.log( nextprops );
	}

	openSubscriber(id: number) {
		this.setState(update(this.state, {
			isOpened: {$set: true}
		}));

		// getSubscriber(this.state.subscriber.id).then((response) => {
		// 	if(response.result === 'OK') {
		// 		this.setState({subscriber: response.subscriber})
		// 	}
		// });

    // this.props.getSubscriber(id)
	}

	closeSubscriber() {
		this.setState(update(this.state, {
			isOpened: {$set: false}
		}));
	}

  // onClick={() => this.props.getSubscriber(this.props.subscriber.id)}

	render() {
		let subscriber = this.props.subscriber;
    let condition = (subscriber.condition === 0);
    let free = (subscriber.purchases.length === 0);

		return (
			<div className={classNames('table_row', this.state.isOpened && 'table_row_open')}>
				<div className="table_row_wrapper" onClick={() => this.openSubscriber(this.props.subscriber.id)}>
					<div className="table_cell" style={{width: '8.15%'}}>
						<div className="table_cell_content">{subscriber.id}</div>
					</div>
					<div className="table_cell" style={{width: '25%'}}>
						<div className="table_cell_content">{subscriber.name}</div>
					</div>
					<div className="table_cell" style={{width: '8.55%'}}>
						<div className="table_cell_content"><span className="table_label">{subscriber.bundle.name}</span></div>
					</div>
					<div className="table_cell" style={{width: '11.05%'}}>
						<div className="table_cell_content">{subscriber.activated_devices}</div>
					</div>
					<div className="table_cell" style={{width: '9.9%'}}>
						<div className="table_cell_content">{subscriber.active_sessions}</div>
					</div>
					<div className="table_cell" style={{width: '8.5%'}}>
						<div className="table_cell_content">
							<span className={classNames(condition ? 'table_enable' : 'table_disable')}>
								{(condition ? 'Enabled' : 'Disabled')}
							</span>
						</div>
					</div>
					<div className="table_cell" style={{width: '10.9%'}}>
						<div className="table_cell_content">{dateString(subscriber.registration_time)}</div>
					</div>
					<div className="table_cell" style={{width: '10.45%'}}>
						<div className="table_cell_content">{dateString(subscriber.connection_time)}</div>
					</div>
					{!this.state.isOpened &&
						<div className="table_cell" style={{width: '7.5%'}}>
							<div className="table_cell_content">
								<span className={classNames(free ? 'table_disable' : 'table_enable')}>
									{(free ? 'Free' : 'Not free')}
								</span>
							</div>
						</div>}
				</div>
				{this.state.isOpened &&
					<Button type="button" className="subscriber_close" onClick={() => this.closeSubscriber()}>
						<IconClose width="24" height="24"/>
					</Button>}

				{this.state.isOpened && <SubscriberRowOpened data={this.props.subscriber} />}
			</div>
		);
	}
}

export default connect<any, any, Props>(
  state => ({
    subscribers: state.subscribers
  }),
  ({
  })
)(SubscriberRow);