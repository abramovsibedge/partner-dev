import * as React from 'react';

import '../../static/scss/routes/docs.scss';

export class DocsProxyIos extends React.Component<{}, {}> {

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
		<li>Create a project and use a name for your project as a <em>Public Key</em>. <em>Private key</em> is optional.</li>
		<li>Use SDK with a <code>{`carrierId`}</code> equals to the given <em>Public Key</em> and <code>{`baseURLString`}</code> equals to <em>URL</em> from the project details.</li>
	</ol>
	<h1 id="hydrakit">HydraKit</h1>
	<p>HydraKit is created to help developers to achieve anti-blocking features for mobie applications. This toolkit protects all qualifying HTTP/HTTPS requests across the application.</p>
	<h3 id="features">Features</h3>
	<ul>
		<li>Protects your API calls from being blocked by IP address or DNS name.</li>
		<li>Protects your API calls from being eavesdropped by third-party.</li>
		<li>Protects user data such as cookies, tokens and sessions across the application.</li>
	</ul>
	<h2 id="installation">Installation</h2>
	<h3 id="framework-static-">Framework (static)</h3>
	<p>Download <a href="https://firebasestorage.googleapis.com/v0/b/web-portal-for-partners.appspot.com/o/products%2FHydraKit.framework.zip?alt=media&amp;token=ed306210-7743-4d13-8689-38d55bcc32d6">HydraKit.framework for iOS</a></p>
	<p>Add <strong>HydraKit.framework</strong> to your project.</p>
	<p>In your project: <em>Project</em> > <em>Build Settings</em>:</p>
	<ul>
		<li>Set "Enable bitcode" to <strong>NO</strong></li>
		<li>Set "Other Linker Flags" to <code>{`-ObjC`}</code>.</li>
	</ul>
	<p>In your project: <em>Project</em> > <em>General</em>:</p>
	<ul>
		<li>Add <code>{`libz.tbd`}</code> to <strong>Linked Frameworks and Libraries</strong>.</li>
	</ul>
	<h2 id="getting-started">Getting Started</h2>
	<p>First, configure <code>{`HydraKit`}</code> with API backend <code>{`baseURLString`}</code> and <code>{`carrierId`}</code>:</p>
	<pre><code>{`#import <HydraKit/HydraKit.h>

// ...

NSString *baseURLString = @"{Your Base URL String}";
NSString *carrierId = @"{Your Carrier ID}";
AFPHydraKitConfig *hydraKitConfig = [AFPHydraKitConfig hydraKitConfigWithBaseURLString:baseURLString carrierId:carrierId];

[HydraKit appDidLaunch:hydraKitConfig];
`}</code></pre><p>The best place to initialize <code>{`HydraKit`}</code> with <code>{`AFPHydraKitConfig`}</code> is</p>
	<pre><code>{`- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
`}</code></pre><p>method of your <code>{`AppDelegate`}</code> implementation.</p>
	<p>HydraKit can work in two modes:</p>
	<p>1.Â Protected <code>{`NSURLSession`}</code> on-demand.</p>
	<p>2.Â Protect all qualifying <code>{`NSURLSession`}</code> instances and <code>{`NSURLConnection`}</code> instances across the application (this mode also protects all WebView requests).</p>
	<h3 id="1-nsurlsession-on-demand">1. <code>{`NSURLSession`}</code> on-demand</h3>
	<p>If your application is fully compatible with <code>{`NSURLSession`}</code> then it&#39;s a good option to protect your API calls by acquiring protected <code>{`NSURLSession`}</code> instance. Change your code to work with <code>{`NSURLSession`}</code> in async way:</p>
	<pre><code>{`[HydraKit protectedURLSessionWithCompletion:^(NSURLSession *session) {
    [self sendRequest:request withSesssion:session];
}];
`}</code></pre><p>Whenever anti-blocking services are ready, you&#39;ll get <code>{`session`}</code> instance that is protected.</p>
	<h3 id="2-automatic-protection">2. Automatic protection</h3>
	<p>If your application uses mixed both <code>{`NSURLSession`}</code> and <code>{`NSURLConnection`}</code>, or you just want to do everything automagically â€“ then call register protocol function:</p>
	<pre><code>{`[HydraKit registerURLProtocol];
`}</code></pre><p>This function registers special URL protocol that protects your app API requests (both HTTP and HTTPS) and routes it to anti-blocking services. If you&#39;re don&#39;t need protection anymore, unregister protection protocol:</p>
	<pre><code>{`[HydraKit unregisterURLProtocol];
`}</code></pre><blockquote>
	<p><strong>NOTE:</strong> Do not use <code>{`[HydraKit protectedURLSessionWithCompletion: /* ... */ ]`}</code> in this case.</p>
</blockquote>
	<h2 id="example">Example</h2>
	<p>Here is a simple example of protected <strong>GET</strong> request to some URL.</p>
	<pre><code>{`@import HydraKit;

// ...

NSURL *URL = [NSURL URLWithString:@"http://ip-api.com/json"];
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:URL];
[request setHTTPMethod:@"GET"];

[HydraKit protectedURLSessionWithCompletion:^(NSURLSession *session) {
  NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
   completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
      NSString *responseData = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  }];

  [dataTask resume];
}];
`}</code></pre><p>After this code executes, <code>{`responseData`}</code> should have a page that shows different IP address.</p>
	<h2 id="status">Status</h2>
	<p>HydraKit allows you to monitor its current status (<code>{`HydraKitStatus`}</code> enum) by subscribing to <code>{`kHydraKitStatusChangedNotification`}</code> notification via <code>{`NSNotificationCenter`}</code> instance.</p>
	<pre><code>{`#import <HydraKit/HydraKit.h>

// ...

[HydraKit.sharedKit.notificationCenter addObserver:self
                                          selector:@selector(hydraKitDidChangeStatus:)
                                              name:kHydraKitStatusChangedNotification
                                            object:nil];

// ...

- (void)hydraKitDidChangeStatus:(NSNotification *)notification {

    switch (HydraKit.sharedKit.status) {
        case HydraKitStatusStatusStopped:
            NSLog(@"> Stopped");
            break;

        case HydraKitStatusStatusStarting:
            NSLog(@"> Starting");
            break;

        case HydraKitStatusStatusStarted:
            NSLog(@"> Started");
            break;

        case HydraKitStatusStatusStopping:
            NSLog(@"> Stopping");
            break;

        case HydraKitStatusStatusRecovering:
            NSLog(@"> Recovering");
            break;
    }
}
`}</code></pre><h2 id="handling-errors">Handling Errors</h2>
	<p>Along with a status, HydraKit also might send an <code>{`NSError`}</code> error as a part of <code>{`NSNotification`}</code>&#39;s <code>{`userInfo`}</code>. Subscribe for <code>{`kHydraKitStatusChangedNotification`}</code> notification as described in <strong>Status</strong> section and process notification.</p>
	<pre><code>{`if (notification.userInfo &amp;&amp; notification.userInfo[@"lastError"]) {
    NSError *hydraError = notification.userInfo[@"lastError"];
    NSLog(@"hydraError: %@", hydraError.localizedDescription);
}
`}</code></pre><p>Latest error the HydraKit has encountered is available through <code>{`HydraKit.sharedKit.lastError`}</code>.</p>
</div>
		);
	}
}