import React, {Component} from 'react';
import {connect} from 'react-redux'

class Signup extends Component
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
                Signup
            </div>
        )
    }
}

export default connect(
    state => ({
    }),({
    })
)(Signup)