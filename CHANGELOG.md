### 0.0.34 (2015-11-05)


#### Features

* **Compatability:** added IE11 support using Modernizr for feature detection (in parts, still refere ([80b647ec](https://github.com/electblake/jquery-async-navigator/commit/80b647ec832bdd360ff11799a709339ad5f984d7))


### 0.0.33 (2015-11-04)


#### Bug Fixes

* **Asset Injection:** insert inline asset into head, and remove during garbage collection ([d507ec89](https://github.com/electblake/jquery-async-navigator/commit/d507ec89295fe6a863290f7af394b274958b7c39))


### 0.0.32 (2015-11-04)


#### Bug Fixes

* **History:** removed default go(-1) until popstate validation is there ([89969bd6](https://github.com/electblake/jquery-async-navigator/commit/89969bd63f806a54db9515450d8ca1690bc0ddb9))


### 0.0.31 (2015-11-04)


#### Bug Fixes

* **Asset Injection:** fix for inline style injection ([d295da8d](https://github.com/electblake/jquery-async-navigator/commit/d295da8de7abf27bee02c1a9065cdd93a59de1b5))


### 0.0.30 (2015-11-04)


### 0.0.29 (2015-11-04)


#### Features

* **Asset Injection:** updated inline css injection to use <noscript> to avoid render jitter ([338f5df8](https://github.com/electblake/jquery-async-navigator/commit/338f5df802126d6725afdc6dd4d2216634a4cd31))


### 0.0.28 (2015-11-04)


#### Bug Fixes

* **History:** fallback to history.go(-1) and better event.state handling ([db890467](https://github.com/electblake/jquery-async-navigator/commit/db89046757562a5a621f94672186e6bf8fac94db))


### 0.0.27 (2015-11-04)


#### Bug Fixes

* **Asset Injection:** remove previous async assets only after new page loaded ([29d1b68c](https://github.com/electblake/jquery-async-navigator/commit/29d1b68cf9cb2e8ae58629690f955672b642aad2))


### 0.0.26 (2015-11-04)


#### Features

* **Compatability:** better use of modernizr for popstate feature detection, and .empty() vs. html(nu ([cc1e7581](https://github.com/electblake/jquery-async-navigator/commit/cc1e7581daffc985518bc86ed52796555a1680aa))


### 0.0.25 (2015-11-03)


#### Bug Fixes

* **Rendering:** run beforeAnimate hooks as async.series, to render next pages much closer to des ([b0ba164a](https://github.com/electblake/jquery-async-navigator/commit/b0ba164a18e2a539b88850be3537a1fbb09c441c))


### 0.0.24 (2015-11-02)


#### Features

* **Refactor:** start use of __config and __settings to avoid so much lodash binding ([274e5bef](https://github.com/electblake/jquery-async-navigator/commit/274e5bef5225aaab20e252650a7505a7f971ed55))


### 0.0.23 (2015-10-28)


#### Bug Fixes

* **Navigation:** cancel previous ajax request on multiple clicks ([587573c3](https://github.com/electblake/jquery-async-navigator/commit/587573c365328190f243be6a1ec4b39deae04734))


### 0.0.22 (2015-10-27)


#### Bug Fixes

* **Styles:** added cleanup_styles option, and code cleanup ([777b7d92](https://github.com/electblake/jquery-async-navigator/commit/777b7d929800cbb449560aa451a8a9c8a7e5f77b))


### 0.0.21 (2015-10-22)


#### Bug Fixes

* **IE9:** another IE9 attempt for inline styles, and clean up previous methods ([2f3b997f](https://github.com/electblake/jquery-async-navigator/commit/2f3b997f4425c2263b8c95827bc5a65388f629cf))


### 0.0.20 (2015-10-21)


#### Features

* **IE9:** update way styles are injected (both file and inline) ([967f3b28](https://github.com/electblake/jquery-async-navigator/commit/967f3b28d6e9cc936986ffd768b8247d1231db46))


### 0.0.19 (2015-10-21)


#### Features

* **IE9:** started ie9 support, and optimized css merge insert etc ([3b432442](https://github.com/electblake/jquery-async-navigator/commit/3b4324423c852bef8e9ddf8718882df5fe996887))


### 0.0.18 (2015-10-16)


#### Features

* **data_attrs:** added data_attrs feature which moves body and html data using jQuery ([0f611008](https://github.com/electblake/jquery-async-navigator/commit/0f61100861ecfc5fa95c18bd621e79d78cde3fb0))


### 0.0.17 (2015-10-13)


#### Features

* **async:** made animations chainable, using callbacks to ensure animations finish ([c7438fcc](https://github.com/electblake/jquery-async-navigator/commit/c7438fcc5de7d3feae74186a894b403b46d0ce36))


### 0.0.16 (2015-09-08)


#### Features

* **Injection:** updated injection method for styles, and still hard-wiring js script :/ ([25cd8610](https://github.com/electblake/jquery-async-navigator/commit/25cd86102711a3b80320c9f9a8ced7b4535885c4))


### 0.0.15 (2015-09-04)


#### Features

* **api:** updated api usage, readme and docs for it too ([3834a965](https://github.com/electblake/jquery-async-navigator/commit/3834a96553a38c5429fe65cc344d49eb65463306))


### 0.0.14 (2015-09-02)


#### Features

* **verbose:** added beter settings.verbose debugging ([502732d2](https://github.com/electblake/jquery-async-navigator/commit/502732d2de0e2ac0e07d7fd1d17bc0652d3a02e0))


### 0.0.13 (2015-08-24)


#### Bug Fixes

* **history:** removed dupes and loops in popstate handling ([f40d3e31](https://github.com/electblake/jquery-async-navigator/commit/f40d3e3105a8eff446d133dda5272528c82565da))


### 0.0.12 (2015-08-24)


#### Features

* **history:** added history and new settings.animate to fade in/out ([3e3be901](https://github.com/electblake/jquery-async-navigator/commit/3e3be9017f7f81e22e4e8413b000b5399aaff402))


### 0.0.11 (2015-08-24)


### 0.0.13 (2015-08-24)


#### Features

* **assets:** added css and js asset pipe - uses `settings.includeScripts` and `settings.inclu ([26c29e46](https://github.com/electblake/jquery-async-navigator/commit/26c29e46c37635c0f5f882d2d39ff888e4256c0c))


### 0.0.12 (2015-08-24)


#### Features

* **assets:** added css and js asset pipe - uses `settings.includeScripts` and `settings.inclu ([26c29e46](https://github.com/electblake/jquery-async-navigator/commit/26c29e46c37635c0f5f882d2d39ff888e4256c0c))


### 0.0.11 (2015-08-24)


#### Features

* **assets:** added css and js asset pipe - uses `settings.includeScripts` and `settings.inclu ([26c29e46](https://github.com/electblake/jquery-async-navigator/commit/26c29e46c37635c0f5f882d2d39ff888e4256c0c))


### 0.0.10 (2015-08-20)


#### Features

* **navigator:** added page_title and body classes - live insert ([971b9bc7](https://github.com/electblake/jquery-async-navigator/commit/971b9bc76d2dd2ef16b562c0654e8326e0e4793d))


### 0.0.9 (2015-08-20)


### 0.0.8 (2015-08-20)


#### Features

* **package:** changed files a bit ([8b1626fe](https://github.com/electblake/jquery-async-navigator/commit/8b1626fe5ce411fc7791ed9864d876e99a21e213))


### 0.0.7 (2015-08-20)


### 0.0.6 (2015-08-20)


#### Features

* **plugin:** added bower deps ([aa92bad1](https://github.com/electblake/jquery-async-navigator/commit/aa92bad11eb5fe6ed58db9ac840830493e4f46c9))


### 0.0.5 (2015-08-20)


### 0.0.4 (2015-08-20)


### 0.0.3 (2015-08-20)

