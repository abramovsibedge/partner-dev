import * as React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as update from 'immutability-helper';

import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';

import * as actions from '../../reducers/projects/actions';

import {
	Form,
	FormRow,
	Input,
	Select,
	Textarea
} from '../../components/form';
import { Button } from '../../components/button';

import '../../static/scss/routes/projects.scss';

interface Props {
  createProjectResult: boolean
  createProject: (data: object)=> void
}

interface State {
	addProjectObject: object
	productTypes: any
	message: string
}

class CreateProjects extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			productTypes: [{
				value: "proxy",
				label: "Proxy"
			}, {
				value: "public_vpn",
				label: "Public VPN"
			}, {
				value: "private_vpn",
				label: "Private VPN"
			}],
			addProjectObject: {
				public_key: '',
				private_key: '',
				description: '',
				project_type: '',
				validationState: true
			},
			message: ''
		}
	}

  componentWillReceiveProps(nextProps: any) {
		if (nextProps.createProjectResult.type === 'error') {
			this.setState(update(this.state, {
				message: { $set: nextProps.createProjectResult.reason }
			}));
		}

    if (nextProps.createProjectResult.type === 'success') {
      hashHistory.push('/projects');
    }
  }

	addProjectHandler = (value: string, stateItem: string) => {
		this.setState(update(this.state, {
			addProjectObject: {
				[stateItem]: { $set: value }
			}
		}));
	};

	addProjectSubmit = ()=>{
		const $t = this;
		const $state = $t.state;
		let state: boolean = true;
		let message: string = '';

		if (!$state.addProjectObject['public_key']
			|| !$state.addProjectObject['project_type']
			|| !$state.addProjectObject['private_key']) {
			state = false;
			message += 'Fill in the highlighted fields.';
		}

		$t.setState(update($state, {
			addProjectObject: {
				validationState: { $set: false },
				message: { $set: message }
			}
		}));

		if (!state && message) return false;

		this.props.createProject($state.addProjectObject);
	};

	render() {
		const {
			addProjectObject,
			productTypes,
			message
		} = this.state;

		return (
			<Dashboard current="projects">
				<DashboardHeader />
				<section className="layout">
					<header className="layout_head">
						<div className="layout_head_content layout_head_content-centered">
							<h1 className="layout_h1">Create your first project</h1>
						</div>
					</header>
					<div className="layout_content create-project">
						<div className="create-project_error">{message}</div>
						<Form submit={() => this.addProjectSubmit()} className="create-project_form">
							<FormRow>
								<Input
									type="text"
									label="Public Key"
									value={addProjectObject['public_key']}
									notValid={!addProjectObject['validationState'] && !addProjectObject['public_key']}
									onChange={(e) => this.addProjectHandler(e.target.value, 'public_key')} />
							</FormRow>
							<FormRow>
								<Input
									type="text"
									label="Private Key"
									value={addProjectObject['private_key']}
									notValid={!addProjectObject['validationState'] && !addProjectObject['private_key']}
									onChange={(e) => this.addProjectHandler(e.target.value, 'private_key')} />
							</FormRow>
							<FormRow>
								<Textarea
									label="Description"
									value={addProjectObject['description']}
									className="create-project_textarea"
									onChange={(e) => this.addProjectHandler(e.target.value, 'description')} />
							</FormRow>
							<FormRow>
								<Select
									notValid={!addProjectObject['validationState'] && !addProjectObject['project_type']}
									value={addProjectObject['project_type']}
									options={productTypes}
									onChange={(e) => this.addProjectHandler(e.target.value, 'project_type')}>
									Project type
								</Select>
							</FormRow>

							<Button className="create-project_submit" type="submit">Create project</Button>
						</Form>
					</div>
				</section>
			</Dashboard>
		);
	}
}

export default connect(
	state => ({
		createProjectResult: state.projects.createProjectResult
	}),
	({
		createProject: actions.createProject
	})
)(CreateProjects);