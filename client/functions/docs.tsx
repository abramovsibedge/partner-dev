export const getDocsList = () => {
	return new Promise(resolve => {
		resolve(
			JSON.parse(
				`[
  {
    "title":"SDK Android",
    "description":"bla-bla-bla",
    "url":"https://firebasestorage.googleapis.com/v0/b/web-portal-for-partners.appspot.com/o/md%2Fproxy_sdk_android.md?alt=media&token=3bc5c2be-beb3-4d5e-8efb-607edd9bd8ae",
    "product":[
      "VPN",
      "Proxy"
    ],
    "platform":[
      "Android"
    ],
    "protocol":[
      "IPSec",
      "Hydra"
    ],
    "type": [
    	"quickstart"
    ]
  },
  {
    "title":"SDK IOS",
    "description":"bla-bla-bla",
    "url":"https://firebasestorage.googleapis.com/v0/b/web-portal-for-partners.appspot.com/o/md%2Fproxy_sdk_android.md?alt=media&token=3bc5c2be-beb3-4d5e-8efb-607edd9bd8ae",
    "product":[
      "VPN",
      "Proxy"
    ],
    "platform":[
      "IOS"
    ],
    "protocol":[
      "IPSec"
    ],
    "type": [
    	"quickstart",
    	"sdk"
    ]
  },
  {
    "title":"SDK Windows",
    "description":"bla-bla-bla",
    "url":"https://firebasestorage.googleapis.com/v0/b/web-portal-for-partners.appspot.com/o/md%2Fproxy_sdk_android.md?alt=media&token=3bc5c2be-beb3-4d5e-8efb-607edd9bd8ae",
    "product":[
      "VPN"
    ],
    "platform":[
      "Windows"
    ],
    "protocol":[
      "openVPN",
      "Hydra"
    ],
    "type": [
    	"quickstart",
    	"api"
    ]
  },
  {
    "title":"SDK Mac",
    "description":"bla-bla-bla",
    "url":"https://firebasestorage.googleapis.com/v0/b/web-portal-for-partners.appspot.com/o/md%2Fproxy_sdk_android.md?alt=media&token=3bc5c2be-beb3-4d5e-8efb-607edd9bd8ae",
    "product":[
      "VPN",
      "VPN for Business"
    ],
    "platform":[
      "OSX"
    ],
    "protocol":[
      "openVPN"
    ],
    "type": [
    	"quickstart"
    ]
  }
]`
			)
		);
	});
};

export const getArticle = (url: string) => {
	/* load article via url */

	return new Promise(resolve => {
		resolve(
			`# Get API Key

In order to be able to use the SDK the following steps have to be done:

1. Register an account at [developer.anchorfree.com](https://developer.anchorfree.com)
2. Create a project
3. Use SDK with a **carrier_id** equals to the given *PublicKey*.

# Prerequisites

Android 4+ (API 14+, starting with Ice Cream Sandwich).

1. Add following permissions to your manifest:

\`\`\`xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
\`\`\`

# Installing

## Gradle

1. Add jitpack repo to root **build.gradle**:

\`\`\`groovy
repositories {
    maven {
        url "https://jitpack.io"        
    }
}
\`\`\`

2. Add sdk dependency to project **build.gradle**

\`\`\`groovy
    compile 'com.github.AnchorFreePartner:cake-tube-sdk-android:1.2.1'
\`\`\`

Setup Android Advertising ID by including the Google Play Services 4.0+ into your project and add the following line to your project's AndroidManifest.xml as a child of the <application> tag:

\`\`\`xml
<application>
    <meta-data
        android:name="com.google.android.gms.version"
        android:value="@integer/google_play_services_version" />
</application>
\`\`\`

Then your project is ready to use SDK.


# Android library API

There are two main services intended to manage user and VPN connections. 

- AFClientService
- AFConnectionService

## Authentication

Anchorfree Partner VPN Backend supports OAuth authentication with a partners OAuth server, this is a primary authentication method. 

Steps to implement OAuth:

- Deploy and configure OAuth service. Service should be publicly available in Internet.
- Configure Partner Backend to use OAuth service.
- Implement client OAuth for your application
- Retrieve access token in client app, this token will be used to initialize and sign in Android Partner SDK

## AFClientService API

Manages client user: authentication, vpn credentials retrieval, user licensing info, session management. Session will be saved after first successful sign in and destroyed and cleaned up after logout.

Required place to create this service is an Application singleton class.

## AFClientService.Builder

\`\`\`java
/*

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

\`\`\`

## AFConnectionService

\`\`\`java
/*
Manages device's VPN connection. To establish VPN connection user should manually add client 
certificate to their device: will be asked once with service configuration.

This service wraps ServiceConnection which is used to communicate with VPN client service and 
manage connection. You should call onStart and onStop services’ methods in activity. To embed 
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

\`\`\`

## TrafficStats

\`\`\`java

/*
Returns in and out bytes for current session (for the last hour). Will be zero, 
if connection is not active.
 */
public long getBytesIn();
public long getBytesOut();

//Returns VPN start time (UNIX) in milliseconds.
public long getStartTime();

\`\`\`

## VPNConnectionState

\`\`\`java
/*
Enum containing basic VPN connection states. To receive and handle notification you should be 
subscribed to service connection callbacks (see ServiceConnectionCallbacks).
 */
public enum VPNConnectionState {NOT_CONNECTED, CONNECTING, CONNECTED}
\`\`\`

## AFConnectionService.Builder

\`\`\`java
/*
Configures and connects remote VPN service to your application.
 */

//Sets connection callbacks listener. Connection callbacks are called while service is connected 
// or disconnected to your activity.
public Builder addConnectionCallbacksListener(ServiceConnectionCallbacks listener)

//Sets Android’s status bar notification icon.
public Builder setNotificationIcon(int resId)

//Sets VPN connection name in status bar notifications.
public Builder setName(String vpnName)

//Sets connection state listener. Connection state listener will update VPN connection state info.
public Builder addVPNConnectionStateListener(VPNConnectionStateListener listener)


//Creates AFConnectionService instance based on your parameters.
public AFConnectionService build()

\`\`\`
## ClientServiceAPI methods

\`\`\`java
//Creates AFClientService.Builder configurator instance to setup AFClientService.
public static Builder newBuilder(Application application);

//User sign in with OAuth access token.
public void login(final String oauthAccessToken, final Action1<LoginResponse> onLoginSuceess, final Action1<Throwable> onLogoutError)

//Returns authentication status. True if logged in, false otherwise. If user is authenticated it’s OK to use rest of the functions.
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


\`\`\`

## ServiceConnectionCallbacks

\`\`\`java
//Called when AFConnectionService is connected to activity. After this callback service 
//is ready to manage VPN connection.
public void onConnected()

//Called when AFConnectionService is disconnected from activity. cause - is a code identifying 
//reason service is disconnected.
public void onConnectionSuspended(int cause)

\`\`\`

## VPNConnectionStateListener

\`\`\`java
/*
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
\`\`\`

# Handling errors

All methods have two callback functions: onSuccess, onFailure. Failure callback comes with 
Throwable object which is a good start to check what went wrong. There are several types of 
exceptions which may be generated during API methods request.

- **InternalErrorException** - Something went wrong on the server side. General error.
- **NetworkRelatedException** - There was a network error during request: timeout, no connection, etc.
- **ServerUnavailableException** - Happens when client requested credentials from VPN node which is 
offline or unavailable.
- **TrafficExceedException** - User’s traffic limit is exceeded.
- **SessionsExceedException** - Too many sessions from one client.
- **UnauthorizedException** - User is unauthorized for that request or not logged in.`
		)
	})
}