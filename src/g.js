/*jslint nomen: true, white: true, regexp: true*/
/*global $, _*/
/*jshint -W099*/

/**
* g is an easy way to render templates from an ajax request!
* Working example: http://jsfiddle.net/yuL2dugs/
*
* Future implementations:
*       - Handlebars integration
*       - Make it a Backbone Dependency
*       - Testing
*
* @example
*    g({ url: url }).using("#template").after("ul").now();
*
* @main g
* @author Guilherme Pontes
* @class g
* @constructor
* @param {Object} options It's an json object that handles the ajax configs
*/
(function(){
  var g = function gRequestRendering(options){
    "use strict";

    if("undefined" === typeof $) {
      throw new Error("g(): You need jQuery, sorry man.");
    }

    if("undefined" === typeof _) {
      throw new Error("g(): You need Underscore, sorry man.");
    }

    var __private, app;

    /**
     * Contains all private functions that cannot be used externally
     *
     * @property __private
    **/
    __private = {
      /**
       * Configuration of ajax configs
       *
       * @attribute config
       * @type Object
       */
      config: {
        cache: true
      },

      /**
       * HTML of generated template
       *
       * @attribute finalTemplate
       * @final
       * @type String
       */
      finalTemplate: "",

      /**
       * Handle the ajax request, parses and template generating
       *
       * @async
       * @method request
       * @return {undefined}
      **/
      request: function(options) {
        $.ajax(__private.config)
          .done(function(response){
              if(options && options.parseCollection) {
                  response = options.parseCollection(response);
              }

              if(options && options.handle) {
                  options.handle(response, app.templating);
                  return;
              }

              __private.make(response, options && options.parseModel);
          })
          .error(function(jqXHR, textStatus, errorThrown){
            if(options && options.error) {
              options.error(jqXHR, textStatus, errorThrown);
            }
          });
      },

      /**
       * Render the final template
       *
       * @method render
       * @return {undefined}
      **/
      render: function() {
          $(app.templating.target).html(this.finalTemplate);
      },

      /**
       * Loop through the array of objects and generate a template for
       * each item, adding a parse if available
       *
       * @method make
       * @return {undefined}
      **/
      make: function(response, parse) {
          _.each(response, function(item){
              this.add((parse && parse(item)) || item);
          }, this);

          this.render();
      },

      /**
       * Generates a template for a single model, appending to `app.finalTemplate`
       *
       * @method add
       * @return {undefined}
      **/
      add: function(item){
        var template = _.template( app.templating.template );
        this.finalTemplate += template(item);
      }
    };


    /**
     * The object that have all public functions and properties
     *
     * @property app
    **/
    app = {
      /**
       * Object that will store the template that will be handled and
       * the target element that will render the final template
       *
       * @attribute templating
       * @type Object
      **/
      templating: {
        target: false,
        template: false
      },

      /**
       * How the template will be rendered in the target element
       * Methods: [fill, append, prepend, after, before]
       *
       * @attribute how
       * @attribute
       * @type String
      **/
      how: null,

      /**
       * Underscore configuration
       *
       * @example
       *   Do something: {{ name = name.toLowerCase() }}
       *   Print Variable: {{= name}}
       *
       * @attribute settings
       * @method settings
       * @return {undefined}
      **/
      settings: function() {
        _.templateSettings = {
          interpolate: /\{\{=(.+?)\}\}/g,
          evaluate: /\{\{(.+?)\}\}/g
        };
      },

      /**
       * Set the base template that will evaluated for rendering
       *
       * @method using
       * @param {String} id Id of the DOM element that contains the base template
       * @required
       * @chainable
      **/
      using: function(id) {
        this.templating.template = $(id).html();
        return this;
      },

      /**
       * Set the base template that will evaluated for rendering
       *
       * @method using
       * @param {String} id Id of the DOM element that contains the base template
       * @return {undefined}
      **/
      setMethod: function(id, how) {
        if(this.how !== null) {
          throw new Error(how + "(): You've already set a method of rendering!");
        }

        this.templating.target = $(id);
        this.how = how;
      },

      /**
       * Set the method to fill, that will replace all content from an
       * DOM element
       *
       * @example
       *   Before:
       *     <ul><li>loading</li></ul>
       *   After:
       *     <ul><li>item 1</li><li>item 2</li></ul>
       *
       * @method fill
       * @param {String} id Id of the DOM element that contains the base template
       * @chainable
      **/
      fill: function(id) {
        this.setMethod(id, "fill");
        return this;
      },

      /**
       * Set the method to append that will only append to the DOM element
       *
       * @example
       *   Before:
       *     <ul><li>Listing</li></ul>
       *   After:
       *     <ul><li>Listing</li> <li>item 1</li><li>item 2</li></ul>
       *
       * @method append
       * @param {String} id Id of the DOM element that contains the base template
       * @chainable
      **/
      append: function(id) {
        this.setMethod(id, "append");
        return this;
      },

      /**
       * Set the method to prepend that will only prepend to the DOM element
       *
       * @example
       *   Before:
       *     <ul><li>Listing</li></ul>
       *   After:
       *     <ul><li>item 1</li><li>item 2</li> <li>Listing</li></ul>
       *
       * @method prepend
       * @param {String} id Id of the DOM element that contains the base template
       * @chainable
      **/
      prepend: function(id) {
        this.setMethod(id, "prepend");
        return this;
      },

      /**
       * Will add the evaluated template after the target DOM element
       *
       * @example
       *   Before:
       *     <div></div>
       *   After:
       *     <div></div> <span>Try it now!</span>
       *
       * @method after
       * @param {String} id Id of the DOM element that contains the base template
       * @chainable
      **/
      after: function(id) {
        this.setMethod(id, "after");
        return this;
      },

      /**
       * Will add the evaluated template before the target DOM element
       *
       * @example
       *   Before:
       *     <div></div>
       *   After:
       *     <span>Try it now!</span> <div></div>
       *
       * @method before
       * @param {String} id Id of the DOM element that contains the base template
       * @chainable
      **/
      before: function(id) {
        this.setMethod(id, "before");
        return this;
      },

      /**
       *
       *  The now(optObj) method executes and handle the request. Simple as that.
       *
       * Available methods in now(optObj):
       *   handle(response, templating)
       *     - Basically, you'll handle the success method of jquery ajax.
       *       Params:
       *         `response`            : Response of the ajax request
       *         `templating`          : Object with templating configs
       *         `templating.template` : Base template, setted in using() method
       *         `templating.target`   : Base template, setted in [fill || append || prepend || after || before]() method
       *
       *   error(jqXHR, textStatus, errorThrown)
       *     - Handler for an failing ajax request
       *       Params:
       *         jqXHR        : XMLHttpRequest object
       *         textStatus   : String describing the type of error that occurred
       *         errorThrown  : When an HTTP error occurs, errorThrown receives the textual portion of the HTTP status
       *
       *   parseCollection(collection)
       *     -  It will parse all collection that was received from the request
       *        Params:
       *          collection: Array of objects
       *
       *   parseModel(model)
       *     -  It will parse a single model, for each item from the collection
       *        Params:
       *          model: Array of objects
       *
       * @method now
       * @param {Object} callbacks Callbacks adds lots of methods that you call handle the data from the request
       * @extends g().using g()[fill || append || prepend || after || before]
       * @return {undefined}a
       **/
      now: function(callbacks) {
        this.settings();

        if(this.setup(options)) {
          __private.request(callbacks);
        }
      },

      /**
       * Validates all options setted in the module
       *
       * @method setup
       * @return {Boolean}
      **/
      setup: function() {
        if(!options || !options.url) {
          throw new Error("g(): You must enter ajax options. Ex: url.");
        }

        if(!this.templating.template) {
          throw new Error("g.using(): You must enter a template.");
        }

        if(!this.templating.target) {
          throw new Error("g." + this.how + "(): You must enter a target to render the template.");
        }

        __private.config = $.extend({}, __private.config, options);

        return true;
      }
    };

    return app;
  };

  /**
   * g version
  **/
  g.version = "0.1.0";

  /**
   * setting gRender and __ as optional names
  **/
  window.g = window.gRender = window.__ = window.g || g;
}());
