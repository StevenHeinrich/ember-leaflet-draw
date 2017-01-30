# Ember-leaflet-draw

Provides feature drawing functionality for [Ember-Leaflet](http://ember-leaflet.com), an Ember Addon for [Leaflet](http://leafletjs.com) interactive maps.

This plugin is based on the JS library [Leaflet Draw](https://github.com/Leaflet/Leaflet.draw) and basically wraps it into ember component for usage in HTMLbars templates.

## Installation

* `ember install ember-leaflet-draw`

## Using the plugin

Installing this plugin will pull in all the dependencies necessary to begin using Leaflet Draw, by extending leaflet. If you want total control to do your own thing, this may be all you need to easily bring in all dependencies and ensure everything is wired.

#### Production Builds
In your `ember-cli-build.js` add the following snippet:
```js
  var app = new EmberApp(defaults, {
    // Add options here
    fingerprint: {
      exclude: [
        // You should already have these from using Ember-Leaflet
        'images/layers-2x.png',
        'images/layers.png',
        'images/marker-icon-2x.png',
        'images/marker-icon.png',
        'images/marker-shadow.png',
        // These are additional images used by Ember-Leaflet-Draw
        'images/spritesheet-2x.png',
        'images/spritesheet.png',
        'images/spritesheet.svg'
      ]
    }
  });
```

*Ember-Cli does fingerprinting (appending an md5 checksum to the end of every file) for production builds by default (http://ember-cli.com/user-guide/#fingerprinting-and-cdn-urls). Exclude the assets you need so that your production build produces them correctly.*

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
