import * as React from 'react';
import * as classNames from 'classnames';
import * as update from 'immutability-helper';
import { connect } from 'react-redux';

import * as model from '../../../reducers/subscribers/model';
import * as actions from '../../../reducers/subscribers/actions';

import { Button } from '../../../components/button';

import {
	IconSearch,
	IconClose
} from '../../../components/icons';

interface Props {
	projects: any
	subscribers: model.subscribersModel
	getSubscribers: (data: any) => void
	searchSubscriber: (type: string, value: string) => void
}

interface State {
	isFocused: boolean
	showSearchInput: boolean
	value: string
	searchType: string
	showDrop: boolean
}

class SearchSubscriber extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			isFocused: true,
			showSearchInput: false,
			value: '',
			searchType: '',
			showDrop: false
		}
	}

	showSearchForm(value: boolean) {
		this.setState(update(this.state, {
			showSearchInput: {$set: value},
			value: {$set: '' },
			showDrop: { $set: false },
			searchType: { $set: '' }
		}), () => {
			!value && this.props.getSubscribers(this.props.projects.list[this.props.subscribers.activeProject]);
		});
	}

	searchFormOnFocus(e: any, value: boolean) {
		value && this.setState(update(this.state, {
			showSearchInput: {$set: true},
			isFocused: { $set: true },
			showDrop: { $set: !!this.state.value }
		}));

		!value && this.setState(update(this.state, {
			showSearchInput: {$set: !!this.state.value},
			isFocused: { $set: false },
			searchType: { $set: !value && '' }
		}));

		!value && setTimeout(() => {
			!this.state.searchType && this.setState(update(this.state, {
				showDrop: { $set: false }
			}))
		}, 500)
	}

	searchInputHandler(value: string) {
		this.setState(update(this.state, {
			value: { $set: value },
			showDrop: { $set: true }
		}));
	}

	searchFormSubmit(e: any, type: string) {
		const searchType = {
			'userId': 'User ID',
			'username': 'User Name',
			'token': 'User Token',
			'extref': 'User Extref',
			'devices': 'Device Id'
		};

		this.setState(update(this.state, {
			searchType: { $set: searchType[type] },
			showDrop: { $set: false }
		}), () => {
			this.props.searchSubscriber(type, this.state.value);
		});
	}

	render() {
		const {
			showSearchInput,
			value,
			showDrop,
			searchType,
			isFocused
		} = this.state;

		return (
			<div className={classNames("subscriber_filter_form", showSearchInput && "subscriber_filter_form-showed")}>
				<form className="subscriber_filter_form_form" action="#" noValidate>
					<IconSearch className="subscriber_filter_form_icon" width="24" height="24" />
					{!showSearchInput && <Button type="button" className="is-transparent subscriber_filter_form_btn" onClick={() => this.showSearchForm(true)}>
						<span>Search subscriber</span>
					</Button>}
					{showSearchInput && isFocused && <div>
						<input
							value={value}
							className="subscriber_filter_form_input"
							placeholder="Type user ID, name, token or extref"
							autoFocus
							onFocus={() => this.searchFormOnFocus(event, true)}
							onBlur={() => this.searchFormOnFocus(event, false)}
							onChange={(e) => this.searchInputHandler(e.target.value)}
							/>
					</div>}
					<Button type="button" className="is-transparent subscriber_filter_form_reset" onClick={() => this.showSearchForm(false)}>
						<IconClose width="24" height="24"/>
					</Button>
					{!isFocused && <div className="subscriber_filter_form_input" onClick={() => this.searchFormOnFocus(event, true)}>
						{searchType && <b>{searchType}:&nbsp;</b>}{value}
					</div>}
					{showDrop && <div className="subscriber_filter_drop">
						<div className="subscriber_filter_drop_item subscriber_filter_drop_item-active" onClick={() => this.searchFormSubmit(event, 'userId')}>Search by &nbsp;&nbsp;<b>User ID</b></div>
						<div className="subscriber_filter_drop_item" onClick={() => this.searchFormSubmit(event, 'username')}>Search by &nbsp;&nbsp;<b>User Name</b></div>
						<div className="subscriber_filter_drop_item" onClick={() => this.searchFormSubmit(event, 'token')}>Search by &nbsp;&nbsp;<b>User Token</b></div>
						<div className="subscriber_filter_drop_item" onClick={() => this.searchFormSubmit(event, 'extref')}>Search by &nbsp;&nbsp;<b>User Extref</b></div>
						<div className="subscriber_filter_drop_item" onClick={() => this.searchFormSubmit(event, 'devices')}>Search by &nbsp;&nbsp;<b>Device Id</b></div>
					</div>}
				</form>
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
		getSubscribers: actions.getSubscribers,
		searchSubscriber: actions.searchSubscriber
	})
)(SearchSubscriber);