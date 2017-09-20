import * as React from 'react';

import '../../static/scss/routes/docs.scss';

export class DocsVpnIos extends React.Component<{}, {}> {

	constructor(props: any) {
		super(props);
	}

	render() {
		return (
<div className="docsDiv">
	<h1 id="before-you-start">Before You Start</h1>
	<p>In order to be able to use the SDK, the following steps have to be done:</p>
	<ol>
		<li>Register an account at <a href="https://developer.anchorfree.com">developer.anchorfree.com</a></li>
		<li>Create a project and use a name for your project as a <em>Public Key</em>. Private key* is optional.</li>
		<li>Use SDK with a <code>{`carrierId`}</code> equals to the given <em>Public Key</em> and <code>{`baseURLString`}</code> equals to <em>URL</em> from the project details.</li>
	</ol>
	<h1 id="caketube">CakeTube</h1>
	<p>iOS SDK is a part of Anchorfree SDK which contains of client-side libraries and server-side applications needed to implement custom VPN infrastructure.</p>
	<h3 id="features">Features</h3>
	<p>The iOS SDK provides API containing:</p>
	<ul>
		<li>Classes and methods to authorize client users</li>
		<li>Ability to connect to backend VPN service</li>
	</ul>
	<h3 id="requirements">Requirements</h3>
	<p>iOS VPN SDK available only for iOS 8+ devices. </p>
	<h2 id="installation">Installation</h2>
	<h3 id="framework-static-">Framework (static)</h3>
	<p>Download <a href="https://firebasestorage.googleapis.com/v0/b/web-portal-for-partners.appspot.com/o/products%2FCakeTubeSDK-iOS.framework.zip?alt=media&amp;token=bf3b1181-72c7-4122-b34d-aa0d21f3bed5">CakeTubeSDK.framework for iOS</a></p>
	<p>Add <strong>CakeTubeSDK.framework</strong> to your project.</p>
	<p>Add following frameworks to your project dependendencies:</p>
	<ul>
		<li><strong>NetworkExtension</strong></li>
		<li><strong>Security</strong></li>
	</ul>
	<p>In your project: <em>Project</em> &gt; <em>Build Settings</em> set "Other linker flags" to <code>{`-ObjC`}</code>.</p>
	<h2 id="ios-library-api">iOS library API</h2>
	<p>There are two main services intended to manage user and VPN connections. </p>
	<ul>
		<li><code>{`CTClientService`}</code></li>
		<li><code>{`CTConnectionService`}</code></li>
	</ul>
	<h2 id="getting-started">Getting Started</h2>
	<p>First, configure <code>{`CTClientService`}</code> with list of your API backend <code>{`baseURL`}</code>s and <code>{`carrierId`}</code>:</p>
	<pre><code>{`[[CTClientService sharedInstance] configureWithBaseURLs:@[@"https://api.example.com"] carrierId:@â€Your PublicKeyâ€];
`}</code></pre><p>The best place to initialize with <code>{`baseUrl`}</code> is </p>
	<pre><code>{`- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
`}</code></pre><p>method of your <code>{`AppDelegate`}</code> implementation. Then if you not already signed in your user, provide OAuth dialogs and receive OAuth access token, to login with PartnerSDK:</p>
	<pre><code>{`[[CTClientService sharedInstance] loginWithOAuthToken:@â€Your OAuth tokenâ€ complete:^(NSError *error, CTUserProfile *subscriber)
    {
        // You can store subscriber for debugging
        // â€¦
}];
`}</code></pre><p>Or use the anonymous login if your app does not require user authentication:</p>
	<pre><code>{`[CTClientService.sharedInstance loginWithOAuthToken:nil authMethod:CTClientServiceAuthMethodAnonymous complete:^(NSError *error, CTUserProfile *subscriber) {
    // ...
}];
`}</code></pre><p>This is only need to be run once on first login. Session will be saved internally and can only be removed with logout method. After user is logged in â€“ all API service methods is available. </p>
	<p><strong>NOTE:</strong> VPN connection methods of <code>{`CTConnectionService`}</code> are not available before users signed in.</p>
	<h3 id="ctclientservice">CTClientService</h3>
	<p>Manages client user: authentication, user licensing info, session management. Session will be saved after first successful sign in and destroyed and cleaned up after logout.</p>
	<h4 id="ctclientservice-api">CTClientService API</h4>
	<pre><code>{`+ (CTClientService *)sharedInstance;
`}</code></pre><p> Get shared instance of service. Service is a singleton.</p>
	<pre><code>{` - (void)loginWithOAuthToken:(NSString *)accessToken complete:(CTLoginBlock)completeBlock;
`}</code></pre><p>User sign in with OAuth access token.</p>
	<pre><code>{`- (void)getSubscriberInfo:(CTUserProfileBlock)completeBlock;
`}</code></pre><p>Retrieve user's information and current license.</p>
	<pre><code>{`- (void)getServers:(CTServersBlock)completeBlock;
`}</code></pre><p>Retrieve available servers with geographic location info. The <code>{`CTServersBlock`}</code> contains servers array (Array of <code>{`CTServerLocation`}</code> objects).</p>
	<pre><code>{`- (void)getTrafficStats:(CTCountersBlock)completeBlock;
`}</code></pre><p>Retrieve traffic stats for current session. </p>
	<p><strong>NOTE:</strong> <code>{`CTCounters`}</code> contains the <code>{`tx`}</code> and <code>{`rx`}</code> values. Use <code>{`tx`}</code> as received traffic (IN) (bytes), and <code>{`rx`}</code> as transmitted traffic (OUT) (bytes) (TX and RX are in terms of server traffic)</p>
	<pre><code>{`- (BOOL)isLoggedIn;
`}</code></pre><p>Checks if current user is logged in.</p>
	<pre><code>{`- (void)logout
`}</code></pre><p>Log out and destroy session information. User will be deauthorized and session will be destroyed after invocation.</p>
	<pre><code>{`- (void)setCurrentServer:(NSString *)location;
`}</code></pre><p>Sets the current server. The location should be in short <em>ISO 3166</em> format, the best practice is to get the location from the <code>{`getServers:`}</code> method, and use <code>{`CTServerLocation`}</code> objectâ€™s <code>{`location`}</code> string as a parameter to this method. If you havenâ€™t used this method, the server will be chosen randomly by backend.</p>
	<h3 id="ctconnectionservice">CTConnectionService</h3>
	<p>Manages device's VPN connection. To establish VPN connection in iOS 9, the VPN SDK will asks once with service configuration. To establish VPN connection in iOS 8 user should manually add client certificate to their device, the SDK will pops installation dialog for user.</p>
	<h4 id="ctconnectionservice-api">CTConnectionService API</h4>
	<pre><code>{`+ (CTConnectionService *)sharedInstance;
`}</code></pre><p>Get shared instance of service. Service is a singleton.</p>
	<pre><code>{`@property (atomic, strong) NSNotificationCenter *notificationCenter
`}</code></pre><p>Retrieve notification center to receive VPN state notifications. Notification delivers with <code>{`CTConnectionServiceStatusDidChangeNotification`}</code>, the status is available in userInfo as:</p>
	<pre><code>{`NSDictionary *userInfo = @{@"newStatus": @(status), @"oldStatus": @(_status)};
`}</code></pre><p><strong>NOTE:</strong> to handle VPN connection state you may implement proper notification handling. See <code>{`CTConnectionServiceStatus`}</code> enum for more info about VPN state.</p>
	<pre><code>{`@property (atomic) CTConnectionServiceStatus status;
`}</code></pre><p>Current VPN state</p>
	<pre><code>{`- (void)connectWithCompletion:(void (^)(NSError *error))completion;
`}</code></pre><p>Primary connection method. This method will configure application's VPN profile, makes it active and connects to remote host. Completion function contains error object which is not <code>{`nil`}</code> if error occured. See the available <code>{`NSError`}</code> list in the <strong>Handling Errors</strong> session.</p>
	<pre><code>{` - (void)disconnectWithCompletion:(void (^)(NSError *error))completion;
`}</code></pre><p>Disconnects from current connection. Completion function contains error object which is not <code>{`nil`}</code> if error occured.</p>
	<h3 id="ctconnectionservicestatus">CTConnectionServiceStatus</h3>
	<p>Enum containing VPN connection state notifications. To receive and handle notification you should subscribe to <code>{`NSNotificationCenter`}</code> notifications.</p>
	<pre><code>{`CTConnectionServiceStatusUndefined
CTConnectionServiceStatusInvalid
CTConnectionServiceStatusDisconnected
CTConnectionServiceStatusConfiguring
CTConnectionServiceStatusConnecting
CTConnectionServiceStatusConnected
CTConnectionServiceStatusDisconnecting
`}</code></pre><h3 id="blocks-signatures">Blocks signatures</h3>
	<pre><code>{`typedef void (^CTLoginBlock)        (NSError *error, CTUserProfile *subscriber);
typedef void (^CTCredentialsBlock)    (NSError *error, CTCredentials *credentials);
typedef void (^CTUserProfileBlock)    (NSError *error, CTUserProfile *subscriber);
typedef void (^CTServersBlock)        (NSError *error, NSArray *servers);
typedef void (^CTCountersBlock)        (NSError *error, CTCounters *countersResponse);
`}</code></pre><h3 id="handling-errors">Handling Errors</h3>
	<p>In some cases, such as exceeded user traffic or if user reaches the available devices/session limit and also the connection issues, the SDK methods return <code>{`NSError`}</code> object associated with that error in itâ€™s completion block.</p>
	<p>To implement error handling in your app, always check the <code>{`NSError`}</code> in completion blocks, itâ€™s nil if there is no errors.</p>
	<p>The <code>{`NSError`}</code> can contain two domains, the most important one is the <code>{`CTNetworkClientErrorDomain`}</code>. Such error contains code which is the <code>{`CTNetworkClientError`}</code> enum value (enum is available in <em>CTNetworkClient.h</em>). You can compare that code to the possible code list and handle this error in your VPN client app. Here is a description of the enum:</p>
	<pre><code>{`CTNetworkClientErrorUndefined,
CTNetworkClientErrorSessionsExceed,
CTNetworkClientErrorUserSuspended,
CTNetworkClientErrorTrafficExceed,
CTNetworkClientErrorUnauthorized,
CTNetworkClientErrorServerUnavailable,
CTNetworkClientErrorError,
CTNetworkClientErrorDevicesExceed
`}</code></pre><p>For the <code>{`CTNetworkClientErrorDomain`}</code> error there is also server code string available in userInfo (Key <code>{`@"message"`}</code>), in some cases it may be nil. This code string could be used in your app debug logs.</p>
	<p><strong>NOTE:</strong> to support just the basics of error handling implement this check in the <code>{`connectWithCompletion:`}</code> method of the <code>{`CTConnectionService`}</code>. The most of possible error will be available here.</p>
	<p>The second domain is a simple string constant <code>{`@"com.northghost.afvpn"`}</code>. This kind of <code>{`NSError`}</code> is rare and occurs if the SDK is misconfigured or used incorrectly, see the device logs for resolution.</p>
</div>
		);
	}
}