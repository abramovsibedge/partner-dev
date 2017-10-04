import * as React from 'react';

import {
	IconClose,
	IconPen,
  IconPlus,
  Flags
} from '../../../components/icons';

import {
  Checkbox
} from '../../../components/form';


interface Props {
  project: any
  selectedProject: any
}

interface State {
	blockShow: number
}

class Body extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
      blockShow: 1
		}
	}

  handleShowBlock(num:number) {
		this.setState({
			blockShow: num
		})
  }
  setVisibility(project: string, country: string, visibility: boolean) {

  }

	render() {
		const {
      blockShow
		} = this.state;
		const {
			project,
      selectedProject
		} = this.props;

		let listCountries = (<div></div>);
    let listAccess = (<div></div>);

    if (selectedProject.countries) {
    	listCountries = selectedProject.countries.countries.map((e:any, t:any)=>{
        return (
						<div className="item cell-blocks" key={t}>
							<div>
								<div className="item-country">
									<Flags type={e.country} />
									<p>{e.country}</p>
								</div>
							</div>
							<div>
								<p>{e.protocols.join(', ')}</p>
							</div>
							<div>
								<Checkbox
										className="project_edit_checkbox"
										checked={e.visibility}
										onChange={() => this.setVisibility(project.publickey, e.country, !e.visibility)}>&nbsp;</Checkbox>
							</div>
						</div>
				);
			});
      listAccess = selectedProject.emails.usersMail.map((e:any, t:any)=>{
      	return (
						<div className="item cell-blocks" key={t}>
							<div>
								<p>{e}</p>
							</div>
							<div>

							</div>
							<div>
								<p className="user-delete">
									<IconClose width="24px" height="24px" fill="#ef6359" />
								</p>
							</div>
						</div>
				);
			});
    }

		let content = (<h1 className="layout_h1">Project not found</h1>);
		if (project.publickey) {
      content=(
      		<div className="project-info">

						<div className="top">
							<div className="left">
								<div className="img">
									<img src={require('../../../static/media/def-icon.png')} alt="def" />
								</div>
								<h1 className="layout_h1">{project.publickey}</h1>
							</div>
							<div className="right">
								<div>
									<IconPen width="24px" height="24px" fill="#f5f4f2" />
									<p>Edit project</p>
								</div>
								<div>
									<IconClose width="24px" height="24px" fill="#ef6359" />
									<p>Delete project</p>
								</div>
							</div>
						</div>

						<div className="details">
							<div className="description">
                <p>{project.description}</p>
							</div>
							<div className="private-key">
								<p className="name">Private Key</p>
                <p>{project.privatekey}</p>
							</div>
							<div className="url">
								<p className="name">URL</p>
								<p>https://backend.northghost.com</p>
							</div>
						</div>

						<div className="settings-project">
							<div className="top-settings-project">
								<div className="left">
									<div className={(blockShow == 1) ? "active" : ""} onClick={()=>{this.handleShowBlock(1)}}>
										VPN Servers
									</div>
									<div className={(blockShow == 2) ? "active" : ""} onClick={()=>{this.handleShowBlock(2)}}>
										Access
									</div>
								</div>
								<div className="right">
									<IconPlus width="24px" height="24px" fill="#36c75a" />
									<p>Add access email</p>
								</div>
							</div>

							<div className={(blockShow == 1) ? "info-settings-project" : "info-settings-project hidden"}>
								<header className="cell-blocks">
									<div>
										Country
									</div>
									<div>
										Protocols
									</div>
									<div>
										Visibility
									</div>
								</header>
								{listCountries}
							</div>

							<div className={(blockShow == 2) ? "info-settings-project" : "info-settings-project hidden"}>
								<header className="cell-blocks">
									<div>
										User
									</div>
									<div></div>
									<div></div>
								</header>
								{listAccess}
							</div>
						</div>

					</div>
			);
		}

		return (
			<section className="layout">
						{content}
			</section>
		);
	}
}

export default Body;