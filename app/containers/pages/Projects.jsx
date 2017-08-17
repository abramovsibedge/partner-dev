import React, {Component} from 'react';
import {connect} from 'react-redux'

class Projects extends Component
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
                Projects
            </div>
        )
    }
}

export default connect(
    state => ({
    }),({
    })
)(Projects)