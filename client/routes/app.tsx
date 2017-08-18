import * as React from 'react';
import { Link, IndexLink } from 'react-router';

import '../static/scss/main.scss';

// import '../static/favicon.ico';

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