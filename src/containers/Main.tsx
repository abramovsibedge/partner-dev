import * as React from 'react';
import {connect} from 'react-redux'


class Main extends React.Component
{
    constructor(props:any) {
        super(props);
        this.state = {
        }
    }

    render()
    {
        return (
            <div>
                asss
            </div>
        )
    }
}

export default connect(
    state => ({

    }),({

    })
)(Main)