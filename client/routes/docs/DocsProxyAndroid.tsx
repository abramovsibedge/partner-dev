import * as React from 'react';

import '../../static/scss/routes/docs.scss';

export class DocsProxyAndroid extends React.Component<{}, {}> {

	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className="docsDiv">
				<h1 id="prerequisites">Prerequisites</h1>
				<p>In order to be able to use the SDK the following steps have to be done:</p>
				<ol>
					<li>Register an account at <a href="https://developer.anchorfree.com">developer.anchorfree.com</a></li>
					<li>Create a project and use a name for your project as a <em>Public Key</em>. <em>Private key</em> is optional.</li>
					<li>Use SDK with a <code>{`carrierId`}</code> equals to the given <em>Public Key</em> and <code>{`baseUrl`}</code> equals to <em>URL</em> from the project details.</li>
				</ol>
				<h1 id="hydrakit">HydraKit</h1>
				<p>HydraKit is created to help developers to achieve anti-blocking features for mobie applications. This toolkit protects all qualifying HTTP/HTTPS requests across the application.</p>
				<h3 id="features">Features</h3>
				<p>-Â Protects your API calls from being blocked by IP address or DNS name
					-Â Protects your API calls from being eavesdropped by third-party</p>
				<ul>
					<li>Protects user data such as cookies, tokens and sessions across the application</li>
				</ul>
				<h2 id="installation">Installation</h2>
				<h1 id="gradle">Gradle</h1>
				<ol>
					<li>Add JitPack repository to your root <strong>build.gradle</strong></li>
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
				<pre><code className="lang-groovy">{`    compile 'com.github.AnchorFreePartner:hydra-proxy-sdk-android:0.1.6'
`}</code></pre>
				<h2 id="getting-started">Getting Started</h2>
				<p>HydraKit provides <code>{`Proxy`}</code> instance to use with Android HTTP / okhttp / other clients. Acquire Proxy instance before making HTTP requests, SDK sets environment variables whenever proxy is ready.</p>
				<h2 id="first-configure-hydrakit-with-api-backend-baseurl-and-carrierid-add-this-code-to-your-application-class-in-the-oncreate-method-">First, configure <code>{`HydraKit`}</code> with API backend <code>{`baseUrl`}</code> and <code>{`carrierId`}</code>. Add this code to your <code>{`Application`}</code> class, in the <code>{`onCreate`}</code> method:</h2>
				<pre><code className="lang-java">{`        HydraKit.onCreate(new HydraKitConfig(this, "{Your Carrier ID}", "{Your Base URL String}"));
`}</code></pre>
				<h3 id="proxy-on-demand">Proxy on-demand</h3>
				<p>Change your code to work with HydraKit in async way:</p>
				<pre><code className="lang-java">{`    HydraKit.instance.httpsProxy(new ProxyListener() {
        @Override
        public void proxyAvailable(Proxy proxy) {
            makeAndroidHttpRequest(url, proxy);
        }

        @Override
        public void error(HydraException exception) {
            Log.e(TAG, "error: unable to get proxy", exception);
        }
    });
`}</code></pre>
				<p>Whenever anti-blocking services are ready, you'll get <code>{`Proxy`}</code> instance that should be used with your http client. Environment proxy variables will be set automatically.</p>
				<p>NOTE: Make sure you call either <code>{`httpsProxy`}</code> or <code>{`httpProxy`}</code> to make it work with HTTPS or HTTP protocols.</p>
				<h3 id="hydrakit-state-monitoring">HydraKit state monitoring</h3>
				<p>Use <code>{`HydraKitStateListener`}</code> to monitor network errors and HydraKit states. Generally, it's enough to use only <code>{`httpsProxy`}</code> function to make simple application.</p>
				<pre><code className="lang-java">{`    HydraKit.instance.addListener(new HydraKitStateListener() {
        @Override
        public void stateChanged(HydraKitState state) {
            Log.d(TAG, "stateChanged: " + state.name());
        }

        @Override
        public void onError(HydraException e) {
            Log.d(TAG, "onError: ", e);
        }
    });
`}</code></pre>
				<h2 id="example">Example</h2>
				<p>Here is a simple example of protected GET request to HTTPS URL.</p>
				<pre><code className="lang-java">{`    HydraKit.instance.httpsProxy(new ProxyListener() {
        @Override
        public void proxyAvailable(Proxy proxy) {
            makeAndroidHttpRequest("http://ip-api.com/json", proxy);
        }

        @Override
        public void error(HydraException exception) {
            Log.e(TAG, "error: unable to get proxy", exception);
        }
    });
`}</code></pre>
				<pre><code className="lang-java">{`    private void makeAndroidHttpRequest(final String url, final Proxy proxy) {
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
`}</code></pre>
				<pre><code className="lang-java">{`    public String readStream(InputStream inputStream) throws Exception {
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
`}</code></pre>
				<p>After this code executes, <code>{`result`}</code> should have a page that shows different tnan yours IP address.</p>
			</div>
		);
	}
}