import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Loading from './Loading';
import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import ProjectItem from './ProjectItem';

import * as actions from '../../reducers/project/actions';
import { getProjects } from '../../reducers/projects/actions';
import { checkAuth, logOut } from '../../utils';

import { IconPlus } from '../../components/icons'

import '../../static/scss/routes/project.scss';

interface Props {
	params: any
	loading: boolean
	loadProjects: () => void
	getProject: (id: string) => void
	projectsList: any
}
interface State {
	project: any;
	hash: string
}

class Project extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);
    this.state = {
      project: {},
			hash: this.props.params.key
    }
	}

  componentWillReceiveProps(nextProps: any) {
		if (nextProps.projectsList.length > 0 && !this.state.project.publickey) {
			let elem: any = this.findProject(nextProps.projectsList, this.props.params.key);
			this.setState({
				project: elem
			});

			this.props.getProject(this.props.params.key);
		}
		if (nextProps.params.key !== this.state.hash) {
			window.location.reload();
		}
  }

  findProject = (projects: any, value: any) => {
		let result: any = {};

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].publickey === value) {
				result = projects[i];
				break;
			}
    }

    return result;
	};

	componentDidMount() {
		checkAuth() ?  this.props.loadProjects() : logOut();
	}

	render() {
    const { project } = this.state;
		const { loading } = this.props;

		return (
			<Dashboard current="projects">
				<DashboardHeader>
					<Link to="createproject" className="button is-transparent">
						<IconPlus width="24" height="24"/>
						<span>Add project</span>
					</Link>
				</DashboardHeader>
				{loading ? <Loading /> : <ProjectItem project={project} />}
			</Dashboard>
		);
	}
}

export default connect(
	state => ({
		loading: state.project.loading,
		projectsList: state.projects.list
	}),
	({
		loadProjects: getProjects,
		getProject: actions.getProject
	})
)(Project);