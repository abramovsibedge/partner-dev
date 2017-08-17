import React, {Component} from 'react';
import {connect} from 'react-redux'

class Reset extends Component
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
                Reset
            </div>
        )
    }
}

export default connect(
    state => ({
    }),({
    })
)(Reset)