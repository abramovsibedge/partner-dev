import * as React from 'react';
import { connect } from 'react-redux';
import * as update from 'immutability-helper';

import * as model from '../../../reducers/subscribers/model';
import * as actions from '../../../reducers/subscribers/actions';

import Loader from '../Loading';

interface Props {
	projects: any,
	subscribers: model.subscribersModel,
	getSubscribers: (data: any) => void,
  getSubscriber: (data: any) => void
}

interface State {
	loaded: boolean,
	activeProject: number,
	subscribers: any,
}

import SubscriberRow from './Subscriber/SubscriberRow';

class SubscribersList extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			loaded: false,
			activeProject: null,
			subscribers: []
		};
	}

	componentWillReceiveProps(nextprops: any) {
		if (nextprops.projects.list.length > 0 && nextprops.subscribers.activeProject !== this.state.activeProject) {
			this.setState(update(this.state, {
				activeProject: {$set: nextprops.subscribers.activeProject},
        loaded: {$set: false}
			}));

			this.props.getSubscribers(nextprops.projects.list[nextprops.subscribers.activeProject]);
		}

		if (nextprops.subscribers.activeProject === this.state.activeProject) {
			this.setState(update(this.state, {
        subscribers: {$set: nextprops.subscribers.list},
        loaded: {$set: true}
      }));
		}
	}

	render() {
		return (
			<div className="layout_content">
				{!this.state.loaded && <Loader />}
				{this.state.loaded &&
					<div className="table main_table">
						<div className="table_head">
							<table>
								<tbody>
									<tr>
										<td style={{width: '8.15%'}}>ID</td>
										<td style={{width: '25%'}}>Name</td>
										<td style={{width: '8.55%'}}>Licence</td>
										<td style={{width: '11.05%'}}>Activated devices</td>
										<td style={{width: '9.9%'}}>Active sessions</td>
										<td style={{width: '8.5%'}}>Condition</td>
										<td style={{width: '10.9%'}}>Registration time</td>
										<td style={{width: '10.45%'}}>Last connection</td>
										<td style={{width: '7.5%'}}>Purchases</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="table_body">
              {this.state.subscribers.length === 0 && <div className="table_row table_row_empty">
								<div className="table_cell" style={{width: '100%'}}>
									<div className="table_cell_content">No result for your request.</div>
								</div>
							</div>}

              {this.state.subscribers.map((item: any, index: number) => <SubscriberRow key={index} subscriber={item} />)}
						</div>
					</div>}
			</div>
		)
	}
}

export default connect(
	state => ({
		projects: state.projects,
		subscribers: state.subscribers
	}),
	({
		getSubscribers: actions.getSubscribers
	})
)(SubscribersList);