import * as firebase from 'firebase';


export const signIn = (login:string, password: string) => {

    return firebase.auth().signInWithEmailAndPassword(login, password)
        .then(function(){

            return firebase.auth().onAuthStateChanged((user: any) => {
                if (user) {
                    // save in localstorage
					let data = JSON.stringify({firebaseToken: user.De});
                    localStorage.setItem('tokens', data);
                }
                else {

				}
            });



        })
        .catch(function (error: any) {
        	let data =  {type: 'error', error: error};
            return data;
        });

};

export const signUp = (state:any)  => {
    return firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
        .then(function(){

            return firebase.auth().onAuthStateChanged(() => {

                firebase.auth().currentUser.sendEmailVerification().then(() => {}, (error: any) => {
                	console.log(error);
                });

                firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                    first_name: state.firstName,
                    last_name: state.lastName,
                    company: state.companyName,
                    email: state.email,
                    plan: state.productsSelected,
                    users: state.numberOfUsersSelected,
                    tos: Math.floor((new Date()).getTime() / 1000),
                    first: true
                });

            });
        })
        .catch(function (error: any) {
            return {
                error: true,
                message: error.message
            }
        });
}

export const reset = ($email:any)  => {
    return firebase.auth().sendPasswordResetEmail($email).then(() => {
        return {
            error: false
        }
    }).catch(function(error: any) {
        return {
            error: true,
            message: error.message
        }
    });
}

//TODO need edit
export const check = ()  => {
    let tokens = JSON.parse(localStorage.getItem('tokens'));
	// get token
	// console.log('tokens', tokens);

    console.log(firebase);
    firebase.auth().signOut()
        .then(
            () => {
                localStorage.removeItem('tokens');
                window.location.replace("/");
            }
        )
        .catch((e)=> {
            console.log(e);
        })
}

//TODO need edit
export const logOut = ()  => {
    firebase.auth().signOut()
		.then(
			() => {
				localStorage.removeItem('tokens');
				window.location.replace("/");
			}
		)
		.catch((e)=> {
    		console.log(e);
		})
}

