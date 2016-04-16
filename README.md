# Fastly ember-cli-mixpanel-service notes

1. Follow these instructions to configure remote for the fork: https://help.github.com/articles/configuring-a-remote-for-a-fork/
1. Follow these instructions to sync fork to our Fastly repo: https://help.github.com/articles/syncing-a-fork/
1. If you run into issues with Mixpanel in local development, try a `bin/nombom` on your local Tango repo.

# ember-cli-mixpanel-service

[![npm version](https://badge.fury.io/js/ember-cli-mixpanel-service.svg)](http://badge.fury.io/js/ember-cli-mixpanel-service)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-mixpanel-service.svg)](http://emberobserver.com/addons/ember-cli-mixpanel-service)
[![Code Climate](https://codeclimate.com/github/sportly/ember-cli-mixpanel-service/badges/gpa.svg)](https://codeclimate.com/github/sportly/ember-cli-mixpanel-service)

This ember-cli addon injects mixpanel into your ember app.

The mixpanel js is injected into the app's index.html. Pageview tracking is by default automatic, no mixins required. The mixpanel service is injected into your apps controllers and routes and is available as `this.get('mixpanel')`.

More on mixpanel at http://www.mixpanel.com

## Installation

```
ember install ember-cli-mixpanel-service
```

# Configuration

This plugin uses the ember-cli project's configuration as defined in `config/environment.js`.

Add your Mixpanel API token to `config/environment.js` and you're good to go. A couple more params below

```js
// environment.js

    ENV.mixpanel = {
      enabled: false,
      LOG_EVENT_TRACKING: false,
      token: 'abcd123456789'
    }

```

## Configuration Parameters

* `enabled` (Default: `true`): Enable mixpanel tracking
* `autoPageviewTracking` (Default: `true`): Enable automatic pageview tracking
* `pageViewAttribute` (Default: `url`): Use some other attribute available to the router instead of `url` for pageview tracking
* `attributeOverrides` (Default: `{}`): Configure overrides, if any, for any of the attributes [mixpanel stores by default](https://mixpanel.com/help/questions/articles/what-properties-do-mixpanels-libraries-store-by-default)
* `LOG_EVENT_TRACKING` (Default: `false`): Output logging to the console.
* `token` (Default: `null`): Mandatory Mixpanel API token


## CORS Content Security Policy

If you use [ember-cli-content-security-policy](https://github.com/rwjblue/ember-cli-content-security-policy) you should add the Mixpanel API to your app's content security policy settings. To do this add api.mixpanel.com to the 'connect-src' key in the ENV.contentSecurityPolicy hash as below:

```
// environment.js
    ENV.contentSecurityPolicy = {
      'connect-src': "'self' api.mixpanel.com ..."
      ...
    }
```


## Mixpanel API

### pageviews

`trackPageView: function(page, overrides = {})`

Note: Pageviews are tracked automatically by default, no mixins required. You can override [any properties mixpanel stores by default](https://mixpanel.com/help/questions/articles/what-properties-do-mixpanels-libraries-store-by-default) by providing an optional `overrides` object.

### events

`trackEvent: function(event, properties, options, callback)`

Alias of the mixpanel [`track`](https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.track) function

### identify

`identify: function(userId, traits, options, callback)`

Alias of the mixpanel [`identify`](https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.identify) function

### alias

`alias: function(userId, previousId, options, callback)`

Alias of the mixpanel [`alias`](https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.alias) function

### register

`register: function(traits, options, callback)`

Alias of the mixpanel [`register`](https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.register) function

### peopleSet

`peopleSet: function(attributes)`

Alias of the mixpanel [`people.set`](https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.people.set) function

### peopleIncrement

`peopleIncrement: function(arguments)`

Alias of the mixpanel [`people.increment`](https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.people.increment) function where arguments are same as what mixpanel's `people.increment` method takes.
