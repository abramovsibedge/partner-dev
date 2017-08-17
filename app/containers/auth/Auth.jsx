import React, {Component} from 'react';
import {connect} from 'react-redux'

class Auth extends Component
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
                Auth
            </div>
        )
    }
}

export default connect(
    state => ({
    }),({
    })
)(Auth)