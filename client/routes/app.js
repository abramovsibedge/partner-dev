import React from 'react';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames/bind';

import s from '../static/scss/main.scss';
const cx = classnames.bind(s);
import '../static/favicon.ico';

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