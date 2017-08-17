import React, {Component} from 'react';
import {connect} from 'react-redux'

class Subscribers extends Component
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
                Subscribers
            </div>
        )
    }
}

export default connect(
    state => ({
    }),({
    })
)(Subscribers)