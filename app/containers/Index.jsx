import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Route from 'react-router-dom/Route';
import { renderRoutes } from 'react-router-config';

class AppRoot extends Component {
    render() {
        return (
            <div>
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}

export default AppRoot;