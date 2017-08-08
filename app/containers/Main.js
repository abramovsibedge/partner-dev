import * as React from 'react';
import {connect} from 'react-redux'


class Main extends React.Component
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
                got it!
            </div>
        )
    }
}

export default connect(
    state => ({
    }),({
    })
)(Main)