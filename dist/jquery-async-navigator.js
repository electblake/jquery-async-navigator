/*
 *  jquery-async-navigator - v0.0.16
 *  Provides async navigation to legacy browser request/loading based websites.
 *  https://github.com/electblake/jquery-async-navigator
 *
 *  Made by Blake E
 *  Under MIT License
 */
/**
 *
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	'use strict';

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = 'asyncNavigator',
			defaults = {
				load_scripts: false, // inject script tags in nextPage
				inline_styles: true, // inject style tags in nextPage
				load_styles: true, // inject linked stylesheets in nextPage
				script_inject_style: 'basic', // basic or merge
				style_inject_mode: 'basic',
				animate: true, // animate element content
				verbose: false,
				beforeAnimate: null, // hook callback
				afterAnimate: null // hook callback
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = jQuery(element);
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;

                if (!jQuery('body').find('#async-nav-assets')[0]) {
                    jQuery('body').append('<div style="display:none" id="async-nav-assets"></div>');
                }

                this.inject_point = jQuery('body #async-nav-assets');
				this.init();
		}

		/**
		 * Util Functions
		 */

		function isScriptLoaded(url) {
		    var scripts = document.getElementsByTagName('script');
		    for (var i = scripts.length; i--;) {
		        if (scripts[i].src === url) {
		        	return true;
		        }
		    }
		    console.debug('script not found', url);
		    return false;
		}

		function isStyleLoaded(url) {
			// pretend js is loaded if url is missing
			if (!url) {
				return true;
			}

			var is_loaded = false;

			$('link[rel="stylesheet"][type="text/css"]').each(function() {
				if ($(this).attr('href') === url) {
		        	is_loaded = true;
		        }
			});
		    // console.debug('style not found', url);
		    return is_loaded;
		}


		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
					this.settings.selector = '#' + this.element.attr('id');

					var onPopState = window._.bind(function() {
						try {
							// var state = window.event.state;
							var state = event.state.state;

							if (this.settings.verbose) {
								console.debug('poped state', state);
					    	}

	    		    		if (state) {
	    	    				this.asyncNextPage(state, { popstate: true }, function(err) {
	    	    					if (err) {
	    	    						console.error(err);
	    	    					}
	    	    				});

	    		    		} else {
	    		    			// console.debug('history.go', 0);
	    		    			// history.go(0);
	    		    		}
	    		    	} catch (err) {
	    		    		if (err) {
		    		    		console.error(err);
	    		    		}
	    		    	}

					}, this);

					window.onpopstate = onPopState;

				},
				asyncNextPage: function(url, flags, done) {

					if (typeof flags === 'function') {
						done = flags;
						flags = {};
					} else if (typeof flags === 'object') {

					}

                    var beforeHooks = [
                        _.bind(function(next) {

                            var settings = this.settings;
                            if (settings.beforeAnimate) {
                                if (settings.verbose) {
                                    console.debug('beforeAnimate:start');
                                }
                                settings.beforeAnimate($(settings.selector), settings, function() {
                                    if (settings.verbose) {
                                        console.debug('beforeAnimate:next');
                                    }
                                    next();
                                });
                            } else if (settings.animate) {
                                this.element.animate({ opacity: 0 }, 1000, 'ease', function() {
                                    next();
                                });
                            }
                        }, this),
                        _.bind(function(next) {

                            var pageCallback = function(err, nextPage) {

                                // replace defined element contain html with nextPage html
                                $(this.settings.selector).html(nextPage.main_content);
                                this.inject_point.html('');

                                if (this.settings.verbose) {
                                    console.debug('asyncNavigator:nextPage', nextPage);
                                    console.debug('asyncNavigator:selector', this.settings.selector);
                                }

                                if (nextPage.body_class) {
                                    $('body')[0].className = nextPage.body_class;
                                }

                                if (nextPage.page_title) {
                                    $('html head title').attr('innerHTML', nextPage.page_title);
                                }

                                // load styles
                                if (this.settings.load_styles) {
                                    this.load_styles(nextPage);
                                }

                                // inline styles
                                if (this.settings.inline_styles) {
                                    this.inline_styles(nextPage);
                                }

                                // finishing up

                                // push this page into history
                                if (this.settings.verbose) {
                                    console.debug('pushState', { state: nextPage.url });
                                }

                                if (!flags || !flags.popstate) {
                                    history.pushState({ state: nextPage.url }, nextPage.page_title, nextPage.url);
                                }

                                // load scripts last
                                if (this.settings.load_scripts) {
                                    this.load_scripts(nextPage);
                                }

                                $(document).ready(function() {
                                    next();
                                });

                            };

                            this.getNextPage(url, window._.bind(pageCallback, this));

                        }, this)
                    ];

                    // var afterHooks = [];

                    window.async.series(beforeHooks, window._.bind(function() {

                        if (this.settings.afterAnimate) {
                            console.debug('afterAnimate:start');
                            this.settings.afterAnimate($(this.settings.selector), this.settings, function() {
                                console.debug('afterAnimate:next');
                                done();
                            });
                        } else if (this.settings.animate) {
                            this.element.animate({ opacity: 1 }, 500, 'swing', function() {
                                done();
                            });
                        }

                    }, this));
				},
				getNextPage: function (url, next) {

					if (this.settings.verbose) {
						console.debug('getNextPage', url);
					}

					var nextPage = {
						url: url
					};

					$.ajax({
						url: url,
						success: window._.bind(function(data) {


							data = data.replace('<body', '<div id="body"');
							data = data.replace('</body', '</div');

							var page = $(data);

							var main_content = page.find(this.settings.selector).attr('innerHTML');

							if (main_content && main_content.length > 0) {
								nextPage.page_title = page.filter('title').text();
								nextPage.body_class = page.filter('#body').attr('class');
								nextPage.main_content = main_content;

								// scripts
								if (this.settings.load_scripts) {
									nextPage.scripts = page.filter('script').toArray();
								}

								// styles
								if (this.settings.load_styles) {
									nextPage.styles = page.filter('link').toArray();
								}

								// inline styles
								if (this.settings.inline_styles) {
									nextPage.inline_styles = page.filter('style[type="text/css"]').toArray();
								}
							}

							next(null, nextPage);

						}, this),
						error: function(req, status, err) {
							if (this.settings.verbose) {
								console.debug('status', status);
							}
							next(err);
						}
					});
				},
				/**
				 * Asset Injection
				 */
				load_scripts: function(nextPage, cb) {

					if (this.settings.verbose) {
						console.debug('Discovered scripts', nextPage.scripts.length);
					}

                    var inject_src, inject_script;

                    var inject_script_at_point = _.bind(function(url) {
                        var script = document.createElement('script');
                        script.src = url;
                        if (this.settings.verbose) {
                            console.debug('..Injecting script', script);
                        }

                        this.inject_point.append(script);

                    }, this);

                    if (this.settings.verbose) {
                        console.debug('injecting scripts', this.settings.script_inject_style);
                    }

					if (this.settings.script_inject_style && this.settings.script_inject_style === 'merge') {
						for (var i = nextPage.scripts.length - 1; i >= 0; i--) {

							inject_script = nextPage.scripts[i];
							inject_src = inject_script.src;

							if (!isScriptLoaded(inject_src)) {
                                inject_script_at_point(inject_src);
                            } else {
                                if (this.settings.verbose) {
                                    console.debug('skipped', inject_script_at_point);
                                }
                            }
						}
					} else {
						$('body').append(nextPage.scripts);
					}

					return cb ? cb(null, nextPage) : nextPage;
				},
				load_styles: function(nextPage, cb) {
					if (this.settings.verbose) {
						console.debug('Discovered styles', nextPage.styles.length);
					}

					if (this.settings.style_inject_mode && this.settings.style_inject_mode === 'merge') {

						for (var i = nextPage.styles.length - 1; i >= 0; i--) {

							var inject_style = nextPage.styles[i];
							var inject_href = inject_style.href;

							if (!isStyleLoaded(inject_href)) {}

							var style = document.createElement('link');
							style.type = 'text/css';
							style.rel = 'stylesheet';
							style.href = inject_href;
							if (this.settings.verbose) {
								console.debug('..injecting style', style);
							}
							this.inject_point.append(style);

						}
					} else {
						$('body').append(nextPage.styles);
					}
					return cb ? cb(null, nextPage) : nextPage;
				},
				inline_styles: function(nextPage, cb) {
					if (this.settings.verbose) {
						console.debug('Discovered inline styles', nextPage.inline_styles.length);
					}
					this.inject_point.append(nextPage.inline_styles);
					return cb ? cb(null, nextPage) : nextPage;
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, 'plugin_' + pluginName ) ) {
								$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
