import * as React from 'react';
import * as update from 'immutability-helper';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';

import * as actions from '../../../reducers/subscribers/actions';

import { IconPlay } from '../../../components/icons';

interface Props {
	activeProject: any;
	projects: any;
	loadingState: any
	setActiveProject: any
	getSubscribers: (data: any) => void
}

interface State {
	projectsList: any
	showDropdown: boolean
}

class ProjectsSelector extends React.Component<Props, State> {
	constructor() {
		super();

		this.state = {
			projectsList: null,
			showDropdown: false
		};
	}

	componentDidMount() {
		if (!this.props.activeProject) {
			this.setActiveProject(0);
		}

		this.setState(update(this.state, {
			projectsList: {$set: this.getProjectsList(this.props.projects['list'])}
		}));

		window && window.addEventListener('scroll', () => this.changeState(false));
	}

	componentWillUnmount(){
		window && window.removeEventListener('scroll', () => this.changeState(false));
	}

	componentWillReceiveProps(nextprops: any) {
		this.changeState(false);
	}

	getProjectsList = (projects: any) => {
		let list: any = [];

		projects && projects.map((item: any) => {
			list.push({
				value: item.publickey,
				label: item.description
			});
		});

		return list;
	};

	getRowId = (projects: any, activeProject: string) => {
		let active: number = 0;

		for (let k in projects) {
			if (projects.hasOwnProperty(k)){
				if(projects[k].publickey === activeProject) {
					active = Number(k);
					break;
				}
			}
		}

		return active;
	};

	setActiveProject = (value: any) => {
		this.props.loadingState(true)
			.then(() => this.props.setActiveProject(value))
			.then(() => {
				this.props.getSubscribers(this.props.projects['list'][this.props.activeProject]);
			});
	};

	changeState = (state: boolean): any => {
		this.setState({
			showDropdown: state
		});
	};

	render() {
		const {
			projectsList,
			showDropdown
		} = this.state;
		const { activeProject } = this.props;

		return (
			<div className="subscriber_selector">
				{projectsList && projectsList[activeProject] && <div
					className={classNames('subscriber_selector_current', showDropdown && 'subscriber_selector_current-open')}
					onClick={() => this.changeState(!showDropdown)}>
					{projectsList[activeProject].label}
					<IconPlay width="24" height="24" />
				</div>}
				{projectsList && projectsList[activeProject] && showDropdown && <WrappedSelectList
					list={projectsList}
					active={projectsList[activeProject].value}
					onStateChange={() => this.changeState(false)}
					onChange={(value) => this.setActiveProject(this.getRowId(this.props.projects['list'], value))} />}
			</div>
		);
	}
}

class SelectList extends React.Component<{
	disableOnClickOutside: () => void
	enableOnClickOutside: () => void
	list: any
	active: string
	onChange: (value: string) => void
	onStateChange: () => void
}, {}> {
	handleClickOutside = () => this.props.onStateChange();

	render() {
		return (
			<div className="subscriber_selector_drop">
				{this.props.list.map((item: any, index: number) => {
					return <div
						className={classNames('subscriber_selector_item', item.value === this.props.active && 'subscriber_selector_item-current')}
						key={index}
						onClick={() => this.props.onChange(item.value)}>{item.label}</div>
				})}
			</div>
		);
	}
}

const WrappedSelectList = onClickOutside<{
	list: any
	onChange: (value: string) => void
	onStateChange: () => void
	active: string
}>(SelectList);

export default connect(
	state => ({
		activeProject: state.subscribers.activeProject,
		projects: state.projects
	}),
	({
		loadingState: actions.loadingState,
		setActiveProject: actions.setActiveProject,
		getSubscribers:  actions.getSubscribers
	})
)(ProjectsSelector);


