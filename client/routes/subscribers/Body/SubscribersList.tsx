import * as React from 'react';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import * as update from 'immutability-helper';

import Spinner from '../../../components/spinner';

interface Props {
	loading: boolean
	subscribersList: any
}

interface State {
	stickedTableHead: boolean
}

import SubscriberRow from './Subscriber/SubscriberRow';

class SubscribersList extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			stickedTableHead: false
		}
	}

	componentDidMount(){
		window && window.addEventListener('scroll',this.stickTableHead);
	}

	componentWillUnmount(){
		window && window.removeEventListener('scroll',this.stickTableHead);
	}

	stickTableHead = () => {
		let {stickedTableHead} = this.state;

		window && window.scrollY > 87 ?
			!stickedTableHead && this.setState(update(this.state, {
				stickedTableHead: {$set: true}
			}))
			:
			stickedTableHead && this.setState(update(this.state, {
				stickedTableHead: {$set: false}
			}));
	};

	render() {
		const {
			loading,
			subscribersList
		} = this.props;

		const { stickedTableHead } = this.state;

		return (
			<div className={classNames('layout_content', loading && 'is-loading')}>
				{loading && <Spinner width="65" height="65" strokeWidth="6"/>}
				{!loading &&
					<div className="table main_table">
						<div className={classNames("table_head", stickedTableHead && "table_head_sticked")}>
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