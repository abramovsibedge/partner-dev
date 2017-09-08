import * as React from 'react';
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

interface Parent {
	subscriber: any,
	openSubscriber: () => void,
	closeSubscriber: () => void,
}

interface State {
	isOpened: boolean,
	subscriber: any,
}

export default class SubscriberRow extends React.Component <Parent, State> {
	openSubscriber: () => void;
	closeSubscriber: () => void;
	signals:any = {}

	constructor(props: any) {
		super(props);

		this.openSubscriber    = props.openSubscriber;
		this.closeSubscriber   = props.closeSubscriber;

		this.state = {
			isOpened: false,
			subscriber: props.subscriber
		};
	}

	componentDidMount() {
		this.signals['openSubscriber'] = Signal.attach('openSubscriber', (subscriberId:number) => {
			if(subscriberId === this.state.subscriber.id && this.state.isOpened) return;

			if(this.state.subscriber.id === subscriberId && !this.state.isOpened) {
				this.setState({isOpened: true});
			}
			else if(this.state.isOpened && this.state.subscriber.id !== subscriberId){
				this.setState({isOpened: false});
			}
		});

		this.signals['closeSubscriber'] = Signal.attach('closeSubscriber', (subscriberId:number) => {
			if(this.state.subscriber.id === subscriberId && this.state.isOpened) {
				this.setState({isOpened: false});
			}
		});

		this.signals['subscriberModified'] = Signal.attach('subscriberModified', (info:any) => {
			if(info.id != this.state.subscriber.id) return;
			this.getSubscriber();
		});
	}

	componentWillUnmount() {
		for(let k in this.signals) {
			Signal.detach(k, this.signals[k]);
		}
	}

	getSubscriber() {
		getSubscriber(this.state.subscriber.id).then((response) => {
			if(response.result === 'OK') {
				this.setState({subscriber: response.subscriber})
			}
		});
	}

	render() {
		let subscriber = this.state.subscriber;

		let free = (subscriber.purchases.length===0);
		let condition = (subscriber.condition===0);

		return (
			<div className={'table_row'+(this.state.isOpened?' table_row_open':'')} onClick={() => {this.openSubscriber()}}>
				<div className="table_row_wrapper">
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
								<span className={(condition?'table_enable':'table_disable')}>
									{(condition?'Enabled':'Disabled')}
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
							<span className={(free ? 'table_disable' : 'table_enable')}>
								{(free ? 'Free' : 'Not free')}
							</span>
						</div>
					</div>}
				</div>
				{this.state.isOpened &&
				<Button type="button" className="subscriber_close" onClick={() => this.closeSubscriber()}>
					<IconClose width="24" height="24"/>
				</Button>}
				<SubscriberRowOpened isOpened={this.state.isOpened} subscriber={this.state.subscriber}/>
			</div>
		);
	}
}