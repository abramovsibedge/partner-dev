import React from 'react';
import classnames from 'classnames/bind';

// import s from '../../static/scss/main.scss';
// const cx = classnames.bind(s);
import logo from '../../static/react-logo.png';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: false
        }
    }
    showTets(){
        this.setState({test: !this.state.test});
    }
    render() {
        const {test} = this.state;

        let testBlock = (<div></div>);

        if (test) {
            testBlock = (<div className="test">bla bla</div>);
        }

        return (
            <div>
                {testBlock}
                Main
            </div>
        );
    }
}