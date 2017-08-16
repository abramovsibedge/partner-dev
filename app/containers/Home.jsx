import React, {Component} from 'react';
import {connect} from 'react-redux'


class Home extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            showTest: false
        }
    }

    render()
    {

        return (
            <div>
                home
            </div>
        )
    }
}

export default connect(
    state => ({
    }),({
    })
)(Home)