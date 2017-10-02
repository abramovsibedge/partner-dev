function loadTemplate(path, email) {
	var XHR = new XMLHttpRequest();
	XHR.onreadystatechange = function(){
		if ( XHR.readyState === 4 ) {
			document.getElementById('templates').innerHTML = XHR.responseText;
			if (email) document.getElementById('ui-container-text-email').innerHTML = email;
		}
	};
	XHR.open('GET', path);
	XHR.send();
};

function handleVerifyEmail(auth, actionCode) {
  auth.applyActionCode(actionCode).then(function(resp) {
		loadTemplate('veryfy_success.html');
  }).catch(function(error) {
		loadTemplate('veryfy_error.html');
  });
};

function handleResetPassword(auth, actionCode) {
	var accountEmail;

	auth.verifyPasswordResetCode(actionCode).then(function (email) {
		var accountEmail = email,
			templateHolder = document.getElementById('templates'),
			newPassword;
			
		loadTemplate('reset_form.html', email);

		templateHolder.addEventListener('submit', function(event){
			event.preventDefault();
			newPassword = event.target.querySelectorAll('input[type="password"]')[0].value;

			auth.confirmPasswordReset(actionCode, newPassword).then(function (resp) {
				loadTemplate('reset_success.html');
			}).catch(function (error) {
				alert( error );
			});
		});		
	}).catch(function (error) {
		alert(error);
	});
};

document.addEventListener('DOMContentLoaded', function () {
	var getParameterByName = function (name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	var mode = getParameterByName('mode'),
			actionCode = getParameterByName('oobCode'),
			apiKey = getParameterByName('apiKey');

	var config = {
			'apiKey': apiKey
		},
		app = firebase.initializeApp(config),
		auth = app.auth();

	switch (mode) {
		case 'verifyEmail':
			handleVerifyEmail(auth, actionCode);
			break;
		case 'resetPassword':
			handleResetPassword(auth, actionCode);
			break;
		default:
		// Error: invalid mode.
	}
}, false);