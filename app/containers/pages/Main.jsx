import React, {Component} from 'react';
import {connect} from 'react-redux'

class Main extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            test: false
        }
    }
    showTets(){
        this.setState({test: !this.state.test});
    }
    render()
    {
        const {test} = this.state;

        let testBlock = (<div></div>);
        if (test) {
            testBlock = (<div className="test">bla bla</div>);
        }
        return (
            <div>
                <div className="show" onClick={()=>this.showTets()}>show test</div>
                {testBlock}
                Main
            </div>
        )
    }
}

export default connect(
    state => ({
    }),({
    })
)(Main)