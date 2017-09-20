"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../../static/scss/routes/docs.scss");
class DocsProxyAndroid extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "docsDiv" },
            React.createElement("h1", { id: "prerequisites" }, "Prerequisites"),
            React.createElement("p", null, "In order to be able to use the SDK the following steps have to be done:"),
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
                    React.createElement("code", null, `baseUrl`),
                    " equals to ",
                    React.createElement("em", null, "URL"),
                    " from the project details.")),
            React.createElement("h1", { id: "hydrakit" }, "HydraKit"),
            React.createElement("p", null, "HydraKit is created to help developers to achieve anti-blocking features for mobie applications. This toolkit protects all qualifying HTTP/HTTPS requests across the application."),
            React.createElement("h3", { id: "features" }, "Features"),
            React.createElement("p", null, "-\u00C2 Protects your API calls from being blocked by IP address or DNS name -\u00C2 Protects your API calls from being eavesdropped by third-party"),
            React.createElement("ul", null,
                React.createElement("li", null, "Protects user data such as cookies, tokens and sessions across the application")),
            React.createElement("h2", { id: "installation" }, "Installation"),
            React.createElement("h1", { id: "gradle" }, "Gradle"),
            React.createElement("ol", null,
                React.createElement("li", null,
                    "Add JitPack repository to your root ",
                    React.createElement("strong", null, "build.gradle"))),
            React.createElement("pre", null,
                React.createElement("code", { className: "lang-groovy" }, `repositories {
    maven {
        url "https://jitpack.io"
    }
}
`)),
            React.createElement("ol", null,
                React.createElement("li", null,
                    "Add sdk dependency to project ",
                    React.createElement("strong", null, "build.gradle"))),
            React.createElement("pre", null,
                React.createElement("code", { className: "lang-groovy" }, `    compile 'com.github.AnchorFreePartner:hydra-proxy-sdk-android:0.1.6'
`)),
            React.createElement("h2", { id: "getting-started" }, "Getting Started"),
            React.createElement("p", null,
                "HydraKit provides ",
                React.createElement("code", null, `Proxy`),
                " instance to use with Android HTTP / okhttp / other clients. Acquire Proxy instance before making HTTP requests, SDK sets environment variables whenever proxy is ready."),
            React.createElement("h2", { id: "first-configure-hydrakit-with-api-backend-baseurl-and-carrierid-add-this-code-to-your-application-class-in-the-oncreate-method-" },
                "First, configure ",
                React.createElement("code", null, `HydraKit`),
                " with API backend ",
                React.createElement("code", null, `baseUrl`),
                " and ",
                React.createElement("code", null, `carrierId`),
                ". Add this code to your ",
                React.createElement("code", null, `Application`),
                " class, in the ",
                React.createElement("code", null, `onCreate`),
                " method:"),
            React.createElement("pre", null,
                React.createElement("code", { className: "lang-java" }, `        HydraKit.onCreate(new HydraKitConfig(this, "{Your Carrier ID}", "{Your Base URL String}"));
`)),
            React.createElement("h3", { id: "proxy-on-demand" }, "Proxy on-demand"),
            React.createElement("p", null, "Change your code to work with HydraKit in async way:"),
            React.createElement("pre", null,
                React.createElement("code", { className: "lang-java" }, `    HydraKit.instance.httpsProxy(new ProxyListener() {
        @Override
        public void proxyAvailable(Proxy proxy) {
            makeAndroidHttpRequest(url, proxy);
        }

        @Override
        public void error(HydraException exception) {
            Log.e(TAG, "error: unable to get proxy", exception);
        }
    });
`)),
            React.createElement("p", null,
                "Whenever anti-blocking services are ready, you'll get ",
                React.createElement("code", null, `Proxy`),
                " instance that should be used with your http client. Environment proxy variables will be set automatically."),
            React.createElement("p", null,
                "NOTE: Make sure you call either ",
                React.createElement("code", null, `httpsProxy`),
                " or ",
                React.createElement("code", null, `httpProxy`),
                " to make it work with HTTPS or HTTP protocols."),
            React.createElement("h3", { id: "hydrakit-state-monitoring" }, "HydraKit state monitoring"),
            React.createElement("p", null,
                "Use ",
                React.createElement("code", null, `HydraKitStateListener`),
                " to monitor network errors and HydraKit states. Generally, it's enough to use only ",
                React.createElement("code", null, `httpsProxy`),
                " function to make simple application."),
            React.createElement("pre", null,
                React.createElement("code", { className: "lang-java" }, `    HydraKit.instance.addListener(new HydraKitStateListener() {
        @Override
        public void stateChanged(HydraKitState state) {
            Log.d(TAG, "stateChanged: " + state.name());
        }

        @Override
        public void onError(HydraException e) {
            Log.d(TAG, "onError: ", e);
        }
    });
`)),
            React.createElement("h2", { id: "example" }, "Example"),
            React.createElement("p", null, "Here is a simple example of protected GET request to HTTPS URL."),
            React.createElement("pre", null,
                React.createElement("code", { className: "lang-java" }, `    HydraKit.instance.httpsProxy(new ProxyListener() {
        @Override
        public void proxyAvailable(Proxy proxy) {
            makeAndroidHttpRequest("http://ip-api.com/json", proxy);
        }

        @Override
        public void error(HydraException exception) {
            Log.e(TAG, "error: unable to get proxy", exception);
        }
    });
`)),
            React.createElement("pre", null,
                React.createElement("code", { className: "lang-java" }, `    private void makeAndroidHttpRequest(final String url, final Proxy proxy) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    HttpURLConnection connection;
                    if (proxy != null) {
                        connection = (HttpURLConnection) new URL(url).openConnection(proxy);
                    } else {
                        connection = (HttpURLConnection) new URL(url).openConnection();
                    }

                    try {
                        InputStream in = connection.getInputStream();
                        String result = readStream(in);
                        Log.d(TAG, "Android HTTP Result is: " + result);
                    } finally {
                        connection.disconnect();
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Exception while making request", e);
                }
            }
        });
    }
`)),
            React.createElement("pre", null,
                React.createElement("code", { className: "lang-java" }, `    public String readStream(InputStream inputStream) throws Exception {
        final int bufferSize = 1024;
        final char[] buffer = new char[bufferSize];
        final StringBuilder out = new StringBuilder();
        Reader in = new InputStreamReader(inputStream, "UTF-8");
        for (; ; ) {
            int rsz = in.read(buffer, 0, buffer.length);
            if (rsz &lt; 0) { break; }
            out.append(buffer, 0, rsz);
        }
        return out.toString();
    }
`)),
            React.createElement("p", null,
                "After this code executes, ",
                React.createElement("code", null, `result`),
                " should have a page that shows different tnan yours IP address.")));
    }
}
exports.DocsProxyAndroid = DocsProxyAndroid;
//# sourceMappingURL=DocsProxyAndroid.js.map