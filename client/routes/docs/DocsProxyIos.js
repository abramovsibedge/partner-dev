"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../../static/scss/routes/docs.scss");
class DocsProxyIos extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "docsDiv" },
            React.createElement("h1", { id: "before-you-start" }, "Before You Start"),
            React.createElement("p", null, "In order to be able to use the SDK, the following steps have to be done:"),
            React.createElement("ol", null,
                React.createElement("li", null,
                    "Register an account at ",
                    React.createElement("a", { href: "https://developer.anchorfree.com" }, "developer.anchorfree.com")),
                React.createElement("li", null,
                    "Create a project and use a name for your project as a ",
                    React.createElement("em", null, "Public Key"),
                    ". ",
                    React.createElement("em", null, "Private key"),
                    " is optional."),
                React.createElement("li", null,
                    "Use SDK with a ",
                    React.createElement("code", null, `carrierId`),
                    " equals to the given ",
                    React.createElement("em", null, "Public Key"),
                    " and ",
                    React.createElement("code", null, `baseURLString`),
                    " equals to ",
                    React.createElement("em", null, "URL"),
                    " from the project details.")),
            React.createElement("h1", { id: "hydrakit" }, "HydraKit"),
            React.createElement("p", null, "HydraKit is created to help developers to achieve anti-blocking features for mobie applications. This toolkit protects all qualifying HTTP/HTTPS requests across the application."),
            React.createElement("h3", { id: "features" }, "Features"),
            React.createElement("ul", null,
                React.createElement("li", null, "Protects your API calls from being blocked by IP address or DNS name."),
                React.createElement("li", null, "Protects your API calls from being eavesdropped by third-party."),
                React.createElement("li", null, "Protects user data such as cookies, tokens and sessions across the application.")),
            React.createElement("h2", { id: "installation" }, "Installation"),
            React.createElement("h3", { id: "framework-static-" }, "Framework (static)"),
            React.createElement("p", null,
                "Download ",
                React.createElement("a", { href: "https://firebasestorage.googleapis.com/v0/b/web-portal-for-partners.appspot.com/o/products%2FHydraKit.framework.zip?alt=media&token=ed306210-7743-4d13-8689-38d55bcc32d6" }, "HydraKit.framework for iOS")),
            React.createElement("p", null,
                "Add ",
                React.createElement("strong", null, "HydraKit.framework"),
                " to your project."),
            React.createElement("p", null,
                "In your project: ",
                React.createElement("em", null, "Project"),
                " > ",
                React.createElement("em", null, "Build Settings"),
                ":"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Set \"Enable bitcode\" to ",
                    React.createElement("strong", null, "NO")),
                React.createElement("li", null,
                    "Set \"Other Linker Flags\" to ",
                    React.createElement("code", null, `-ObjC`),
                    ".")),
            React.createElement("p", null,
                "In your project: ",
                React.createElement("em", null, "Project"),
                " > ",
                React.createElement("em", null, "General"),
                ":"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Add ",
                    React.createElement("code", null, `libz.tbd`),
                    " to ",
                    React.createElement("strong", null, "Linked Frameworks and Libraries"),
                    ".")),
            React.createElement("h2", { id: "getting-started" }, "Getting Started"),
            React.createElement("p", null,
                "First, configure ",
                React.createElement("code", null, `HydraKit`),
                " with API backend ",
                React.createElement("code", null, `baseURLString`),
                " and ",
                React.createElement("code", null, `carrierId`),
                ":"),
            React.createElement("pre", null,
                React.createElement("code", null, `#import <HydraKit/HydraKit.h>

// ...

NSString *baseURLString = @"{Your Base URL String}";
NSString *carrierId = @"{Your Carrier ID}";
AFPHydraKitConfig *hydraKitConfig = [AFPHydraKitConfig hydraKitConfigWithBaseURLString:baseURLString carrierId:carrierId];

[HydraKit appDidLaunch:hydraKitConfig];
`)),
            React.createElement("p", null,
                "The best place to initialize ",
                React.createElement("code", null, `HydraKit`),
                " with ",
                React.createElement("code", null, `AFPHydraKitConfig`),
                " is"),
            React.createElement("pre", null,
                React.createElement("code", null, `- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
`)),
            React.createElement("p", null,
                "method of your ",
                React.createElement("code", null, `AppDelegate`),
                " implementation."),
            React.createElement("p", null, "HydraKit can work in two modes:"),
            React.createElement("p", null,
                "1.\u00C2 Protected ",
                React.createElement("code", null, `NSURLSession`),
                " on-demand."),
            React.createElement("p", null,
                "2.\u00C2 Protect all qualifying ",
                React.createElement("code", null, `NSURLSession`),
                " instances and ",
                React.createElement("code", null, `NSURLConnection`),
                " instances across the application (this mode also protects all WebView requests)."),
            React.createElement("h3", { id: "1-nsurlsession-on-demand" },
                "1. ",
                React.createElement("code", null, `NSURLSession`),
                " on-demand"),
            React.createElement("p", null,
                "If your application is fully compatible with ",
                React.createElement("code", null, `NSURLSession`),
                " then it's a good option to protect your API calls by acquiring protected ",
                React.createElement("code", null, `NSURLSession`),
                " instance. Change your code to work with ",
                React.createElement("code", null, `NSURLSession`),
                " in async way:"),
            React.createElement("pre", null,
                React.createElement("code", null, `[HydraKit protectedURLSessionWithCompletion:^(NSURLSession *session) {
    [self sendRequest:request withSesssion:session];
}];
`)),
            React.createElement("p", null,
                "Whenever anti-blocking services are ready, you'll get ",
                React.createElement("code", null, `session`),
                " instance that is protected."),
            React.createElement("h3", { id: "2-automatic-protection" }, "2. Automatic protection"),
            React.createElement("p", null,
                "If your application uses mixed both ",
                React.createElement("code", null, `NSURLSession`),
                " and ",
                React.createElement("code", null, `NSURLConnection`),
                ", or you just want to do everything automagically \u00E2\u20AC\u201C then call register protocol function:"),
            React.createElement("pre", null,
                React.createElement("code", null, `[HydraKit registerURLProtocol];
`)),
            React.createElement("p", null, "This function registers special URL protocol that protects your app API requests (both HTTP and HTTPS) and routes it to anti-blocking services. If you're don't need protection anymore, unregister protection protocol:"),
            React.createElement("pre", null,
                React.createElement("code", null, `[HydraKit unregisterURLProtocol];
`)),
            React.createElement("blockquote", null,
                React.createElement("p", null,
                    React.createElement("strong", null, "NOTE:"),
                    " Do not use ",
                    React.createElement("code", null, `[HydraKit protectedURLSessionWithCompletion: /* ... */ ]`),
                    " in this case.")),
            React.createElement("h2", { id: "example" }, "Example"),
            React.createElement("p", null,
                "Here is a simple example of protected ",
                React.createElement("strong", null, "GET"),
                " request to some URL."),
            React.createElement("pre", null,
                React.createElement("code", null, `@import HydraKit;

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
`)),
            React.createElement("p", null,
                "After this code executes, ",
                React.createElement("code", null, `responseData`),
                " should have a page that shows different IP address."),
            React.createElement("h2", { id: "status" }, "Status"),
            React.createElement("p", null,
                "HydraKit allows you to monitor its current status (",
                React.createElement("code", null, `HydraKitStatus`),
                " enum) by subscribing to ",
                React.createElement("code", null, `kHydraKitStatusChangedNotification`),
                " notification via ",
                React.createElement("code", null, `NSNotificationCenter`),
                " instance."),
            React.createElement("pre", null,
                React.createElement("code", null, `#import <HydraKit/HydraKit.h>

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
`)),
            React.createElement("h2", { id: "handling-errors" }, "Handling Errors"),
            React.createElement("p", null,
                "Along with a status, HydraKit also might send an ",
                React.createElement("code", null, `NSError`),
                " error as a part of ",
                React.createElement("code", null, `NSNotification`),
                "'s ",
                React.createElement("code", null, `userInfo`),
                ". Subscribe for ",
                React.createElement("code", null, `kHydraKitStatusChangedNotification`),
                " notification as described in ",
                React.createElement("strong", null, "Status"),
                " section and process notification."),
            React.createElement("pre", null,
                React.createElement("code", null, `if (notification.userInfo &amp;&amp; notification.userInfo[@"lastError"]) {
    NSError *hydraError = notification.userInfo[@"lastError"];
    NSLog(@"hydraError: %@", hydraError.localizedDescription);
}
`)),
            React.createElement("p", null,
                "Latest error the HydraKit has encountered is available through ",
                React.createElement("code", null, `HydraKit.sharedKit.lastError`),
                ".")));
    }
}
exports.DocsProxyIos = DocsProxyIos;
//# sourceMappingURL=DocsProxyIos.js.map