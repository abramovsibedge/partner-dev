import React, {Component} from 'react';
import {connect} from 'react-redux'

class Main extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render()
    {

        return (
            <div>
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