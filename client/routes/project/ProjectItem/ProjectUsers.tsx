import * as React from 'react';
import * as classNames from 'classnames';
import Modal from 'react-modal';

import { IconClose } from '../../../components/icons';
import {Button} from '../../../components/button';

interface Props {
	users: any
	onChange: (email: string) => void
}

interface State {
	stickedTableHead: boolean
	deleteUserModalState: boolean
	emailForDelete: string
}

class ProjectUsers extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			stickedTableHead: false,
			deleteUserModalState: false,
			emailForDelete: ''
		}
	}

	componentDidMount() {
		window && window.addEventListener('scroll', this.stickTableHead);
	}

	componentWillUnmount() {
		window && window.removeEventListener('scroll', this.stickTableHead);
	}

	stickTableHead = () => {
		let {stickedTableHead} = this.state;

		window && window.scrollY > 240 ?
			!stickedTableHead && this.setState({stickedTableHead: true})
			:
			stickedTableHead && this.setState({stickedTableHead: false});
	};

	toggleModal(state: boolean, email: string) {
		this.setState({
			deleteUserModalState: state,
			emailForDelete: email
		});
	}

	deleteUser(email: string) {
		this.props.onChange(email);
		this.toggleModal(false, '');
	}

	render() {
		const { users } = this.props;
		const {
			stickedTableHead,
			deleteUserModalState,
			emailForDelete
		} = this.state;

		console.log( users );

		return (<div className="table main_table">
			<div className={classNames("table_head", stickedTableHead && "table_head_sticked")}>
				<table>
					<tbody>
					<tr>
						<td style={{width: '90%'}}>User</td>
						<td style={{width: '10%'}}>&nbsp;</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div className="table_body">
				{users.map((item: any, index: any) => {
					return (<div className={classNames('table_row')} key={index}>
						<div className="table_row_wrapper">
							<div className="table_cell" style={{width: '90%'}}>
								<div className="table_cell_content">{item}</div>
							</div>
							<div className="table_cell" style={{width: '10%'}}>
								<div className="table_cell_content">
									<button className="project_user-delete" onClick={() => this.toggleModal(true, item)}>
										<IconClose width="24" height="24" />
									</button>
								</div>
							</div>
						</div>
					</div>);
				})}
			</div>

			<Modal
				isOpen={deleteUserModalState}
				className={{base: 'modal_inner'}}
				overlayClassName={{base: 'modal_outer'}}
				contentLabel="test">
				<div className="modal_header">
					<h2>Delete user</h2>
				</div>
				<div className="modal_content is-text-center">Do you really want to delete user?</div>
				<div className="modal_footer">
					<button className="modal_btn modal_btn-reset" type="button" onClick={() => this.toggleModal(false, '')}>
						Cancel
					</button>
					<button className="modal_btn modal_btn-submit action-button" type="button" onClick={() => this.deleteUser(emailForDelete)}>
						Delete user
					</button>
				</div>
				<Button type="button" className="modal_close" onClick={() => this.toggleModal(false, '')}>
					<IconClose width="24" height="24"/>
				</Button>
			</Modal>
		</div>);
	}
}

export default ProjectUsers;