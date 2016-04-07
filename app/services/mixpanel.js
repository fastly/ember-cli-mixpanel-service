import Ember from 'ember';
import Config from '../config/environment';

export default Ember.Service.extend({
    pageHasAnalytics: function() {
        return window.mixpanel && typeof window.mixpanel === "object" && Config.mixpanel.enabled;
    },

    logTrackingEnabled: function() {
        return !!Config && !! Config.mixpanel.LOG_EVENT_TRACKING;
    },

    logTracking: function() {
        Ember.Logger.info('[Mixpanel] ', arguments);
    },

    trackPageView: function(page, overrides = {}) {
        if (this.pageHasAnalytics()) {
            if (!page) {
                var loc = window.location;
                page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
            }

            window.mixpanel.track("visit", Ember.merge({pageName: page}, overrides));
        }

        if (this.logTrackingEnabled()) {
            this.logTracking('page view', page);
        }
    },

    trackEvent: function(event, properties, options, callback) {
        if (this.pageHasAnalytics()) {
            window.mixpanel.track(event, properties, options, callback);
        }

        if (this.logTrackingEnabled()) {
            this.logTracking(event, properties, options);
        }
    },

    identify: function(userId, traits, options, callback) {
        if (this.pageHasAnalytics()) {
            window.mixpanel.identify(userId, traits, options, callback);
        }

        if (this.logTrackingEnabled()) {
            this.logTracking('identify user', userId, traits, options);
        }
    },

    alias: function(userId, previousId, options, callback) {
        if (this.pageHasAnalytics()) {
            window.mixpanel.alias(userId, previousId, options, callback);
        }

        if (this.logTrackingEnabled()) {
            this.logTracking('alias user', userId, previousId, options);
        }
    },

  register: function(traits, options, callback) {
        if (this.pageHasAnalytics()) {
            window.mixpanel.register(traits, options, callback);
        }

        if (this.logTrackingEnabled()) {
            this.logTracking('register user', traits, options);
        }
    },

    peopleSet: function(attributes) {

        if (this.pageHasAnalytics()) {
            window.mixpanel.people.set(attributes);
        }

        if (this.logTrackingEnabled()) {
            this.logTracking('people.set', attributes);
        }
    },

    peopleIncrement: function() {

      if (this.pageHasAnalytics()) {
          window.mixpanel.people.increment(arguments);
      }

      if (this.logTrackingEnabled()) {
          this.logTracking('people.increment', arguments);
      }
    },

    // Mixpanel does not have an api to increment super property directly.
    // Instread, they recommend using get_property to fetch the value, increment
    // it and then register it. More details at https://mixpanel.com/blog/2015/01/29/incremental-super-properties

    superIncrement: function(property, increment = 1) {
      if (this.pageHasAnalytics()) {
          var currentValue = window.mixpanel.get_property(property);
          var updatedValue = {};

          if(currentValue && typeof(currentValue) === 'number') {
            updatedValue[property] = currentValue + increment;
          }

          else {
            updatedValue[property] = increment;
          }

          window.mixpanel.register(updatedValue);
      }

      if (this.logTrackingEnabled()) {
          this.logTracking('increment super property', property, increment);
      }
    }
});
