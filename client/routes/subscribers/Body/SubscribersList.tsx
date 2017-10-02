import * as React from 'react';
import { connect } from 'react-redux';
import * as classNames from 'classnames';

import Spinner from '../../../components/spinner';

interface Props {
	loading: boolean
	subscribersList: any
}

import SubscriberRow from './Subscriber/SubscriberRow';

class SubscribersList extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const {
			loading,
			subscribersList
		} = this.props;

		return (
			<div className={classNames('layout_content', loading && 'is-loading')}>
				{loading && <Spinner width="65" height="65" strokeWidth="6"/>}
				{!loading &&
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
              {subscribersList.length === 0 && <div className="table_row table_row_empty">
								<div className="table_cell" style={{width: '100%'}}>
									<div className="table_cell_content">No result for your request.</div>
								</div>
							</div>}

              {subscribersList.map((item: any, index: number) => <SubscriberRow key={index} subscriber={item} />)}
						</div>
					</div>}
			</div>
		)
	}
}

export default connect(
	state => ({
		loading: state.subscribers.subscribersLoading,
		subscribersList: state.subscribers.list
	})
)(SubscribersList);