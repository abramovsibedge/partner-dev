// root
import AppRoot from '../containers/Index';

// pages
import Main from '../containers/pages/Main';
import Projects from '../containers/pages/Projects';
import Subscribers from '../containers/pages/Subscribers';


//Auth
import Auth from '../containers/auth/Auth';
import Signin from '../containers/auth/Signin';
import Signup from '../containers/auth/Signup';
import Reset from '../containers/auth/Reset';





const routes = [
    { component: AppRoot,
        routes: [
            { path: '/',
                exact: true,
                component: Main
            },
            { path: '/projects',
                exact: true,
                component: Projects
            },
            { path: '/subscribers',
                exact: true,
                component: Subscribers
            },

            // auth
            { path: '/auth',
                exact: true,
                component: Auth
            },
            { path: '/auth/signin',
                component: Signin
            },
            { path: '/auth/signup',
                component: Signup
            },
            { path: '/auth/reset',
                component: Reset
            },
        ]
    },
];


export default routes;