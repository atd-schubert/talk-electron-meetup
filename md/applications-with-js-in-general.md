## Application development with JavaScript
**An Overview**


### Classic
#### Browser and server

* Browser runs JavaScript
* Server just have to communicate over HTTP protocol
* Communication over HTTP requests

It is "Just a browser". Share a window with other sites. Window is not fully configurable<!-- .element: class="fragment fade-up" -->

Note: Controls only the content of the window, but not the window itself


### Mobile devices
#### Cordova

* WebView runs JavaScript
* Excerpts Plugins!
* Plugins are platform specific
* Every platform needs a different language
* Communication over an IPC or HTTP requests to external servers


### Desktop
#### Electron

* Main-Thread is running on Node.JS
* Renderer-Thread in a Chromium-like WebView
* Both run with JavaScript
* Communication over an IPC or HTTP requests to servers


### Desktop
#### Electron

* [GitHub](https://github.com/electron/electron/)
* [Documentation](https://electronjs.org/docs)

