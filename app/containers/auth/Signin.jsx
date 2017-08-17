import React, {Component} from 'react';
import {connect} from 'react-redux'

class Signin extends Component
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
                Signin
            </div>
        )
    }
}

export default connect(
    state => ({
    }),({
    })
)(Signin)