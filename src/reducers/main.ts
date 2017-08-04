import * as React from 'react';
import axios from 'axios';

const initState = {};

export default function main(state = initState, action:any) {
    var result = Object.assign({}, state);
    return result;
}