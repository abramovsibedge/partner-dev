import * as React from 'react';
import * as classNames from 'classnames';

import {
	IconClose
} from '../../components/icons'
import '../../static/scss/components/modal.scss';

interface Props {
	trigger: () => void,
	className?: string
}

export default class Modal extends React.Component<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	modalClose() {
		console.log( 123 );
		this.props.trigger();
	}

	render() {
		const {
			className,
			children
		} = this.props;

		return (
			<div className="modal">
				<div className="modal_outer" onClick={() => this.modalClose()}></div>
				<div className="modal_inner">
					{children}
					<button className="modal_close" type="button" onClick={() => this.modalClose()}>
						<IconClose width="24" height="24" />
					</button>
				</div>
			</div>
		);
	}
}


// class Modal extends React.Component {
// 	constructor(...args){
// 		super(...args);
// 		this.handleClickInside = this.handleClickInside.bind(this);
// 		this.handleClickOutside = this.handleClickOutside.bind(this);
// 	}
// 	componentDidMount(){
// 		//create an element to append
// 		this.modal = document.createElement('div');
// 		//append that shit
// 		document.body.appendChild(this.modal);
// 		//call the render method to add custom styled div and children contents to appended element
// 		this.renderModalContent(this.props);
// 	}
// 	componentWillReceiveProps(newProps){
// 		this.renderModalContent(newProps);
// 	}
// 	componentWillUnmount(){
// 		//act like this shit was never here ever
// 		ReactDOM.unmountComponentAtNode(this.modal);
// 		document.body.removeChild(this.modal);
// 	}
// 	handleClickInside(e){
// 		e.stopPropagation();
// 	}
// 	handleClickOutside(){
// 		this.props.closeModal();
// 	}
// 	renderModalContent(props){
// 		//put something in the appended shit
// 		let cont;
// 		ReactDOM.render(
// 			<div id='modal-container'>
// 				<div className='overlay'></div>
// 				<div className='modal' onClick={this.handleClickOutside}>
// 					<div className='modal-content' onClick={this.handleClickInside}>
// 						{this.props.children}
// 					</div>
// 				</div>
// 			</div>,
// 			this.modal
// 		);
// 		cont = document.getElementById('modal-container');
// 		if (props.isActive){
// 			cont.classList.add('active');
// 		} else {
// 			cont.classList.remove('active');
// 		}
// 	}
// 	render(){
// 		//don't render anything here because we are appending to the body portal style ahhhh yissssss
// 		return null;
// 	}
// }