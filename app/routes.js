import AppRoot from './containers/Index';
import Home from './containers/Home';
import Main from './containers/Main';

const routes = [
    { component: AppRoot,
        routes: [
            { path: '/',
                exact: true,
                component: Home
            },
            { path: '/home',
                component: Home
            },
            { path: '/main',
                component: Main
            }
        ]
    }
];

export default routes;