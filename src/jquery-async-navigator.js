/**
 *
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "asyncNavigator",
				defaults = {
					includeScripts: false,
					includeStyles: true,
					animate: true,
					verbose: false,
					beforeAnimate: null,
					afterAnimate: null
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = jQuery(element);
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
					this.settings.selector = "#" + this.element.attr("id");

					var onPopState = window._.bind(function() {
						try {
							// var state = window.event.state;
							var state = event.state.state;

							if (this.settings.verbose) {
								console.debug("poped state", state);
					    	}

	    		    		if (state) {
	    	    				this.asyncNextPage(state, { popstate: true }, function(err) {
	    	    					if (err) {
	    	    						console.error(err);
	    	    					}
	    	    				});

	    		    		} else {
	    		    			// console.debug("history.go", 0);
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

					if (typeof flags === "function") {
						done = flags;
						flags = {};
					} else if (typeof flags === "object") {

					}

					if (this.settings.animate) {
						this.element.animate({ opacity: 0 }, 1000);
					}

					this.getNextPage(url, window._.bind(function(err, nextPage) {

						if (this.settings.verbose) {
							console.debug("asyncNavigator:nextPage", nextPage);
							console.debug("asyncNavigator:selector", this.settings.selector);
						}

						// replace defined element contain html with nextPage html
						jQuery(this.settings.selector).html(nextPage.main_content);

						if (nextPage.body_class) {
							jQuery("body")[0].className = nextPage.body_class;
						}

						if (nextPage.page_title) {
							jQuery("html head title").attr("innerHTML", nextPage.page_title);
						}

						// load scripts
						if (this.settings.includeScripts) {
							jQuery("body").append(nextPage.scripts);
						}

						// load styles
						if (this.settings.includeStyles) {
							jQuery("body").append(nextPage.styles);
						}

						// finishing up

						// push this page into history
						if (this.settings.verbose) {
							console.debug("pushState", { state: nextPage.url });
						}

						if (!flags || !flags.popstate) {
							history.pushState({ state: nextPage.url }, nextPage.page_title, nextPage.url);
						}

						if (this.settings.animate) {
							this.element.animate({ opacity: 1 }, 500);
						}

						done(err);
					}, this));
				},
				getNextPage: function (url, next) {

					if (this.settings.verbose) {
						console.debug("getNextPage", url);
					}
					// console.debug("next", next);

					var nextPage = {
						url: url
					};

					$.ajax({
						url: url,
						success: window._.bind(function(data) {


							data = data.replace("<body", "<div id='body'");
							data = data.replace("</body", "</div");

							var page = $(data);

							var main_content = page.find(this.settings.selector).attr("innerHTML");

							if (main_content && main_content.length > 0) {
								nextPage.page_title = page.filter("title").text();
								nextPage.body_class = page.filter("#body").attr("class");
								nextPage.main_content = main_content;

								// scripts
								if (this.settings.includeScripts) {
									nextPage.scripts = page.filter("script").toArray();
								}

								// styles
								if (this.settings.includeStyles) {
									nextPage.styles = page.filter("link").toArray();
								}
							}

							next(null, nextPage);

						}, this),
						error: function(req, status, err) {
							if (this.settings.verbose) {
								console.debug("status", status);
							}
							next(err);
						}
					});
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
