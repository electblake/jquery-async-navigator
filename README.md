# jQuery Async Navigator [![Build Status](https://travis-ci.org/electblake/jquery-async-navigator.svg?branch=master)](https://travis-ci.org/electblake/jquery-async-navigator) ![Bower Version](https://badge.fury.io/bo/jquery-async-navigator.svg)

### Add aync ajax page navigation on legacy platforms

Not really for user-land adoption, but great if you know how to parse code :)

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="bower_components/jquery-async-navigator/dist/jquery-async-navigator.min.js"></script>
	```

3. Call the plugin:

	```javascript
	var content_wrapper = jQuery('#main-wrapper');

    // sets the element to swap content with, and adds asyncNavigator api to it as data.plugin__asyncNavigator
    content_wrapper.asyncNavigator({
        verbose: false,
        load_scripts: true,
        load_styles: true,
        script_inject_mode: 'basic',
        style_inject_mode: 'basic',
        inline_styles: true

    });

    // get api
    var AsyncNav = content_wrapper.data('plugin_asyncNavigator');

    // load next page with api
    return AsyncNav.asyncNextPage(href, function(err) {
        if (err) {
            console.error(err);
        }
    });
	```

## Structure

The basic structure of the project is given in the following way:

```
├── demo/
│   └── index.html
├── dist/
│   ├── jquery-async-nvaigator.js
│   └── jquery.async-navigator.min.js
├── src/
│   ├── jquery-async-nvaigator.coffee
│   └── jquery-async-nvaigator.js
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .travis.yml
├── Gruntfile.js
└── package.json
```

#### [demo/](https://github.com/electblake/jquery-async-navigator/tree/master/demo)

Contains a simple HTML file to demonstrate your plugin.

#### [dist/](https://github.com/electblake/jquery-async-navigator/tree/master/dist)

This is where the generated files are stored once Grunt runs.

#### [src/](https://github.com/electblake/jquery-async-navigator/tree/master/src)

Contains the files responsible for your plugin, you can choose between JavaScript or CoffeeScript.

#### [.editorconfig](https://github.com/electblake/jquery-async-navigator/tree/master/.editorconfig)

This file is for unifying the coding style for different editors and IDEs.

> Check [editorconfig.org](http://editorconfig.org) if you haven't heard about this project yet.

#### [.gitignore](https://github.com/electblake/jquery-async-navigator/tree/master/.gitignore)

List of files that we don't want Git to track.

> Check this [Git Ignoring Files Guide](https://help.github.com/articles/ignoring-files) for more details.

#### [.jshintrc](https://github.com/electblake/jquery-async-navigator/tree/master/.jshintrc)

List of rules used by JSHint to detect errors and potential problems in JavaScript.

> Check [jshint.com](http://jshint.com/about/) if you haven't heard about this project yet.

#### [.travis.yml](https://github.com/electblake/jquery-async-navigator/tree/master/.travis.yml)

Definitions for continous integration using Travis.

> Check [travis-ci.org](http://about.travis-ci.org/) if you haven't heard about this project yet.

#### [boilerplate.jquery.json](https://github.com/electblake/jquery-async-navigator/tree/master/boilerplate.jquery.json)

Package manifest file used to publish plugins in jQuery Plugin Registry.

> Check this [Package Manifest Guide](http://plugins.jquery.com/docs/package-manifest/) for more details.

#### [Gruntfile.js](https://github.com/electblake/jquery-async-navigator/tree/master/Gruntfile.js)

Contains all automated tasks using Grunt.

> Check [gruntjs.com](http://gruntjs.com) if you haven't heard about this project yet.

#### [package.json](https://github.com/electblake/jquery-async-navigator/tree/master/package.json)

Specify all dependencies loaded via Node.JS.

> Check [NPM](https://npmjs.org/doc/json.html) for more details.

## Contributing

Check [CONTRIBUTING.md](https://github.com/electblake/jquery-async-navigator/blob/master/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/electblake/jquery-async-navigator/releases) for detailed changelog.

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
