import React from 'react';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames/bind';

// import s from '../../static/scss/main.scss';
// const cx = classnames.bind(s);

export class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                404
            </div>
        );
    }
}