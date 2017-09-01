import * as React from 'react';

import '../../static/scss/routes/docs.scss';

export class DocsVpnAndroid extends React.Component<{}, {}> {

	constructor(props: any) {
		super(props);
	}

	render() {
		return (
<div className="docsDiv">
	<h1 id="get-api-key">Get API Key</h1>
	<p>In order to be able to use the SDK the following steps have to be done:</p>
	<ol>
		<li>Register an account at <a href="https://developer.anchorfree.com">developer.anchorfree.com</a></li>
		<li>Create a project and use a name for your project as a <em>Public Key</em>. <em>Private key</em> is optional.</li>
		<li>Use SDK with a <strong>carrier_id</strong> equals to the given <em>PublicKey</em>.</li>
	</ol>
	<h1 id="prerequisites">Prerequisites</h1>
	<p>Android 4+ (API 14+, starting with Ice Cream Sandwich).</p>
	<ol>
		<li>Add following permissions to your manifest:</li>
	</ol>
	<pre><code className="lang-xml">{`<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
`}</code></pre>
	<h1 id="installing">Installing</h1>
	<h2 id="gradle">Gradle</h2>
	<ol>
		<li>Add jitpack repo to root <strong>build.gradle</strong>:</li>
	</ol>
	<pre><code className="lang-groovy">{`repositories {
    maven {
        url "https://jitpack.io"        
    }
}
`}</code></pre>
	<ol>
		<li>Add sdk dependency to project <strong>build.gradle</strong></li>
	</ol>
	<pre><code className="lang-groovy">{`    compile 'com.github.AnchorFreePartner:cake-tube-sdk-android:1.2.1'
`}</code></pre>
	<p>Setup Android Advertising ID by including the Google Play Services 4.0+ into your project and add the following line to your project's AndroidManifest.xml as a child of the "application" tag:</p>
	<pre><code className="lang-xml">{`<application>
    <meta-data
        android:name="com.google.android.gms.version"
        android:value="@integer/google_play_services_version" />
</application>
`}</code></pre>
	<p>Then your project is ready to use SDK.</p>
	<h1 id="android-library-api">Android library API</h1>
	<p>There are two main services intended to manage user and VPN connections. </p>
	<ul>
		<li>AFClientService</li>
		<li>AFConnectionService</li>
	</ul>
	<h2 id="authentication">Authentication</h2>
	<p>Anchorfree Partner VPN Backend supports OAuth authentication with a partners OAuth server, this is a primary authentication method. </p>
	<p>Steps to implement OAuth:</p>
	<ul>
		<li>Deploy and configure OAuth service. Service should be publicly available in Internet.</li>
		<li>Configure Partner Backend to use OAuth service.</li>
		<li>Implement client OAuth for your application</li>
		<li>Retrieve access token in client app, this token will be used to initialize and sign in Android Partner SDK</li>
	</ul>
	<h2 id="afclientservice-api">AFClientService API</h2>
	<p>Manages client user: authentication, vpn credentials retrieval, user licensing info, session management. Session will be saved after first successful sign in and destroyed and cleaned up after logout.</p>
	<p>Required place to create this service is an Application singleton class.</p>
	<h2 id="afclientservice-builder">AFClientService.Builder</h2>
	<pre><code className="lang-java">{`/*

Client service configurator.

*/

//Create new builder instance within android Context (application or activity).
public Builder(Context context)

//Sets a list of host urls. Used instead of setHostUrl. If your backend infrastructure supports multiple hosts use this to initialize client service. NOTE: Current active host is selected randomly. If host is not reachable, next random host will be selected from the list.
public Builder setHostUrls(List<String> hostUrls)

//Sets a backend API host. This is your main endpoint. Used instead of setHostUrls.
public Builder setHostUrl(String url)

//Sets the unique carrier identifier.
public Builder setCarrierId(String carrierId)

//Sets maximum connection retries to one bcakend host. Default value is 2.
public Builder setConnectionRetries(int count

//Creates AFClientService instance from current configurator.
public AFClientService build()
`}</code></pre>
	<h2 id="afconnectionservice">AFConnectionService</h2>
	<pre><code className="lang-java">{`/*
Manages device's VPN connection. To establish VPN connection user should manually add client 
certificate to their device: will be asked once with service configuration.

This service wraps ServiceConnection which is used to communicate with VPN client service and 
manage connection. You should call onStart and onStop servicesâ€™ methods in activity. To embed 
Android VPN confirmation dialog you should also call onActivityResult method in your activity. 
Service configured with a builder (See AFConnectionService.Builder).
NOTE: to handle VPN connection state you must implement proper notification handling. 
See VPNConnectionState.

*/

// Creates Builder instance to configure and create AFConnectionService. 
// Context - is your activity context.
public static Builder newBuilder(Context context);

//Called on Activity onStart. Required.
public void onStart();

//Called on Activity onStop. Required.
public void onStop();

//Called on Activity onDestroy. This is recommended call.
public void onDestroy();

//Called on Activity onActivity result. Required.
public void onActivityResult(int requestCode, int resultCode, Intent data);


/*
Primary connection method. This method will configure and connect application's VPN (Android asks 
user to confirm VPN Permission on first run). Activity is required argument, if there were no VPN 
Permission request before. When SDK requires VPN Permission from user, you will receive 
onVPNPermissionRequested callback. If activity was null, you have to call this function once again,
but providing it correct activity. Your activity method onActivityResult 
SHOULD call AFConnectionService onActivityResult instance method. 
For more info see VPNConnectionStateListener. 
*/
public void connect(CredentialsResponse credentials, Activity activity)

//Disconnects from current connection.
public void disconnect();

//Receives VPN traffic stats object. If connection is inactive, traffic data will be zeroes. 
// See class TrafficStats.
public TrafficStats getTrafficStats();
`}</code></pre>
	<h2 id="trafficstats">TrafficStats</h2>
	<pre><code className="lang-java">{`
/*
Returns in and out bytes for current session (for the last hour). Will be zero, 
if connection is not active.
 */
public long getBytesIn();
public long getBytesOut();

//Returns VPN start time (UNIX) in milliseconds.
public long getStartTime();
`}</code></pre>
	<h2 id="vpnconnectionstate">VPNConnectionState</h2>
	<pre><code className="lang-java">{`/*
Enum containing basic VPN connection states. To receive and handle notification you should be 
subscribed to service connection callbacks (see ServiceConnectionCallbacks).
 */
public enum VPNConnectionState {NOT_CONNECTED, CONNECTING, CONNECTED}
`}</code></pre>
	<h2 id="afconnectionservice-builder">AFConnectionService.Builder</h2>
	<pre><code className="lang-java">{`/*
Configures and connects remote VPN service to your application.
 */

//Sets connection callbacks listener. Connection callbacks are called while service is connected 
// or disconnected to your activity.
public Builder addConnectionCallbacksListener(ServiceConnectionCallbacks listener)

//Sets Androidâ€™s status bar notification icon.
public Builder setNotificationIcon(int resId)

//Sets VPN connection name in status bar notifications.
public Builder setName(String vpnName)

//Sets connection state listener. Connection state listener will update VPN connection state info.
public Builder addVPNConnectionStateListener(VPNConnectionStateListener listener)


//Creates AFConnectionService instance based on your parameters.
public AFConnectionService build()
`}</code></pre>
	<h2 id="clientserviceapi-methods">ClientServiceAPI methods</h2>
	<pre><code className="lang-java">{`//Creates AFClientService.Builder configurator instance to setup AFClientService.
public static Builder newBuilder(Application application);

//User sign in with OAuth access token.
public void login(final String oauthAccessToken, final Action1<LoginResponse> onLoginSuceess, final Action1<Throwable> onLogoutError)

//Returns authentication status. True if logged in, false otherwise. If user is authenticated itâ€™s OK to use rest of the functions.
public boolean isLoggedIn();

//Sets the SDK to pause VPN connection when device screen is off.
public void setPauseVPNWhenScreenOff(boolean pause);

//Disconnects VPN when the network is changed. Default value: false.
public void setDisconnectWhenNetworkChanged(boolean pause);

//Changes default number of server reconnections (5) for all API requests.
public void setApiConnectionsRetry(int retryCount);

//Retrieve VPN credentials object. Credentials are cached on client-side for 24 hours. If they are expired - credential request will be sent to backend. User needs to be authorized. 
public void getCredentials(final Action1<CredentialsResponse> onCredentialsSuccess, final Action1<Throwable> onCredentialsError)

//Retrieve user's information and current license.
public Observable<SubscriberResponse> getSubscriber(final Action1<SubscriberResponse> onSubscriberSuccess, final Action1<Throwable> onSubscriberError)

//Log out and destroy session information. User will be deauthorized and session will be destroyed after invocation.
public Observable<LogoutResponse> logout(final Action1<LogoutResponse> onLogoutSuccess, final Action1<Throwable> onLogoutError)
`}</code></pre>
	<h2 id="serviceconnectioncallbacks">ServiceConnectionCallbacks</h2>
	<pre><code className="lang-java">{`//Called when AFConnectionService is connected to activity. After this callback service 
//is ready to manage VPN connection.
public void onConnected()

//Called when AFConnectionService is disconnected from activity. cause - is a code identifying 
//reason service is disconnected.
public void onConnectionSuspended(int cause)
`}</code></pre>
	<h2 id="vpnconnectionstatelistener">VPNConnectionStateListener</h2>
	<pre><code className="lang-java">{`/*
Called when AFConnectionService VPN connection state changes. state - is a new VPN 
connection state.
 */
public void onVPNConnectionStateChanged(VPNConnectionState state)

/*
Called when SDK requires explicit on-demand VPN Permission from user.
 */
void onVPNPermissionRequested();

/*
Called when SDK received permission or deny from user.
 */
void onVPNPermissionGranted(boolean granted);
`}</code></pre>
	<h1 id="handling-errors">Handling errors</h1>
	<p>All methods have two callback functions: onSuccess, onFailure. Failure callback comes with
		Throwable object which is a good start to check what went wrong. There are several types of
		exceptions which may be generated during API methods request.</p>
	<ul>
		<li><strong>InternalErrorException</strong> - Something went wrong on the server side. General error.</li>
		<li><strong>NetworkRelatedException</strong> - There was a network error during request: timeout, no connection, etc.</li>
		<li><strong>ServerUnavailableException</strong> - Happens when client requested credentials from VPN node which is
			offline or unavailable.</li>
		<li><strong>TrafficExceedException</strong> - Userâ€™s traffic limit is exceeded.</li>
		<li><strong>SessionsExceedException</strong> - Too many sessions from one client.</li>
		<li><strong>UnauthorizedException</strong> - User is unauthorized for that request or not logged in.</li>
	</ul>	
</div>
		);
	}
}