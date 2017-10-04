import * as React from 'react';
import { connect } from 'react-redux';
import * as update from 'immutability-helper';
import { hashHistory } from 'react-router';

import Loading from './Loading';
import Dashboard from '../../components/dashboard';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import Header from './Header';
import Body from './Body';

import * as actions from '../../reducers/projects/actions';
import { checkAuth } from '../../utils';

import '../../static/scss/routes/project.scss';

interface Props {
	loading: boolean
  projects: any
  params: any
  selectedProject: any

  loadProjects: () => void
  getProject: (id:string) => void
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
  }
  findProject(array: Array<any>, value:any) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].publickey === value) return array[i];
    }
    return {};
	}

	componentDidMount() {
    if (!checkAuth()) {
      hashHistory.push('/auth/signin');
      return false;
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
			<Dashboard current="project">
				<DashboardHeader>
					<Header onUpdate={() => this.reloadProjects()} />
				</DashboardHeader>
				{loading ? <Loading /> :
            <Body
                selectedProject={selectedProject}
                project={project} />
				}
			</Dashboard>
		);
	}
}

export default connect(
    state => ({
      projects: state.projects.list,
      loading: state.projects.loading,
      selectedProject: state.projects.selectedProject,
    }),
    ({
      loadProjects: actions.getProjects,
      getProject: actions.getProject
    })
)(Project);