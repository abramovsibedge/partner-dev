import React, {Component} from 'react';

class AppRoot extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default AppRoot;