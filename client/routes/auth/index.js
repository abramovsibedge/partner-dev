import React from 'react';
import classnames from 'classnames/bind';

// import s from '../../static/scss/main.scss';
// const cx = classnames.bind(s);
import '../../static/favicon.ico';

export class Auth extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
    }
    render() {
        return (
            <div>
                auth
                {this.props.children}
            </div>
        );
    }
}