import * as React from 'react';

import '../static/scss/app.scss';

export class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}