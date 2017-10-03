import * as React from 'react';
import * as update from 'immutability-helper';

import {
  IconPlus,
  IconClose
} from '../../../components/icons'

import {
  Form,
  FormRow,
  Input,
  Select
} from '../../../components/form';

import {Button} from '../../../components/button';


interface Props {
  createProject: (data: object)=> void
}

interface State {
  addProjectObject: object
  productTypes: any
}

class Create extends React.Component<Props, State> {
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
        validationState: true,
        message: ''
      },
		}
	}

	addProjectHandler = (value: string, stateItem: string) => {
    let newState = {};
    newState['addProjectObject'] = {[stateItem]: {$set: value}};
    this.setState(update(this.state, newState));
  };

  addProjectSubmit = ()=>{
    const $t = this;
    const $state = $t.state;
    let state: boolean = true;
    let message: string = '';

    if (!$state.addProjectObject['public_key'] || !$state.addProjectObject['project_type']) {
      state = false;
      message += 'Fill in the highlighted fields.';
    }

    $t.setState(update($state, {
      addProjectObject: {
        validationState: {$set: false},
        message: {$set: message}
      }
    }));

    if (!state && message) return false;

    this.props.createProject($state.addProjectObject);
	};

	render() {
    const {
      addProjectObject,
      productTypes,
    } = this.state;

		return (
				<section className="layout">
					<div className="create-project">
						<h1 className="layout_h1">Create your first project</h1>
						<Form submit={() => this.addProjectSubmit()} className="modal_form">
								<FormRow>
									<Input
											type="text"
											label="Public Key"
											value={addProjectObject['public_key']}
											notValid={!addProjectObject['validationState'] && !addProjectObject['public_key']}
											onChange={(e) => this.addProjectHandler(e.target.value, 'public_key')}>
									</Input>
								</FormRow>
								<FormRow>
									<Input
											type="text"
											label="Private Key"
											value={addProjectObject['private_key']}
											onChange={(e) => this.addProjectHandler(e.target.value, 'private_key')}>
									</Input>
								</FormRow>
								<FormRow>
									<Input
											type="text"
											label="Description"
											value={addProjectObject['description']}
											onChange={(e) => this.addProjectHandler(e.target.value, 'description')}>
									</Input>
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

								<button className="button-create" type="submit">Create project</button>

						</Form>
					</div>
				</section>
		);
	}
}

export default Create;
