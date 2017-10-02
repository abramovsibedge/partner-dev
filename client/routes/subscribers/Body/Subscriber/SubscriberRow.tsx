import * as React from 'react';
import { connect } from 'react-redux';
import * as update from 'immutability-helper';
import * as classNames from 'classnames';

import * as actions from '../../../../reducers/subscribers/actions';

import SubscriberRowOpened from './SubscriberRowOpened';

import { dateString } from '../../../../utils';
import { IconPlay } from '../../../../components/icons';
import { Button } from '../../../../components/button';

interface Props {
	subscriber: any
	activeSubscriber?: number
	setActiveSubscriber?: (data: any) => void
}

interface State {
	isOpened: boolean
}

class SubscriberRow extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			isOpened: false
		};
	}

	componentWillReceiveProps(nextprops: any) {
		this.setState(update(this.state, {
			isOpened: {$set: nextprops.subscriber.id === nextprops.activeSubscriber}
		}));
	}

	render() {
		const {
			subscriber,
			setActiveSubscriber
		} = this.props;
		const { isOpened } = this.state;
		
    let condition = (subscriber.condition === 0);
    let free = (subscriber.purchases.length === 0);

		return (
			<div className={classNames('table_row', isOpened && 'table_row_open')}>
				<div className="table_row_wrapper" onClick={() => setActiveSubscriber(subscriber.id)}>
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
					{!isOpened &&
						<div className="table_cell" style={{width: '7.5%'}}>
							<div className="table_cell_content">
								<span className={classNames(free ? 'table_disable' : 'table_enable')}>
									{(free ? 'Free' : 'Not free')}
								</span>
							</div>
						</div>}
				</div>
				{isOpened &&
					<Button type="button" className="subscriber_close" onClick={() => setActiveSubscriber(null)}>
						<IconPlay width="24" height="24"/>
					</Button>}

				{isOpened && <SubscriberRowOpened data={subscriber} />}
			</div>
		);
	}
}

export default connect<any, any, Props>(
  state => ({
		activeSubscriber: state.subscribers.activeSubscriber
  }),
  ({
		setActiveSubscriber: actions.setActiveSubscriber
  })
)(SubscriberRow);