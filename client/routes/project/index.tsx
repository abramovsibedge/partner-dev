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
	loading: boolean;
  projects: any;
  loadProjects: () => void;
  params: any
}
interface State {
	project: object;
}

class Project extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);
    this.state = {
      project: {}
    }
	}

  componentWillReceiveProps(nextProps: any) {
		if (nextProps.projects.length>0) {
			let elem:object = this.findProject(nextProps.projects, this.props.params.key);
			this.setState({project: elem});
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
		} = this.props;

		return (
			<Dashboard current="project">
				<DashboardHeader>
					<Header onUpdate={() => this.reloadProjects()} />
				</DashboardHeader>
				{loading ? <Loading /> : <Body project={project} />}
			</Dashboard>
		);
	}
}

export default connect(
    state => ({
      projects: state.projects.list,
      loading: state.projects.loading,
    }),
    ({
      loadProjects: actions.getProjects,
    })
)(Project);