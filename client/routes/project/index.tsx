import * as React from 'react';
import { connect } from 'react-redux';
import * as update from 'immutability-helper';
import { hashHistory } from 'react-router';

import Loading from './Loading';
import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import Header from './Header';
import ProjectItem from './ProjectItem';

import * as actions from '../../reducers/projects/actions';
import { checkAuth, logOut } from '../../utils';

import '../../static/scss/routes/project.scss';

interface Props {
	loading: boolean
  projects: any
  params: any
  selectedProject: any
  update_project: boolean
  reload_project: boolean

  loadProjects: () => void
  getProject: (id:string) => void
  delettUserProject: (project: string, email: string)=>void
  changeVisibility: (project: string, country: string, visibility: boolean)=>void
  editProject: (project: string, description: string)=>void
}
interface State {
	project: any;
}

class Project extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);
    this.state = {
      project: {}
    }
	}

  componentWillReceiveProps(nextProps: any) {
	  if (
		    nextProps.projects.length>0 && !this.state.project.publickey
    ) {
			let elem:any = this.findProject(nextProps.projects, this.props.params.key);
			this.setState({project: elem});
			this.props.getProject(this.props.params.key);
    }
    if (nextProps.reload_project && nextProps.reload_project != this.props.reload_project) {
      this.props.getProject(this.props.params.key);
    }
    if (nextProps.update_project && nextProps.update_project != this.props.update_project) {
      hashHistory.push('/projects');
    }
  }
  findProject(array: Array<any>, value:any) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].publickey === value) return array[i];
    }
    return {};
	}

	componentDidMount() {
    if (!checkAuth()) {
			logOut();
    } else {
      this.props.loadProjects();
    }
	}

	reloadProjects = () => {
		this.setState(update(this.state, {
			loading: {$set: true},
		}), () => this.componentDidMount());
	};

	render() {
    const {
      project
    } = this.state;
		const {
      loading,
      selectedProject
		} = this.props;


		return (
			<Dashboard current="projects">
				<DashboardHeader>
					<Header onUpdate={() => this.reloadProjects()} />
				</DashboardHeader>
				{loading ? <Loading /> : <ProjectItem project={project} data={selectedProject} />}
			</Dashboard>
		);
	}
}

export default connect(
    state => ({
			loading: state.projects.loading,
      projects: state.projects.list,
      selectedProject: state.projects.selectedProject,


      update_project: state.projects.update_project,
      reload_project: state.projects.reload_project,
    }),
    ({
      loadProjects: actions.getProjects,
      getProject: actions.getProject,
      changeVisibility: actions.changeVisibility
    })
)(Project);